"use client";

import ConfirmModal from "@/components/ui/ConfirmModal";
import useKickLobbyPlayer from "@/hooks/game/useKickLobbyPlayer";
import { useState } from "react";

interface Players {
  players: LobbyPlayerDto[];
  joinCode: string;
}

export default function PlayerList({ players, joinCode }: Players) {
  const { mutate: kickPlayer, isPending, error } = useKickLobbyPlayer();

  const [playerToKick, setPlayerToKick] = useState<string | null>(null);

  const handleConfirmKick = () => {
    if (playerToKick) {
      kickPlayer({ id: playerToKick, joinCode });
      setPlayerToKick(null);
    }
  };

  return (
    <section className="md:col-span-2 bg-gradient-to-b from-wood-surface/90 to-wood-surface/40 backdrop-blur-sm border border-wood-border/60 rounded-[2rem] p-6 sm:p-8 h-[450px] flex flex-col shadow-lg relative">
      <div className="flex justify-between items-end border-b border-wood-border/40 pb-4 mb-6">
        <h2 className="text-lg font-semibold text-wood-accent tracking-wide">
          მოთამაშეების სია
        </h2>
        <span className="text-xs text-wood-text-muted bg-wood-base px-3 py-1 rounded-full border border-wood-border/50">
          სულ: {players.length}
        </span>
      </div>

      {players.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-wood-border/30 rounded-2xl bg-wood-base/20">
          <p className="text-wood-text-muted text-sm font-medium tracking-wide">
            ველოდებით მონაწილეებს...
          </p>
          <p className="text-xs text-wood-text-muted/50 mt-2 max-w-xs text-center">
            მოთამაშეები ავტომატურად გამოჩნდებიან ეკრანზე შემოსვლისთანავე.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4 pr-2 content-start custom-scrollbar">
          {players.map((player) => (
            <div
              key={player.id}
              className="group relative flex items-center justify-center bg-wood-base border border-wood-border/50 px-4 py-3.5 rounded-2xl hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:border-wood-accent/30 transition-all duration-300 overflow-hidden"
            >
              <span className="text-sm font-semibold text-wood-accent tracking-wide truncate max-w-[90%] text-white group-hover:text-wood-accent transition-colors">
                {player.nickName}
              </span>

              <button
                onClick={() => setPlayerToKick(player.id)}
                className="absolute inset-0 bg-gradient-to-r from-red-900/95 to-red-950/95 text-red-200 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
                    strokeWidth="2"
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
