"use client";

import { GameDto } from "@/types/dtos/game";

interface HostLeaderboardViewProps {
  game: GameDto;
}

export default function HostLeaderboardView({
  game,
}: HostLeaderboardViewProps) {
  const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <header className="text-center my-2">
        <span className="text-xs text-wood-accent uppercase tracking-widest font-black">
          რაუნდის შედეგები
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-wood-text-primary">
          ლიდერბორდი
        </h2>
      </header>

      <div className="bg-wood-surface/50 border border-wood-border/40 rounded-3xl p-4 md:p-6 flex flex-col gap-3 shadow-xl max-h-[60vh] overflow-y-auto">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.playerId}
            className="bg-wood-base/80 border border-wood-border/30 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 rounded-xl bg-wood-surface border border-wood-border/40 flex items-center justify-center font-mono font-black text-wood-accent">
                #{index + 1}
              </span>
              <span className="font-bold text-lg text-wood-text-primary">
                {player.nickName || `Player ${player.playerId.slice(0, 4)}`}
              </span>
            </div>
            <span className="font-mono text-xl font-black text-wood-accent">
              {player.score} ქულა
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
