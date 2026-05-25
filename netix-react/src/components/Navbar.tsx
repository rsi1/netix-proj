import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: 16,
        background: "#155264",
      }}
    >
      <Link
        to="/"
        style={{
          marginRight: 20,
          color: "white",
          textDecoration: "none",
        }}
      >
        Home
      </Link>

      <Link
        to="/about"
        style={{
          marginRight: 20,
          color: "white",
          textDecoration: "none",
        }}
      >
        About
      </Link>

      <Link
        to="/dbtest"
        style={{
          marginRight: 20,
          color: "white",
          textDecoration: "none",
        }}
      >
        DB Test
      </Link>
      
      <Link
        to="/backend"
        style={{
          marginRight: 20,
          color: "white",
          textDecoration: "none",
        }}
      >
        Backend Test
      </Link>

      <Link
        to="/edesky"
        style={{
          marginRight: 20,
          color: "white",
          textDecoration: "none",
        }}
      >
        eDesky
      </Link>

      <Link
        to="/notes"
        style={{
          marginRight: 10,
          color: "white",
          textDecoration: "none",
        }}
      >
        Notes
      </Link>

    </nav>
  );
}