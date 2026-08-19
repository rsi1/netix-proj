import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type Props = {
  role: string;
  children: React.ReactNode;
};

export default function RequireRole({
  role,
  children,
}: Props) {
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

  return children;
}