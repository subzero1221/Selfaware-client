"use client";

import { useTheme } from "@wrksz/themes/client";
import {  MdNightlight } from "react-icons/md";
import { CiLight } from "react-icons/ci";
    



export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1.5 border border-wood-border cursor-pointer rounded-lg font-mono text-lg text-wood-text-secondary hover:bg-wood-surface-hover transition-all"
    >
      {theme === "dark" ? <MdNightlight/> : <CiLight />}
    </button>
  );
}
