import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { state, hasRole } = useAuth();
  const location = useLocation();

  if (state.status === "loading") return <div>Loading...</div>;

  if (state.status === "anon") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!hasRole("ADMIN")) {
    return <Navigate to="/forbidden" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}