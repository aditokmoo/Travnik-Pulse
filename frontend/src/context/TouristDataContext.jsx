/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

export default function TouristDataContext({ children }) {
  const [activePanel, setActivePanel] = useState("intro");
  const [selectedVisitPeriod, setSelectedVisitPeriod] = useState(null);
  const [visitCount, setVisitCount] = useState(null);
  const [position, setPosition] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [suggestPlace, setSuggestPlace] = useState(false);
  const [activePreference, setActivePreference] = useState();
  const [activeShopPreference, setActiveShopPreference] = useState(null);

  useEffect(() => {
    const storageSuggestion = JSON.parse(localStorage.getItem("suggestPlace"));

    if (storageSuggestion) {
      setSuggestPlace(storageSuggestion);
    }
  }, [setSuggestPlace]);

  useEffect(() => {
    localStorage.setItem("suggestPlace", JSON.stringify(suggestPlace));
  }, [suggestPlace]);

  return (
    <context.Provider
      value={{
        activePanel,
        setActivePanel,
        selectedVisitPeriod,
        setSelectedVisitPeriod,
        visitCount,
        setVisitCount,
        position,
        setPosition,
        preferences,
        setPreferences,
        suggestPlace,
        setSuggestPlace,
        activePreference,
        setActivePreference,
        activeShopPreference,
        setActiveShopPreference,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useTouristDataContext() {
  const data = useContext(context);
  if (!data) throw new Error("You can't use context here");
  return data;
}
