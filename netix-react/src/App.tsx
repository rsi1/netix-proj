import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import BackendTest from "./pages/BackendTest";
import DbTestPage from "./pages/DbTestPage";
import EDeskyPage from "./pages/EDeskyPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/backend" element={<BackendTest />} />
          <Route path="/dbtest" element={<DbTestPage />} />
          <Route path="/edesky" element={<EDeskyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
