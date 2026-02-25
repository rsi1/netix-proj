import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// zatím dummy – později napojíš na backend a token/roles
export default function LoginPage() {
  const nav = useNavigate();
  const loc = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = (loc.state as any)?.from || "/admin";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: tady později zavoláš backend /api/auth/login a uložíš token/roles
    // zatím jen "předstíráme" login:
    localStorage.setItem("netix.auth", "1");

    nav(from, { replace: true });
  }

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

        <button type="submit" style={{ padding: "10px 14px" }}>
          Přihlásit
        </button>
      </form>
    </div>
  );
}