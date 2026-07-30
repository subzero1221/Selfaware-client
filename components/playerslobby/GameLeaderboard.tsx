"use client";

import { GameDto } from "@/types/dtos/game";
import useGame from "@/hooks/game/useGame";
import { useCallback } from "react";
import useNextQuestion from "@/hooks/game/socket/useNextQuestion";
import useGameTimer from "@/hooks/game/useGameTimer";
import { Trophy, Timer, Flame, Medal, Crown } from "lucide-react";

interface GameLeaderboardProps {
  game: GameDto;
  joinCode: string;
  playerId: string;
}

export default function GameLeaderboard({
  game: initialGame,
  joinCode,
  playerId,
}: GameLeaderboardProps) {
  const { data: game } = useGame(joinCode, playerId);
  const { sendNextQuestionSignal } = useNextQuestion(joinCode, playerId);
  const liveGame = game || initialGame;

  const sortedPlayers = [...(liveGame?.players || [])].sort(
    (a, b) => b.score - a.score,
  );

  const currentPlayerRank =
    sortedPlayers.findIndex((p) => p.playerId === playerId) + 1;

 
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
        return <Crown size={20} strokeWidth={3} className="mb-1" />;
      case 1:
      case 2:
        return <Medal size={20} strokeWidth={3} />;
      default:
        return null;
    }
  };

  const handleTimeUp = useCallback(() => {
    sendNextQuestionSignal();
  }, [sendNextQuestionSignal]);

  const timeLeft = useGameTimer({
    initialTime: liveGame.timeLeft,
    onTimeUp: handleTimeUp,
  });

  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-wood-text-primary flex flex-col font-sans overflow-hidden transition-colors duration-300 p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col min-h-screen justify-between max-w-4xl mx-auto w-full relative z-10">
     
        <header className="flex justify-between items-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#06D6A0] border-4 border-wood-border text-amber-950 font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1">
            <Trophy size={24} strokeWidth={3} />
            <span className="uppercase tracking-wider text-sm md:text-base drop-shadow-[0_2px_0_rgba(255,255,255,0.4)]">
              ლიდერბორდი
            </span>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#FFD166] border-4 border-wood-border text-amber-950 font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2">
            <Timer
              size={24}
              strokeWidth={3}
              className={timeLeft <= 5 ? "animate-pulse text-red-600" : ""}
            />
            <span
              className={`text-xl tracking-widest font-mono ${timeLeft <= 5 ? "text-red-600" : ""}`}
            >
              {timeLeft}
            </span>
          </div>
        </header>

      
        <main className="flex-grow w-full bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-4 md:p-8 shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] flex flex-col gap-4 overflow-y-auto max-h-[65vh] mb-8 custom-scrollbar">
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
                </div>

              
                <div className="flex items-center gap-3 md:gap-6 font-mono">
                  {player.streak > 1 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EF476F] border-2 border-amber-950 text-white font-black text-sm md:text-base shadow-[2px_2px_0_0_rgba(67,20,7,0.5)] rotate-3 animate-pulse">
                      <Flame
                        size={16}
                        strokeWidth={3}
                        className="fill-current"
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

    
        <footer className="w-full bg-[#EF476F] border-4 border-wood-border rounded-[2rem] p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] rotate-1">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-white border-4 border-amber-950 rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] -rotate-6">
              📊
            </div>
            <div className="text-left">
              <p className="text-sm text-white/80 font-bold uppercase tracking-wider">
                შენი პოზიცია
              </p>
              <p className="text-2xl font-black text-white font-mono drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                #{currentPlayerRank}{" "}
                <span className="text-lg opacity-70">
                  / {sortedPlayers.length}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-3 text-center sm:text-right backdrop-blur-sm shadow-inner">
            <p className="text-sm font-black text-white uppercase tracking-wider drop-shadow-sm animate-pulse">
              ველოდებით მასპინძელს...
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
