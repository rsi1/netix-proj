import React from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";   // 👈 přidej

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>      {/* 👈 obal App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
 