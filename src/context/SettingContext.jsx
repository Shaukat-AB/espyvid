import { useEffect } from "react";
import { createContext, useState } from "react";

const SettingContext = createContext(null);

const intialSettings = {
  theme: "light",
  thumbnail: "medium",
  "region-code": "pk",
}

const changeTheme = () => {
  let e = document.body;
  let darkMode = document.body.classList.contains("dark");
  darkMode ? e.classList.remove("dark") : e.classList.add("dark");
};

const getSavedSettings = () => {
  if( localStorage.getItem("settings") ) {
    let settings = JSON.parse(localStorage.getItem("settings"));
    (settings.theme === 'dark') && changeTheme();
    (window.matchMedia('(prefers-color-scheme: dark)').matches) && changeTheme();
    return settings;
  }return null;
}

const currentSettings = ( getSavedSettings() || intialSettings );

const SettingProvider = ({ children }) => {
  const [settings, setSettings] = useState( currentSettings );

  const changeSettings = (title, value) => {
    let newValue = settings;
    newValue[title] = value;
    setSettings(() => newValue);
    if (title === "theme") changeTheme();
    localStorage.setItem("settings", JSON.stringify(settings) );
  };

  useEffect(()=> {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (matches) => {
      if(matches) settings.theme !== 'dark' && changeTheme();
      else settings.theme === 'dark' && changeTheme();
    });
  },[])


  return (
    <SettingContext.Provider value={[settings, changeSettings]}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
