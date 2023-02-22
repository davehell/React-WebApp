import DataSource from 'devextreme/data/data_source';
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { handleServerResponse } from '../lib/common';
import { getODataContext, webApiUrl } from '../lib/odata';
import { t } from "../localization/i18n";
import { convertPersonFromOData } from '../model/person';

const AuthContext = createContext();

function AuthProvider({children}) {
  const AUTHORIZATION_KEY = "authorization"; //autorizační hlavička (token)
  //isAuthInProgress: výchozí stav musí být "true", AppRoute pak nepřesměruje na login, ale ukáže loading
  //využití: přihlášený uživatel, otevřená private stránka, refresh - aplikace neskočí na login, ale čeka na výsledek přihlášení
  const [isAuthInProgress, setIsAuthInProgress] = useState(true);
  const [loggedPerson, setLoggedPerson] = useState(null);
  const [authorization, setAuthorization] = useState(localStorage.getItem(AUTHORIZATION_KEY));
  const [OData, setOData] = useState(null);

  //Na základě jména a hesla získat token
  const getTokenByUsername = useCallback(async (username, password) => {
    //console.log("getTokenByUsername", username);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Username": username,
        "Password": password
      })
    };

    let response = null;
    try {
      response = await fetch(webApiUrl + "security/Logon", options);  
    } catch (error) {
    }
    finally {
      return await processActionResponse(response);
    }
  }, []);

  //Na základě tokenu získat jemu odpovídající uživatelské jméno
  const getUsernameByToken = useCallback(async (authHeader) => {
    //console.log("getUsernameByToken", authHeader);

    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader
      }
    };
    const response = await fetch(webApiUrl + "security/GetCurrentUser", settings);
    return await processActionResponse(response);
  }, []);

  //Na základě uživatelského jména získat informace o uživateli
  const getPersonInfo = useCallback(async (username, odata) => {
    //console.log("getPersonInfo", username)

    let result = {
      isOk: false,
      person: null,
      msg: ""
    }

    try {
      const personData = await getPersonByUsername(odata, username);
      result.isOk = true;
      result.person = personData;
    } catch (e) {
      result.msg = t("serverError");
    }

    return result;
  }, []);

  //Obsluha odhlášení
  const signOut = useCallback(async () => {
    setAuthorization(null); //musí být null, s prázdnými závorkami se token nevymaže
    setLoggedPerson(null);
    setOData(null);
    setIsAuthInProgress(false);
  }, []);

  //Obsluha přihlášení jménem a heslem
  const signIn = useCallback(async (username, password) => {
    //console.log("signIn", username);

    setIsAuthInProgress(true);
    let resultOfTokenAction = await getTokenByUsername(username, password);
  
    if(resultOfTokenAction.isOk) {
      //token byl v pořádku vygenerován
      let auth = `Bearer ${resultOfTokenAction.data?.token}`;
      setAuthorization(auth);
    }
    else {
      //přihlašování skončilo chybou
      await signOut();
    }

    return resultOfTokenAction;
  }, [signOut, getTokenByUsername]);


  //při změně autorizační hlavičky načíst informace o uživateli
  useEffect(() => {
    if(authorization) {
      localStorage.setItem(AUTHORIZATION_KEY, authorization);

      //vytvoření OData kontextu
      let odata = getODataContext(authorization);
      setOData(odata);

      //načtení informací o přihlášeném uživateli
      getUsernameByToken(authorization).then((result) => {
        if(result.isOk) {
          let username = result.data.Username;
          getPersonInfo(username, odata).then((result) => {
            if(result.isOk) {
              setLoggedPerson(result.person);
            }
            else {
              signOut();
            }
          });
        }
        else {
          signOut();
        }
      });
    }
    else {
      localStorage.removeItem(AUTHORIZATION_KEY);
      signOut();
    }
  }, [authorization, getUsernameByToken, getPersonInfo, signOut]);

  //při změně "loggedPerson" nastavit příznak, že už přihlašování skončilo
  useEffect(() => {
    if(loggedPerson) {
      setIsAuthInProgress(false);
    }
  }, [loggedPerson]);

  //zpracování odpovědi na ajaxový požadavek
  const processActionResponse = async (response) =>{
    let result = {
      isOk: false,
      data: "",
      msg: ""
    }

    try {
      let data = await response.json();
      if(response.ok) {
        result.data = data;
      }
      else {
        result.msg = handleServerResponse(data);
      }
      result.isOk = response.ok;
    }
    catch(r) {
      result.msg = t("serverError");
    }

    return result;
  }

  //na základě uživatelského jména získat informace o osobě
  const getPersonByUsername = async function(odata, username) {
    if(!username) {
      return;
    }

    let person = null;
    const ds = new DataSource({
      store: odata.Persons,
      filter: ["User.UserName", "=", username],
      //select: ["Id","PlainName","LastName"],
      expand: [
      ]
    })

    await ds.load()
    .then(function (data) {
      if(data.length === 1) {
        person = convertPersonFromOData(data[0]);
      }
    })

    return person;
  }

  return (
    <AuthContext.Provider value={{ loggedPerson, signIn, signOut, authorization, OData, isAuthInProgress }}>
       {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
