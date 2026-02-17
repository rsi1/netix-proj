import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getMe } from "./authApi";

type Props = { children: ReactNode };

export default function RequireAdmin({ children }: Props) {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "ok" | "no">("loading");

  useEffect(() => {
    let alive = true;

    // 1) lokální dev bypass (aby ses nezasekl hned teď)
    if (import.meta.env.DEV) {
      setStatus("ok");
      return;
    }

    // 2) budoucí: dotaz na backend kdo jsem
    getMe()
      .then((me) => {
        if (!alive) return;
        setStatus(me?.roles?.includes("ADMIN") ? "ok" : "no");
      })
      .catch(() => {
        if (!alive) return;
        setStatus("no");
      });

    return () => {
      alive = false;
    };
  }, []);

  if (status === "loading") return <div style={{ padding: 16 }}>Ověřuji oprávnění…</div>;

  if (status === "no") {
    return <Navigate to="/app" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
