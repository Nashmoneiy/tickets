// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_token"); // or "isLoggedIn"

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
