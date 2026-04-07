import { useAuth } from "../auth/AuthContext";

export default function AuthStatus() {
  const { state } = useAuth();

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "anon") {
    return null; // ❗ schováme v adminu
  }

  return (
    <div style={{ padding: 8, fontSize: 12, opacity: 0.85 }}>
      {state.username} ({state.roles.join(", ")})
    </div>
  );
}