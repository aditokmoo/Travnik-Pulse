import { createContext, useContext, useState } from "react";

const context = createContext();

export default function AdminContext({ children }) {
  const [activeDate, setActiveDate] = useState(null);
  return (
    <context.Provider value={{ activeDate, setActiveDate }}>
      {children}
    </context.Provider>
  );
}

export function useAdminContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CANT USE ADMIN CONTEXT HERE");

  return data;
}
