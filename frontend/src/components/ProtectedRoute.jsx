import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedUserRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function ProtectedAdminRoute({ children }) {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/admin-login" replace />;
  return children;
}
