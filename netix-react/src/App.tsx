import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import BackendTest from "./pages/BackendTest";
import NotFound from "./pages/NotFound";
import DbTestPage from "./pages/DbTestPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/backend" element={<BackendTest />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dbtest" element={<DbTestPage />} />

      </Routes>
    </BrowserRouter>
  );
}
