import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

export default function LoginPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const from = loc.state?.from || "/admin";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
      nav(from, { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR", err);
      setError("Špatné jméno nebo heslo.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "left" }}>
      <h1>Přihlášení</h1>

      <form onSubmit={onSubmit}>
        <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
          <label>
            Uživatelské jméno
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              autoFocus
            />
          </label>

          <label>
            Heslo
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: 10, marginTop: 6 }}
            />
          </label>
        </div>

        {error && (
          <div style={{ color: "crimson", marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button type="submit" style={{ padding: "10px 14px" }}>
          Přihlásit
        </button>
      </form>
    </div>
  );
}