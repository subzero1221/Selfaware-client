"use client";
import Link from "next/link";
import { HiUserGroup } from "react-icons/hi2";

export default function LobbyHeaderButton() {
  const isClient = typeof window !== "undefined";

  const lobbyCode = isClient ? localStorage.getItem("lobby") : null;
  const playerName = isClient ? localStorage.getItem("playerName") : null;

  if (!lobbyCode) return null;

  return (
    <Link
      href={`/lobby/${lobbyCode}`}
      className="flex items-center gap-2.5 px-4 py-2 bg-wood-base border-2 border-wood-accent text-wood-accent rounded-md hover:bg-wood-accent hover:text-wood-base font-bold text-sm uppercase tracking-wide transition-all shadow-[0_4px_0_var(--tw-shadow-color)] shadow-wood-border hover:translate-y-[2px] hover:shadow-[0_2px_0_var(--tw-shadow-color)]"
    >
      <HiUserGroup className="text-xl" />
      <div className="flex items-center gap-2">
        <span>ლობი</span>

        {playerName && (
          <>
            <span className="text-wood-border/40 font-light">|</span>
            <span className="lowercase first-letter:uppercase text-xs font-medium opacity-90 tracking-normal">
              {playerName}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
