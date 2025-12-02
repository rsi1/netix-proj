import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import BackendTest from "./pages/BackendTest";

export default function App() {
  return (
    <div>
      <h1>NETIX React</h1>

      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/backend">Backend Test</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/backend" element={<BackendTest />} />
      </Routes>
    </div>
  );
}
