import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAdmin() {
  const { state, hasRole } = useAuth();
  const location = useLocation();

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "anon") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole("ADMIN")) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}