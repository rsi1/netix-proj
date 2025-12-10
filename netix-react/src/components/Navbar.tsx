import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 16, background: "#1f1f1f", color: "white" }}>
      <Link to="/" style={{ marginRight: 20 }}>Home</Link>
      <Link to="/about" style={{ marginRight: 20 }}>About</Link>
      <Link to="/backend" style={{ marginRight: 20 }}>Backend Test</Link>
      <Link to="/edesky" style={{ marginRight: 20 }}>eDesky</Link>
      <Link to="/dbtest" style={{ marginRight: 20 }}>DB Test</Link>

    </nav>
  );
}
