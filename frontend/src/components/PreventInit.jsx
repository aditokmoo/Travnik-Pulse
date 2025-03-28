/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function PreventInit({ children }) {
  const selectedVisitPeriod = localStorage.getItem("selectedVisitPeriod");
  const preferences = JSON.parse(localStorage.getItem("preferences"));
  const visitCount = localStorage.getItem("visitCount");
  const language = localStorage.getItem("language");
  const position = JSON.parse(localStorage.getItem("position"));

  if (selectedVisitPeriod && preferences && visitCount && position && language)
    return <Navigate to="/app" />;

  return children;
}
