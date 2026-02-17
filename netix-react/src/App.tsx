import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/public/Home";
import BackendTest from "./pages/admin/BackendTest";
import DbTestPage from "./pages/admin/DbTestPage";
import EDeskyPage from "./pages/public/EDeskyPage";
import MapPage from "./pages/public/MapPage";
import MapsPage from "./pages/public/MapsPage";
import NotFound from "./pages/public/NotFound";

import AdminHome from "./pages/admin/AdminHome";
import DevToolsPage from "./pages/admin/DevToolsPage";
import RequireAdmin from "./auth/RequireAdmin";

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        {/* Public část */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="edesky" element={<EDeskyPage />} />
          <Route path="map-cz" element={<MapPage />} />
          <Route path="map-world" element={<MapsPage />} />
        </Route>

        {/* Admin část (chráněná) */}
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="dev" element={<DevToolsPage />} />
          <Route path="dbtest" element={<DbTestPage />} />
          <Route path="backend" element={<BackendTest />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
