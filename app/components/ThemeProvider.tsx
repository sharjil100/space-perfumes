"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggle: () => {} });

export const useTheme = () => useContext(ThemeContext);

const DARK_VARS: Record<string, string> = {
  "--bg":     "#0c0b09",
  "--bg-2":   "#161410",
  "--bg-card":"#1e1b16",
  "--fg":     "#e8e0d4",
  "--muted":  "#8a8076",
  "--accent": "#c4a97d",
  "--border": "rgba(196,169,125,0.18)",
};

const LIGHT_VARS: Record<string, string> = {
  "--bg":     "#f0f0f0",
  "--bg-2":   "#f0e8db",
  "--bg-card":"#e6ddd0",
  "--fg":     "#1a1612",
  "--muted":  "#6b6258",
  "--accent": "#8a6a3a",
  "--border": "rgba(26,22,18,0.18)",
};

function applyVars(vars: Record<string, string>) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("sp-theme") as Theme | null;
    const initial: Theme = saved === "light" ? "light" : "dark";
    setTheme(initial);
    applyVars(initial === "light" ? LIGHT_VARS : DARK_VARS);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("sp-theme", next);
    applyVars(next === "light" ? LIGHT_VARS : DARK_VARS);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
