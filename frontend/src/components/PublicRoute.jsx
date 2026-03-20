import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function PublicRoute({ children }) {
  if (isLoggedIn()) {
    return <Navigate to="/menu" />;
  }

  return children;
}