import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(localStorage, key, defaultValue);
  });

  useEffect(() => {
    setStorageValue(localStorage, key, value)
  }, [key, value]);

  return [value, setValue];
};

export const useSessionStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(sessionStorage, key, defaultValue);
  });

  useEffect(() => {
    setStorageValue(sessionStorage, key, value)
  }, [key, value]);

  return [value, setValue];
};

function getStorageValue(storage, key, defaultValue) {
  const stored = storage.getItem(key);
  let value = undefined;
  try {
    value = JSON.parse(stored);
    if(isDate(value)) {
      value = new Date(value);
    }
  } catch (e) {
  }

  //ve storage může být uložena platná hodnota "false", proto zde kontrola na undefined a null
  return value === undefined || value === null ? defaultValue : value;
}

function setStorageValue(storage, key, value) {
  if(value === undefined || value === null) {
    storage.removeItem(key);
  }
  else {
    storage.setItem(key, JSON.stringify(value));
  }
}

function isDate(value) {
  if(value && value.length < "yyyy-dd-mm") {
    return false;
  }

  var date = new Date(value);
  if(isNaN(date) //např. new Date("xyz")
    || date.getTime() < new Date("2000-01-01").getTime()) //např. new Date(false) == 0, new Date(123) == 123
  {
    return false;
  }
  else {
    return true;
  }
}
