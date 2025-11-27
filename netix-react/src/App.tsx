import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1rem" }}>
      <NavBar />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
