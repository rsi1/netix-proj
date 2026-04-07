import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Špatné jméno nebo heslo.");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 24 }}>
      <h1>Přihlášení</h1>
      <p>Pro přístup do administrace se přihlaste.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username">Uživatel</label>
          <br />
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Heslo</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit">Přihlásit</button>

        {error && (
          <p style={{ color: "red", marginTop: 12 }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}