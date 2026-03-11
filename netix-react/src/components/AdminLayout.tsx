import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import AuthStatus from "./AuthStatus";


export default function AdminLayout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div style={{ fontWeight: 800 }}>NETIX</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Admin</div>
        </div>
  {/* 🔐 AUTH STATUS */}
  <AuthStatus />
        <nav className="nav">
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "")}>
            Admin dashboard
          </NavLink>

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>Dev tools</div>

          <NavLink to="/admin/dev" className={({ isActive }) => (isActive ? "active" : "")}>
            Dev přehled
          </NavLink>

          <NavLink to="/admin/dbtest" className={({ isActive }) => (isActive ? "active" : "")}>
            DB test
          </NavLink>

          <NavLink to="/admin/backend" className={({ isActive }) => (isActive ? "active" : "")}>
            Backend test
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
            Uživatelé
          </NavLink>


          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>Zpět</div>

          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Veřejná část
          </NavLink>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <ThemeToggle />
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
