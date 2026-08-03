import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

const handleSwitchAccount = async () => {
  await logout();
  navigate("/login", { replace: true });
};

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        padding: 16,
        background: "#155264",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link to="/about" style={linkStyle}>
          About
        </Link>

        <Link to="/dbtest" style={linkStyle}>
          DB Test
        </Link>

        <Link to="/backend" style={linkStyle}>
          Backend Test
        </Link>

        <Link to="/edesky" style={linkStyle}>
          eDesky
        </Link>

        <Link to="/notes" style={linkStyle}>
          Notes
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "white",
        }}
      >
        {loading ? (
          <span>Ověřuji přihlášení…</span>
        ) : user ? (
          <>
            <span>
              Přihlášen:{" "}
              <strong>{user.username}</strong>

              {user.roles.length > 0 && (
                <small>
                  {" "}
                  (
                  {user.roles
                    .map((role) =>
                      role.replace(/^ROLE_/, ""),
                    )
                    .join(", ")}
                  )
                </small>
              )}
            </span>

            <button
              type="button"
              onClick={handleSwitchAccount}
              style={{
                padding: "7px 12px",
                color: "white",
                background: "#1d2930",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Změnit účet
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              ...linkStyle,
              padding: "7px 12px",
              background: "#1d2930",
              borderRadius: 6,
            }}
          >
            Přihlásit
          </Link>
        )}
      </div>
    </nav>
  );
}