import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import AuthStatus from "./AuthStatus";
import { useAuth } from "../auth/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div style={{ fontWeight: 800 }}>NETIX</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Správa</div>
        </div>

        {/* 🔐 USER INFO */}
        <AuthStatus />

        <nav className="nav">
          <NavLink to="/admin" end>
            Admin dashboard
          </NavLink>

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
            Dev tools
          </div>

          <NavLink to="/admin/dev">Dev přehled</NavLink>
          <NavLink to="/admin/dbtest">DB test</NavLink>
          <NavLink to="/admin/backend">Backend test</NavLink>
          <NavLink to="/admin/users">Uživatelé</NavLink>

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
            Zpět
          </div>

          <NavLink to="/">Veřejná část</NavLink>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button onClick={logout}>Odhlásit</button>
          <ThemeToggle />
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}