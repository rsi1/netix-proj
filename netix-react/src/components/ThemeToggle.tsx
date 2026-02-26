import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("netix-theme");
    return saved === "dark" || saved === "light" ? saved : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("netix-theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button className="btn" onClick={toggle} title="Přepnout motiv">
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}