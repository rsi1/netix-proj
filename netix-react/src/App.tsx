import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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


function ProtectedAdmin() {
  return (
    <RequireAdmin>
      <Outlet />
    </RequireAdmin>
  );
}

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

        {/* Admin shell */}
        <Route path="admin" element={<AdminLayout />}>
          {/* NEchráněné admin stránky */}
          <Route path="login" element={<LoginPage />} />
          <Route path="forbidden" element={<ForbiddenPage />} />

          {/* Chráněné admin stránky */}
      {/* <Route element={<ProtectedAdmin />} /> */}
            <Route index element={<AdminHome />} />
            <Route path="dev" element={<DevToolsPage />} />
            <Route path="dbtest" element={<DbTestPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="backend" element={<BackendTest />} />
        {/*  </Route> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}







