"use client";

import { useRouter } from "next/navigation";
import { GameDto } from "@/types/dtos/game";
import useGame from "@/hooks/game/useGame";
import { Trophy, Crown, Medal, Flame, Home, BarChart3 } from "lucide-react";

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
        return "bg-[#FFD166] text-amber-950 border-4 border-amber-950 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2 scale-110";
      case 1:
        return "bg-[#06D6A0] text-amber-950 border-4 border-amber-950 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-2 scale-105";
      case 2:
        return "bg-[#EF476F] text-white border-4 border-amber-950 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1";
      default:
        return "bg-wood-base text-wood-text-primary border-4 border-wood-border shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]";
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Crown size={20} strokeWidth={3} className="animate-bounce mb-1" />
        );
      case 1:
      case 2:
        return <Medal size={20} strokeWidth={3} />;
      default:
        return null;
    }
  };

  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-wood-text-primary flex flex-col font-sans overflow-hidden transition-colors duration-300 p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col min-h-screen justify-between max-w-4xl mx-auto w-full relative z-10">
        <header className="text-center my-4 flex flex-col items-center">
          <div className="relative mb-4 flex items-center justify-center h-24 w-24 rounded-3xl bg-[#FFD166] border-4 border-wood-border shadow-[6px_8px_0_0_var(--color-wood-section-shadow)] -rotate-3 hover:rotate-0 transition-transform">
            <Trophy
              size={48}
              strokeWidth={2.5}
              className="text-amber-950 drop-shadow-[0_2px_0_rgba(255,255,255,0.4)]"
            />
          </div>

          <div className="inline-block px-4 py-1.5 rounded-xl bg-[#EF476F] border-4 border-wood-border text-white font-black text-xs md:text-sm uppercase tracking-widest shadow-[3px_3px_0_0_var(--color-wood-section-shadow)] rotate-2 mb-2">
            თამაში დასრულდა
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-wood-text-primary tracking-wide drop-shadow-[0_4px_0_var(--color-wood-shadow)]">
            საბოლოო შედეგები
          </h1>
        </header>

        <main className="flex-grow w-full bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-4 md:p-8 shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] flex flex-col gap-4 overflow-y-auto max-h-[55vh] mb-6 custom-scrollbar">
          {sortedPlayers.map((player, index) => {
            const isMe = player.playerId === playerId;
            const rank = index + 1;

            return (
              <div
                key={player.playerId}
                className={`
                  group flex items-center justify-between p-4 md:p-6 rounded-3xl border-4 transition-all duration-300 
                  ${
                    isMe
                      ? "bg-[#FFD166] border-wood-border shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] scale-[1.02] -rotate-1 z-10"
                      : "bg-wood-base border-wood-border/50 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] hover:border-wood-border"
                  }
                `}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div
                    className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl flex flex-col items-center justify-center font-black text-lg md:text-xl z-10 ${getRankBadgeStyles(
                      index,
                    )}`}
                  >
                    {getRankIcon(index)}
                    <span className={index === 0 ? "leading-none" : ""}>
                      {rank}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`text-lg md:text-2xl font-black truncate max-w-[150px] md:max-w-[300px] tracking-wide ${
                        isMe ? "text-amber-950" : "text-wood-text-primary"
                      }`}
                    >
                      {player.nickName || `მოთამაშე ${rank}`}
                      {isMe && (
                        <span className="text-amber-900/60 ml-2 text-sm md:text-lg">
                          (შენ)
                        </span>
                      )}
                    </span>
                    {rank === 1 && (
                      <span className="inline-block text-[11px] md:text-xs font-black uppercase tracking-wider text-amber-950/80 bg-white/40 px-2 py-0.5 rounded-md border border-amber-950/20 w-max mt-0.5">
                        გამარჯვებული 🏆
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-6 font-mono">
                  {player.streak > 1 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EF476F] border-2 border-amber-950 text-white font-black text-sm md:text-base shadow-[2px_2px_0_0_rgba(67,20,7,0.5)] rotate-3">
                      <Flame
                        size={16}
                        strokeWidth={3}
                        className="fill-current animate-pulse"
                      />
                      {player.streak}
                    </div>
                  )}
                  <span
                    className={`text-2xl md:text-3xl font-black tracking-widest ${
                      isMe ? "text-amber-950" : "text-wood-text-secondary"
                    }`}
                  >
                    {player.score}
                  </span>
                </div>
              </div>
            );
          })}
        </main>

        <footer className="w-full bg-[#06D6A0] border-4 border-wood-border rounded-[2rem] p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] -rotate-1">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-white border-4 border-amber-950 rounded-2xl flex items-center justify-center text-amber-950 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] rotate-3">
              <BarChart3 size={28} strokeWidth={3} />
            </div>
            <div className="text-left">
              <p className="text-xs text-amber-950/80 font-bold uppercase tracking-wider">
                შენი შედეგი
              </p>
              <p className="text-xl md:text-2xl font-black text-amber-950 font-mono drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                #{currentPlayerRank} ადგილი{" "}
                <span className="text-base font-extrabold opacity-90">
                  ({currentPlayer?.score || 0} ქულა)
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="
              w-full sm:w-auto px-8 py-4 bg-[#FFD166] hover:bg-[#FFD166]/90 text-amber-950 font-black text-lg rounded-2xl transition-all
              border-4 border-wood-border border-b-[6px] active:border-b-4 active:translate-y-[2px]
              shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] hover:shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]
              flex items-center justify-center gap-3 uppercase tracking-wider rotate-1 hover:rotate-0
            "
          >
            <Home size={22} strokeWidth={3} />
            მთავარზე დაბრუნება
          </button>
        </footer>
      </div>
    </div>
  );
}
