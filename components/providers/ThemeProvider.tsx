"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SSRProvider } from "@react-aria/ssr";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // On mount: read saved preference or default to dark
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <SSRProvider>
      <ThemeContext.Provider value={{ theme, toggle }}>
        {children}
      </ThemeContext.Provider>
    </SSRProvider>
  );
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  }
}
