"use client";

import { useState } from "react";
import { GameDto } from "@/types/dtos/game";
import {
  FaTrophy,
  FaCrown,
  FaMedal,
  FaFloppyDisk,
  FaCheck,
  FaCircleNotch,
} from "react-icons/fa6";
import useSaveGame from "@/hooks/game/useSaveGame";

interface HostGameOverViewProps {
  game: GameDto;
  joinCode: string;
}

export default function HostGameOverView({
  game,
  joinCode,
}: HostGameOverViewProps) {
  const {
    mutateAsync: saveGame,
    isPending: isSaveGameLoading,
    error: saveGameError,
  } = useSaveGame(joinCode);

  const [isSaved, setIsSaved] = useState(false);
  const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const handleSaveGame = async () => {
    try {
      const res = await saveGame();
      if (res.success) {
        setIsSaved(true);
      }
    } catch (err) {}
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="bg-wood-surface/60 border border-wood-border/50 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center shadow-2xl">
        <div className="h-20 w-20 bg-amber-500/20 border-2 border-amber-400 rounded-3xl flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
          <FaTrophy className="text-4xl text-amber-400" />
        </div>

        <p className="text-xs uppercase tracking-widest font-black text-wood-accent mb-1">
          თამაში დასრულებულია
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-wood-text-primary mb-4">
          საბოლოო შედეგები
        </h2>

        {winner && (
          <div className="bg-wood-base/80 border border-amber-500/40 rounded-2xl px-6 py-3 flex items-center gap-3">
            <FaCrown className="text-amber-400 text-xl" />
            <span className="font-bold text-lg text-wood-text-primary">
              გამარჯვებული:{" "}
              <span className="text-amber-400">{winner.nickName}</span> (
              {winner.score} ქულა)
            </span>
          </div>
        )}
      </div>

      <div className="bg-wood-surface/40 border border-wood-border/40 rounded-3xl p-6 shadow-md max-h-[45vh] overflow-y-auto flex flex-col gap-3">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.playerId}
            className="bg-wood-base/70 border border-wood-border/30 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {index === 0 ? (
                <FaCrown className="text-amber-400 text-xl" />
              ) : index === 1 ? (
                <FaMedal className="text-slate-300 text-xl" />
              ) : index === 2 ? (
                <FaMedal className="text-amber-600 text-xl" />
              ) : (
                <span className="font-mono font-bold text-wood-text-muted w-6 text-center">
                  #{index + 1}
                </span>
              )}
              <span className="font-bold text-wood-text-primary">
                {player.nickName || `Player ${player.playerId.slice(0, 4)}`}
              </span>
            </div>
            <span className="font-mono font-black text-wood-accent">
              {player.score} ქ
            </span>
          </div>
        ))}
      </div>

      <div className="bg-wood-surface/80 border border-wood-border/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="font-bold text-wood-text-primary text-lg">
            შედეგების შენახვა
          </h4>
          <p className="text-xs text-wood-text-muted">
            შეინახეთ თამაშის მონაცემები ბაზაში.
          </p>
          {saveGameError && (
            <p className="text-xs text-red-400 mt-1 font-bold">
              {saveGameError.message}
            </p>
          )}
        </div>

        <button
          onClick={handleSaveGame}
          disabled={isSaveGameLoading}
          className={`px-6 py-3.5 rounded-xl font-black text-sm flex items-center gap-2.5 transition-all shadow-lg active:scale-95 ${
            isSaved
              ? "bg-emerald-600 text-white cursor-default"
              : isSaveGameLoading
                ? "bg-wood-border text-wood-text-muted cursor-wait"
                : "bg-wood-accent text-wood-base hover:bg-wood-accent/90"
          }`}
        >
          {isSaveGameLoading ? (
            <>
              <FaCircleNotch className="animate-spin text-lg" />
              ინახება...
            </>
          ) : isSaved ? (
            <>
              <FaCheck className="text-lg" />
              შენახულია!
            </>
          ) : (
            <>
              <FaFloppyDisk className="text-lg" />
              თამაშის შენახვა
            </>
          )}
        </button>
      </div>
    </div>
  );
}
