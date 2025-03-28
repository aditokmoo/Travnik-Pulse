/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

export default function LanguageContext({ children }) {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const storageLanguage = JSON.parse(localStorage.getItem("language"));

    if (storageLanguage) {
      setLanguage(storageLanguage);
    }
  }, [setLanguage]);

  useEffect(() => {
    if (!language) return;
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <context.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useLanguageContext() {
  const data = useContext(context);
  if (!data) throw new Error("You can't use context here");
  return data;
}
