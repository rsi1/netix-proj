import {
  useState,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const {
    user,
    loading,
    login,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const success = await login(
        username,
        password,
      );

      if (!success) {
        setError("Špatné jméno nebo heslo.");
        return;
      }

      navigate("/", { replace: true });
    } catch {
      setError(
        "Přihlášení se nepodařilo. Zkuste to znovu.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main><p>Ověřuji přihlášení…</p></main>;
  }

  if (user) {
    return (
      <main>
        <h1>Přihlášení</h1>

        <p>
          Přihlášený uživatel:{" "}
          <strong>{user.username}</strong>
        </p>

        <button type="button" onClick={logout}>
          Odhlásit se
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>Přihlášení</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Uživatelské jméno
          </label>

          <input
            id="username"
            name="username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Heslo
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p role="alert">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Přihlašuji…"
            : "Přihlásit se"}
        </button>
      </form>
    </main>
  );
}