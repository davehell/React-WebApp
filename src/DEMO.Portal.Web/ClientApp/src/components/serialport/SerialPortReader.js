import { Fragment, useEffect, useState } from 'react';

import { t } from "../../localization/i18n";

const SerialPortReader = (props) => {
  //Funkce, která se spustí po načtení dat
  const onDataRead = props.onDataRead;
  //Filtr zařízení, která se mají při připojování k seriovemu portu zobrazovat v nabídce
  const filters = props.devices; //konstanta se asi musí jmenovat přímo "filters", jinak to nefunguje
  //Časový úsek, po kterém se má ukončit čtení ze serioveho portu. Pokud není zadán, ukončí se čtení znakem nového řádku.
  const readTimeout = props.readTimeout;
  //Zobrazit tlačítko pro odpojení čtečky
  const isDisconnectVisible = props.isDisconnectVisible;

  const isSerialSupported = "serial" in navigator;
  
  const [port, setPort] = useState();
  let inputDone;
  let reader;
  let inputStream;

  //při startu komponenty se znovu připojit k portu, který byl dříve připojen
  useEffect(() => {
    if(isSerialSupported) {
      getPrevGrantedPort();
    }
  }, []);

  //při změně portu připojit/odpojit od čtečky
  useEffect(() => {
    if(port) {
      connect();
    }

    return async function() {
      if(port) {
        await disconnect();
      }
    };
  }, [port]);


  async function getPrevGrantedPort(e) {
    // Get all serial ports the user has previously granted the website access to.
    const ports = await navigator.serial.getPorts();
    //v local storage uloženo číslo portu, ke kterému se naposledy připojovalo
    if(ports) {
      let lastId = localStorage.getItem("usbProductId");
      ports.forEach(port => {
        const { usbProductId } = port.getInfo();
        if(usbProductId == lastId) {
          setPort(port);
        }
      });
    }
  };

  async function connect(e) {
      const { usbVendorId, usbProductId } = port.getInfo();
      //console.log("usbVendorId: ", usbVendorId, "usbProductId: ", usbProductId);
      localStorage.setItem("usbProductId", usbProductId);
      try {
        await port.open({ baudRate: 9600 });
      } catch (error) {
        //Failed to execute 'open' on 'SerialPort': The port is already open.
      }
      //vypnuto varování v eslint, že TextDecoderStream is undefined
      //eslint-disable-next-line no-undef
      let decoder = new TextDecoderStream();
      if(port.readable && !port.readable.locked) {
        inputDone = port.readable.pipeTo(decoder.writable);
      }
      inputStream = decoder.readable.pipeThrough(new TransformStream(new TimeoutTransformer(readTimeout)));
      //inputStream = decoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer()));
      reader = inputStream.getReader();
      readLoop();
  };

  async function readLoop() {
    while (true) {
      const { value, done } = await reader.read();
      if (value) {
        onDataRead(value);
      }
      if (done) {
        reader.releaseLock();
        break;
      }
    }
  }

  async function disconnect(e) {
    if (reader) {
      await reader.cancel();
      if(inputDone) {
        await inputDone.catch(() => {});
      }
      
      reader = null;
      inputDone = null;
    }

    if(port && port.readable) {
      await port.close();
    }
  };

  async function onConnectBtnClick(e) {
    // Prompt user to select any serial port.
    const p = await navigator.serial.requestPort({ filters });
    setPort(p);
  };
  
  async function onDisconnectBtnClick(e) {
    setPort(null);
  };

  if(!isSerialSupported) {
    return (
      <Fragment>
        <p className="alert alert-danger">
          {t("serialPort_NotSupported")}
        </p>
      </Fragment>
    );
  }
  
  if(!port) {
    return (
      <Fragment>
          <h3 className="mt-4">{t("serialPort_Title")}</h3>
          <button type="button" className="btn btn-primary mb-4" onClick={onConnectBtnClick}>
            {t("serialPort_Connect")}
          </button>
      </Fragment>
    );
  }

  return (
    <Fragment>
        <p className="alert alert-success">
          {t("serialPort_Prepared")}
        </p>
        {isDisconnectVisible &&
          <button type="button" className="btn btn-primary mb-4" onClick={onDisconnectBtnClick}>
            {t("serialPort_Disconnect")}
          </button>
        }
    </Fragment>
  );
}

export default SerialPortReader;

//čte ze streamu, dokud není konec řádků, potom vrátí načtená data
class LineBreakTransformer {
  constructor() {
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\r\n");
    this.chunks = lines.pop();
    lines.forEach(function(line) {
      //odstranění různých paznaků
      let text = line.replace(/[^a-z0-9]/ig, '');
      controller.enqueue(text);
    });
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}

//čte ze streamu a po určitém čase vrátí načtená data
class TimeoutTransformer {
  constructor(timeout) {
    this.timeout = timeout ?? 500;
    this.text = "";
  }

  transform(chunk, controller) {
    this.text += chunk;

    setTimeout(() => {
      //odstranění různých paznaků
      let text = this.text.replace(/[^a-z0-9]/ig, '');
      controller.enqueue(text);
      this.text = "";
    }, this.timeout);
  }
}