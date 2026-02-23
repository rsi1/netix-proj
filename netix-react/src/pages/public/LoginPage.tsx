import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const nav = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from ?? "/admin";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      nav(from, { replace: true });
    } catch {
      setError("Špatné jméno nebo heslo.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>NETIX přihlášení</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>Uživatel</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Heslo</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>}

        <button style={{ marginTop: 16 }} type="submit">
          Přihlásit
        </button>
      </form>
    </div>
  );
}