"use client";

import { GameDto } from "@/types/dtos/game";
import useGame from "@/hooks/game/useGame";
import { useCallback } from "react";
import useNextQuestion from "@/hooks/game/socket/useNextQuestion";
import useGameTimer from "@/hooks/game/useGameTimer";
import {
  Trophy,
  Timer,
  Flame,
  Medal,
  Crown,
  Check,
  X,
  BarChart3,
} from "lucide-react";

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

  const currentPlayer = sortedPlayers.find((p) => p.playerId === playerId);


  const isCorrect = currentPlayer ? currentPlayer.streak > 0 : false;

  const getRankBadgeStyles = (index: number) => {
    switch (index) {
      case 0:
        return "bg-brutal-yellow text-brutal-dark border-4 border-brutal-dark shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2 scale-110";
      case 1:
        return "bg-brutal-green text-brutal-dark border-4 border-brutal-dark shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-2 scale-105";
      case 2:
        return "bg-brutal-red text-wood-base border-4 border-brutal-dark shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1";
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
      {timeLeft > 7 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-wood-base/90 backdrop-blur-sm p-4 animate-fade-in">
          <div
            className={`
              relative w-full max-w-md p-8 md:p-12 border-4 border-brutal-dark rounded-[3rem] shadow-[12px_12px_0_0_var(--color-brutal-dark)]
              flex flex-col items-center justify-center text-center transition-transform duration-300
              ${isCorrect ? "bg-brutal-green -rotate-2" : "bg-brutal-red rotate-2"}
            `}
          >
            <div className="bg-wood-base border-4 border-brutal-dark rounded-full p-4 mb-6 shadow-[4px_4px_0_0_var(--color-brutal-dark)]">
              {isCorrect ? (
                <Check
                  size={64}
                  strokeWidth={4}
                  className="text-brutal-green"
                />
              ) : (
                <X size={64} strokeWidth={4} className="text-brutal-red" />
              )}
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-brutal-dark uppercase tracking-widest drop-shadow-[2px_2px_0_var(--color-wood-text-primary)] mb-6">
              {isCorrect ? "სწორია!" : "არასწორია!"}
            </h2>

            <div className="bg-wood-surface border-4 border-brutal-dark rounded-2xl px-8 py-4 shadow-[4px_4px_0_0_var(--color-brutal-dark)] -rotate-1">
              <span className="text-xl md:text-2xl font-black text-brutal-dark">
                ქულა: {currentPlayer?.score || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-screen justify-between max-w-4xl mx-auto w-full relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-brutal-green border-4 border-wood-border text-brutal-dark font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1">
            <Trophy size={24} strokeWidth={3} />
            <span className="uppercase tracking-wider text-sm md:text-base drop-shadow-[0_2px_0_rgba(255,255,255,0.4)]">
              ლიდერბორდი
            </span>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-brutal-yellow border-4 border-wood-border text-brutal-dark font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2">
            <Timer
              size={24}
              strokeWidth={3}
              className={timeLeft <= 5 ? "animate-pulse text-brutal-red" : ""}
            />
            <span
              className={`text-xl tracking-widest font-mono ${timeLeft <= 5 ? "text-brutal-red" : ""}`}
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
                      ? "bg-brutal-yellow border-wood-border shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] scale-[1.02] -rotate-1 z-10"
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
                      isMe ? "text-brutal-dark" : "text-wood-text-primary"
                    }`}
                  >
                    {player.nickName || `მოთამაშე ${rank}`}
                    {isMe && (
                      <span className="text-brutal-dark/60 ml-2 text-sm md:text-lg">
                        (შენ)
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-3 md:gap-6 font-mono">
                  {player.streak > 1 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brutal-red border-2 border-brutal-dark text-wood-base font-black text-sm md:text-base shadow-[2px_2px_0_0_rgba(67,20,7,0.5)] rotate-3 animate-pulse">
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
                      isMe ? "text-brutal-dark" : "text-wood-text-secondary"
                    }`}
                  >
                    {player.score}
                  </span>
                </div>
              </div>
            );
          })}
        </main>

        <footer className="w-full bg-brutal-red border-4 border-wood-border rounded-[2rem] p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] rotate-1">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-wood-base border-4 border-brutal-dark rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] -rotate-6">
              <BarChart3 size={32} strokeWidth={3} />
            </div>
            <div className="text-left">
              <p className="text-sm text-wood-base/80 font-bold uppercase tracking-wider">
                შენი პოზიცია
              </p>
              <p className="text-2xl font-black text-wood-base font-mono drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                #{currentPlayerRank}{" "}
                <span className="text-lg opacity-70">
                  / {sortedPlayers.length}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-wood-base/20 border-2 border-wood-base/30 rounded-2xl px-6 py-3 text-center sm:text-right backdrop-blur-sm shadow-inner">
            <p className="text-sm font-black text-wood-base uppercase tracking-wider drop-shadow-sm animate-pulse">
              ველოდებით მასპინძელს...
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
