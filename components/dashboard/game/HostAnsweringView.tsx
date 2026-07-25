"use client";

import { GameDto } from "@/types/dtos/game";
import { FaQuestion, FaUsers, FaClock } from "react-icons/fa6";

interface HostAnsweringViewProps {
  game: GameDto;
}

export default function HostAnsweringView({ game }: HostAnsweringViewProps) {
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">

      <div className="bg-wood-surface/60 backdrop-blur border border-wood-border/50 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-wood-accent">
            <FaQuestion className="text-sm" /> მიმდინარე შეკითხვა
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 bg-wood-base rounded-full border border-wood-border/40 text-wood-text-muted">
            <FaClock className="text-wood-accent" /> {game.timeLimitSeconds}წმ
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-black text-wood-text-primary mb-2">
          {game.currentQuestion?.text || "შეკითხვა იტვირთება..."}
        </h2>
      </div>


      <div className="bg-wood-surface/40 border border-wood-border/40 rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-wood-text-primary flex items-center gap-2">
            <FaUsers className="text-wood-accent" /> მოთამაშეები (
            {game.players.length})
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {game.players.map((player) => (
            <div
              key={player.playerId}
              className="bg-wood-base/70 border border-wood-border/30 rounded-xl p-3 flex items-center justify-between"
            >
              <span className="font-bold text-sm text-wood-text-primary truncate max-w-[120px]">
                {player.nickName || `Player ${player.playerId.slice(0, 4)}`}
              </span>
              <span className="text-xs font-mono text-wood-accent font-black">
                {player.score} ქ
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
