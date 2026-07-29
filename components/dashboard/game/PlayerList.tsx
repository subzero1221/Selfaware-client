"use client";

import { useState } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import useKickLobbyPlayer from "@/hooks/game/useKickLobbyPlayer";

interface PlayerListProps {
  players: LobbyPlayerDto[];
  joinCode: string;
}

export default function PlayerList({ players, joinCode }: PlayerListProps) {
  const { mutate: kickPlayer } = useKickLobbyPlayer();
  const [playerToKick, setPlayerToKick] = useState<string | null>(null);

  const handleConfirmKick = () => {
    if (playerToKick) {
      kickPlayer({ id: playerToKick, joinCode });
      setPlayerToKick(null);
    }
  };

  return (
    <section className="md:col-span-2 bg-wood-surface border-4 border-wood-border rounded-3xl p-6 sm:p-8 flex flex-col shadow-[8px_8px_0_0_var(--color-wood-section-shadow)] min-h-[450px]">
      <div className="flex justify-between items-end border-b-4 border-wood-border pb-4 mb-6">
        <h2 className="text-xl font-black text-wood-text-secondary tracking-wide uppercase">
          მოთამაშეების სია
        </h2>
        <span className="text-sm font-bold bg-[#FFD166] px-4 py-2 rounded-xl border-2 border-wood-border shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]">
          სულ: {players.length}
        </span>
      </div>

      {players.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-wood-border/30 rounded-2xl bg-amber-50/50 p-6">
          <p className="text-wood-text-primary font-black text-base uppercase tracking-wide">
            ველოდებით მონაწილეებს...
          </p>
          <p className="text-xs font-bold text-wood-text-primary/70 mt-2 max-w-xs text-center">
            მოთამაშეები ავტომატურად გამოჩნდებიან ეკრანზე შემოსვლისთანავე.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4 pr-2 content-start custom-scrollbar">
          {players.map((player) => (
            <div
              key={player.id}
              className="group relative flex items-center justify-center bg-[#118AB2] text-white border-4 border-amber-950 px-4 py-3.5 rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <span className="text-sm font-black tracking-wide truncate max-w-[90%] uppercase">
                {player.nickName}
              </span>

              <button
                onClick={() => setPlayerToKick(player.id)}
                className="absolute inset-0 bg-[#EF476F] text-white border-2 border-amber-950 text-xs font-black uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                გაგდება
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!playerToKick}
        onClose={() => setPlayerToKick(null)}
        onConfirm={handleConfirmKick}
        description="დარწმუნებული ხართ, რომ გსურთ ამ მოთამაშის გაგდება?"
      />
    </section>
  );
}
