import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">NETIX</div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/edesky" className={({ isActive }) => (isActive ? "active" : "")}>
            e-Desky
          </NavLink>
          <NavLink to="/backend" className={({ isActive }) => (isActive ? "active" : "")}>
            Backend test
          </NavLink>
          <NavLink to="/dbtest" className={({ isActive }) => (isActive ? "active" : "")}>
            DB test
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            O projektu
          </NavLink>
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="muted">NETIX Admin</div>
          <ThemeToggle />
        </header>

        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
