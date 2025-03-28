/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/useAuth";
import Spinner from "./Spinner/Spinner";

export default function ProtectAdmin({ children }) {
  const { data, isLoading } = useGetUser();

  if (isLoading) return <Spinner />;
  if (data === "Unauthorized") return <Navigate to="/app" />;
  if (data.status === "fail") return <Navigate to="/app" />;

  if (!isLoading && data.role && data.role !== "admin")
    return <Navigate to="/app" />;

  return children;
}
