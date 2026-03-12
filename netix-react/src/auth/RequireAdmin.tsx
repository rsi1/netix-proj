import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAdmin() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (auth.state.status === "anon") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!auth.hasRole("ADMIN")) {
    return <Navigate to="/admin/forbidden" replace />;
  }

  return <Outlet />;
}