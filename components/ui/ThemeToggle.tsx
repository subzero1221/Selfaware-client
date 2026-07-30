"use client";

import { useTheme } from "@wrksz/themes/client";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="
        group flex items-center justify-center p-2.5 bg-[#FFD166] hover:bg-[#FFC436] 
        text-amber-950 rounded-xl transition-all 
        border-[3px] border-amber-950 border-b-[5px] active:border-b-[3px] active:translate-y-[2px]
        shadow-[3px_4px_0_0_var(--color-wood-section-shadow)] hover:shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]
        rotate-2 hover:rotate-0 cursor-pointer
      "
    >
      {theme === "dark" ? (
        <Moon
          size={22}
          strokeWidth={3}
          className="group-hover:-rotate-12 transition-transform"
        />
      ) : (
        <Sun
          size={22}
          strokeWidth={3}
          className="group-hover:rotate-12 transition-transform"
        />
      )}
    </button>
  );
}
