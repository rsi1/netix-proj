import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    marginRight: "1rem",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  return (
    <nav style={{ marginBottom: "1rem" }}>
      <Link to="/" style={linkStyle("/")}>
        Domů
      </Link>
      <Link to="/about" style={linkStyle("/about")}>
        O aplikaci
      </Link>
    </nav>
  );
};

export default NavBar;
