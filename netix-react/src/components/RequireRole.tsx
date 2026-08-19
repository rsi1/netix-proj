import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type { ReactNode } from "react";

type Props = {
  role: string;
  children: ReactNode;
};

export default function RequireRole({
  role,
  children,
}: Props): JSX.Element | null {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Načítám...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.roles.includes(role)) {
    return <div>Nemáte oprávnění k této stránce.</div>;
  }

  return <>{children}</>;
}