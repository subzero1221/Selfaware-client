"use client";

import { useRouter } from "next/navigation";
import { GameDto } from "@/types/dtos/game";
import useGame from "@/hooks/game/useGame";
import {
  FaTrophy,
  FaCrown,
  FaFire,
  FaHouse,
  FaChartSimple,
  FaMedal,
} from "react-icons/fa6";

interface GameOverScreenProps {
  game: GameDto;
  joinCode: string;
  playerId: string;
}

export default function GameOverScreen({
  game: initialGame,
  joinCode,
  playerId,
}: GameOverScreenProps) {
  const router = useRouter();
  const { data: game } = useGame(joinCode, playerId);
  const liveGame = game || initialGame;

  const sortedPlayers = [...(liveGame?.players || [])].sort(
    (a, b) => b.score - a.score,
  );

  const currentPlayerRank =
    sortedPlayers.findIndex((p) => p.playerId === playerId) + 1;
  const currentPlayer = sortedPlayers.find((p) => p.playerId === playerId);

  const getRankBadgeStyles = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-500/20 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]";
      case 1:
        return "bg-slate-300/20 border-slate-300 text-slate-300 shadow-[0_0_12px_rgba(203,213,225,0.2)]";
      case 2:
        return "bg-amber-700/20 border-amber-600 text-amber-600";
      default:
        return "bg-wood-surface border-wood-border/40 text-wood-text-muted";
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FaCrown className="text-amber-400 text-lg animate-bounce" />;
      case 1:
        return <FaMedal className="text-slate-300 text-lg" />;
      case 2:
        return <FaMedal className="text-amber-600 text-lg" />;
      default:
        return <span className="font-mono font-black">{index + 1}</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between p-4 md:p-8 max-w-4xl mx-auto w-full select-none animate-fade-in">
      <header className="text-center my-6 flex flex-col items-center">
        <div className="relative mb-3 flex items-center justify-center h-20 w-20 rounded-3xl bg-wood-surface border-2 border-wood-accent/60 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
          <FaTrophy className="text-4xl text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
        </div>

        <p className="text-xs text-wood-accent uppercase tracking-widest font-black mb-1">
          თამაში დასრულდა
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-wood-text-primary tracking-wide drop-shadow-sm">
          საბოლოო შედეგები
        </h1>
      </header>


      <main className="flex-grow w-full bg-wood-surface/40 backdrop-blur border border-wood-border/40 rounded-[2.5rem] p-4 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex flex-col gap-3 overflow-y-auto max-h-[55vh]">
        {sortedPlayers.map((player, index) => {
          const isMe = player.playerId === playerId;
          const rank = index + 1;

          return (
            <div
              key={player.playerId}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                isMe
                  ? "bg-wood-accent/15 border-wood-accent shadow-[0_0_18px_rgba(245,158,11,0.2)] scale-[1.01]"
                  : "bg-wood-base/60 border-wood-border/20 hover:border-wood-border/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`h-11 w-11 rounded-xl border flex items-center justify-center font-mono font-black ${getRankBadgeStyles(
                    index,
                  )}`}
                >
                  {getRankIcon(index)}
                </span>

                <div className="flex flex-col">
                  <span
                    className={`text-md md:text-lg font-bold truncate max-w-[180px] md:max-w-[300px] ${
                      isMe ? "text-wood-accent" : "text-wood-text-primary"
                    }`}
                  >
                    {player.nickName || `მოთამაშე ${rank}`} {isMe && " (შენ)"}
                  </span>
                  {rank === 1 && (
                    <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">
                      გამარჯვებული 🏆
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono">
                {player.streak > 1 && (
                  <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold">
                    <FaFire className="text-orange-500 animate-pulse" />
                    {player.streak}
                  </span>
                )}
                <span
                  className={`text-xl font-black ${
                    isMe ? "text-wood-accent" : "text-wood-text-secondary"
                  }`}
                >
                  {player.score}
                </span>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="w-full mt-6 bg-wood-surface/80 border border-wood-border/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 bg-wood-base border border-wood-border/40 rounded-xl flex items-center justify-center">
            <FaChartSimple className="text-wood-accent text-xl" />
          </div>
          <div className="text-left">
            <p className="text-xs text-wood-text-muted font-semibold uppercase">
              შენი შედეგი
            </p>
            <p className="text-lg font-black text-wood-accent font-mono">
              #{currentPlayerRank} ადგილი ({currentPlayer?.score || 0} ქულა)
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full sm:w-auto px-6 py-3 bg-wood-accent hover:bg-wood-accent/90 text-wood-base font-black rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <FaHouse className="text-lg" />
          მთავარზე დაბრუნება
        </button>
      </footer>
    </div>
  );
}
