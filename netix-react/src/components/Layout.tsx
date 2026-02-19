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

          {/* MAPY */}
          <NavLink to="/map-cz" className={({ isActive }) => (isActive ? "active" : "")}>
            Mapa ČR
          </NavLink>

          <NavLink to="/map-world" className={({ isActive }) => (isActive ? "active" : "")}>
            Mapa světa
          </NavLink>

          {/* ADMIN */}
          <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
            Admin
          </NavLink>
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="muted">NETIX</div>
          <ThemeToggle />
        </header>

        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
