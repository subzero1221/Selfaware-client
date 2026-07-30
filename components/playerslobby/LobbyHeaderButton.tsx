"use client";

import Link from "next/link";
import { Users } from "lucide-react";

export default function LobbyHeaderButton() {
  const isClient = typeof window !== "undefined";

  const lobbyCode = isClient ? localStorage.getItem("lobby") : null;
  const playerName = isClient ? localStorage.getItem("playerName") : null;

  if (!lobbyCode) return null;

  return (
    <Link
      href={`/lobby/${lobbyCode}`}
      className="
        group flex items-center gap-2.5 px-4 py-2 bg-[#06D6A0] hover:bg-[#06D6A0]/90 
        text-amber-950 font-black text-sm uppercase tracking-wider rounded-xl transition-all
        border-[3px] border-amber-950 border-b-[5px] active:border-b-[3px] active:translate-y-[2px]
        shadow-[3px_4px_0_0_var(--color-wood-section-shadow)] hover:shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]
        -rotate-1 hover:rotate-0
      "
    >
      <Users
        size={20}
        strokeWidth={3}
        className="group-hover:scale-110 transition-transform"
      />
      <div className="flex items-center gap-2 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
        <span>ლობი</span>

        {playerName && (
          <>
            <span className="text-amber-950/40 font-black">|</span>
            <span className="lowercase first-letter:uppercase text-xs font-bold opacity-90 tracking-normal">
              {playerName}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
