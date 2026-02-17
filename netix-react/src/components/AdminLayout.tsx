import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function AdminLayout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div style={{ fontWeight: 800 }}>NETIX</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Admin</div>
        </div>

        <nav className="nav">
          <NavLink to="/app/admin" end className={({ isActive }) => (isActive ? "active" : "")}>
            Admin dashboard
          </NavLink>

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>Dev tools</div>

          <NavLink to="/app/admin/dev" className={({ isActive }) => (isActive ? "active" : "")}>
            Dev přehled
          </NavLink>

          <NavLink to="/app/admin/dbtest" className={({ isActive }) => (isActive ? "active" : "")}>
            DB test
          </NavLink>

          <NavLink to="/app/admin/backend" className={({ isActive }) => (isActive ? "active" : "")}>
            Backend test
          </NavLink>

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>Zpět</div>

          <NavLink to="/app" className={({ isActive }) => (isActive ? "active" : "")}>
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
