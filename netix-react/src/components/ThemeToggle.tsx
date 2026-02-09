import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("netix-theme") as Theme | null) ?? "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("netix-theme", next);
    applyTheme(next);
  };

  return (
    <button className="btn" onClick={toggle} title="Přepnout motiv">
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
