import { useAuth } from "../auth/AuthContext";

export default function AuthStatus() {
  const { state } = useAuth();

  return (
    <div style={{ padding: 8, fontSize: 12, opacity: 0.85 }}>
      {state.status === "loading" && "auth: loading…"}
      {state.status === "anon" && "auth: anon"}
      {state.status === "authed" && `auth: ${state.username} (${state.roles.join(", ")})`}
    </div>
  );
}