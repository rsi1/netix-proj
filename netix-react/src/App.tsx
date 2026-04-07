import { HashRouter, Routes, Route } from "react-router-dom";
import RequireAdmin from "./auth/RequireAdmin";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/public/Home";
import LoginPage from "./pages/public/LoginPage";
import ForbiddenPage from "./pages/public/ForbiddenPage";
import NotFound from "./pages/public/NotFound";

import AdminHome from "./pages/admin/AdminHome";
import DevToolsPage from "./pages/admin/DevToolsPage";
import DbTestPage from "./pages/admin/DbTestPage";
import BackendTest from "./pages/admin/BackendTest";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import EDeskyPage from "./pages/public/EDeskyPage";
import MapPage from "./pages/public/MapPage";
import MapsPage from "./pages/public/MapsPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 🌐 PUBLIC */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forbidden" element={<ForbiddenPage />} />
          <Route path="edesky" element={<EDeskyPage />} />
          <Route path="map-cz" element={<MapPage />} />
          <Route path="map-world" element={<MapsPage />} />
        </Route>

        {/* 🔐 ADMIN */}
        <Route element={<RequireAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="dev" element={<DevToolsPage />} />
            <Route path="dbtest" element={<DbTestPage />} />
            <Route path="backend" element={<BackendTest />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}