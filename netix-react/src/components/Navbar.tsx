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
    display: "inline-block",
    color: "white",
    textDecoration: "none",
    padding: "10px 12px",
    marginRight: 8,
    marginBottom: 8,
    background: "#1d6478",
    borderRadius: 4,
  };

  return (
    <nav
      style={{
        display: "block",
        padding: 16,
        background: "#155264",
        color: "white",
      }}
    >
      <div style={{ display: "block" }}>
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
          display: "block",
          marginTop: 8,
          color: "white",
        }}
      >
        {loading ? (
          <span>Ověřuji přihlášení...</span>
        ) : user ? (
          <div>
            <span style={{ marginRight: 12 }}>
              Přihlášen: <strong>{user.username}</strong>

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
                padding: "9px 14px",
                color: "white",
                background: "#1d2930",
                border: "1px solid #809097",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Změnit účet
            </button>
          </div>
        ) : (
          <Link to="/login" style={linkStyle}>
            Přihlásit
          </Link>
        )}
      </div>
    </nav>
  );
}