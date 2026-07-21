"use client";

import { GameDto } from "@/types/dtos/game";
import useGame from "@/hooks/game/useGame";
import { useCallback } from "react";
import useNextQuestion from "@/hooks/game/socket/useNextQuestion";
import useGameTimer from "@/hooks/game/useGameTimer";

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
  //const currentPlayer = liveGame?.players.find((p) => p.playerId === playerId);

  const getRankBadgeStyles = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-500 border-amber-300 text-wood-base shadow-[0_0_12px_rgba(245,158,11,0.4)]";
      case 1:
        return "bg-slate-300 border-white text-wood-base shadow-[0_0_12px_rgba(203,213,225,0.3)]";
      case 2:
        return "bg-amber-700 border-amber-600 text-white";
      default:
        return "bg-wood-surface border-wood-border/40 text-wood-text-muted";
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
    <div className="flex flex-col min-h-screen justify-between p-4 md:p-8 max-w-4xl mx-auto w-full select-none animate-fade-in">
      <header className="flex justify-between items-center bg-wood-surface/40 backdrop-blur border border-wood-border/40 p-4 rounded-2xl mb-6 shadow-md">
        <div className="flex flex-col">
          <p className="text-xs text-wood-text-muted uppercase tracking-wider font-semibold">
            პროგრესი
          </p>
        </div>

        <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-wood-base border-2 border-wood-accent shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <span
            className={`text-xl font-mono font-black ${
              timeLeft <= 5 ? "text-red-500 animate-ping" : "text-wood-accent"
            }`}
          >
            {timeLeft}
          </span>
        </div>
      </header>
      <header className="text-center my-6">
        <p className="text-xs text-wood-accent uppercase tracking-widest font-black mb-1">
          რაუნდის შედეგები
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-wood-text-primary tracking-wide drop-shadow-sm">
          ლიდერბორდი
        </h1>
      </header>

      <main className="flex-grow w-full bg-wood-surface/40 backdrop-blur border border-wood-border/40 rounded-[2.5rem] p-4 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex flex-col gap-3 overflow-y-auto max-h-[60vh]">
        {sortedPlayers.map((player, index) => {
          const isMe = player.playerId === playerId;
          const rank = index + 1;

          return (
            <div
              key={player.playerId}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                isMe
                  ? "bg-wood-accent/10 border-wood-accent shadow-[0_0_15px_rgba(245,158,11,0.15)] scale-[1.01]"
                  : "bg-wood-base/60 border-wood-border/20 hover:border-wood-border/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`h-10 w-10 rounded-xl border flex items-center justify-center font-mono font-black text-lg ${getRankBadgeStyles(index)}`}
                >
                  {rank}
                </span>

                <span
                  className={`text-md md:text-lg font-bold truncate max-w-[180px] md:max-w-[300px] ${
                    isMe ? "text-wood-accent" : "text-wood-text-primary"
                  }`}
                >
                  {player.nickName || `მოთამაშე ${rank}`} {isMe && " (შენ)"}
                </span>
              </div>

              <div className="flex items-center gap-4 font-mono">
                {player.streak > 1 && (
                  <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold animate-pulse">
                    🔥 {player.streak}
                  </span>
                )}
                <span
                  className={`text-xl font-black ${isMe ? "text-wood-accent" : "text-wood-text-secondary"}`}
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
          <div className="h-11 w-11 bg-wood-base rounded-xl flex items-center justify-center text-xl">
            📊
          </div>
          <div className="text-left">
            <p className="text-xs text-wood-text-muted font-semibold uppercase">
              შენი პოზიცია
            </p>
            <p className="text-lg font-black text-wood-accent font-mono">
              #{currentPlayerRank} / {sortedPlayers.length}
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-xs text-wood-text-muted font-medium">
            ველოდებით მასპინძელს
          </p>
          <p className="text-sm font-bold text-wood-text-secondary animate-pulse mt-0.5">
            შემდეგი რაუნდი მალე დაიწყება...
          </p>
        </div>
      </footer>
    </div>
  );
}
