"use client";

import useShowLeaderBoard from "@/hooks/game/socket/useShowLeaderBoard";
import useSubmitAnswer from "@/hooks/game/socket/useSubmitAnswer";
import useGame from "@/hooks/game/useGame";
import useGameTimer from "@/hooks/game/useGameTimer";
import { GameDto } from "@/types/dtos/game";
import { useCallback } from "react";

interface ActiveGameScreenProps {
  game: GameDto;
  joinCode: string;
  playerId: string;
}

const OPTION_STYLES = [
  { bg: "bg-opt-red hover:bg-opt-red-hover", shape: "▲" },
  { bg: "bg-opt-blue hover:bg-opt-blue-hover", shape: "◆" },
  { bg: "bg-opt-yellow hover:bg-opt-yellow-hover", shape: "●" },
  { bg: "bg-opt-green hover:bg-opt-green-hover", shape: "■" },
];

export default function ActiveGameScreen({
  game: initialGame,
  joinCode,
  playerId,
}: ActiveGameScreenProps) {
  const { data: game } = useGame(joinCode, playerId);
  const liveGame = game || initialGame;

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    timeLimitSeconds,
  } = liveGame;

  const { sendSubmitAnswerSignal } = useSubmitAnswer(
    joinCode,
    playerId,
    currentQuestion.id,
  );

  const Currentplayer = liveGame?.players.find(
    (player) => player.playerId == playerId,
  );

  const hasAnswered = Currentplayer?.state === 1;
  const { sendShowLeaderBoardSignal } = useShowLeaderBoard(joinCode, playerId);

  const handleTimeUp = useCallback(() => {
    sendShowLeaderBoardSignal();
  }, [joinCode, playerId]);

  const timeLeft = useGameTimer({
    initialTime: 30,
    onTimeUp: handleTimeUp,
  });

  const handleSubmitAnswer = (id: string) => {
    sendSubmitAnswerSignal(timeLeft, id);
  };

  const timePercentage = (timeLeft / (timeLimitSeconds || 30)) * 100;

  return (
    <div className="flex flex-col min-h-screen justify-between p-4 md:p-8 max-w-7xl mx-auto w-full select-none">
      <header className="flex justify-between items-center bg-wood-surface/40 backdrop-blur border border-wood-border/40 p-4 rounded-2xl mb-6 shadow-md">
        <div className="flex flex-col">
          <p className="text-xs text-wood-text-muted uppercase tracking-wider font-semibold">
            პროგრესი
          </p>
          <span className="text-xl font-bold text-wood-text-secondary font-mono">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
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

      {!hasAnswered ? (
        <>
          <main className="flex-grow flex flex-col justify-center items-center my-4">
            <div className="w-full bg-wood-surface/80 backdrop-blur-md border-2 border-wood-border/60 rounded-[2.5rem] p-8 md:p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-wood-accent/5 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-wood-text-primary leading-snug tracking-wide relative z-10">
                {currentQuestion.text}
              </h2>
            </div>
          </main>

          <div className="w-full h-2 bg-wood-surface rounded-full mb-6 overflow-hidden border border-wood-border/20">
            <div
              className="h-full bg-gradient-to-r from-wood-accent to-amber-500 transition-all duration-1000 ease-linear"
              style={{ width: `${timePercentage}%` }}
            />
          </div>

          <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[320px] md:h-[260px]">
            {currentQuestion.options.map((option, index) => {
              const style = OPTION_STYLES[index % OPTION_STYLES.length];
              return (
                <button
                  key={option.id}
                  onClick={() => handleSubmitAnswer(option.id)}
                  disabled={timeLeft === 0}
                  className={`group flex items-center gap-4 px-6 h-full rounded-2xl text-white font-bold text-lg md:text-xl text-left shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-30 disabled:pointer-events-none ${style.bg}`}
                >
                  <span className="flex items-center justify-center bg-white/20 text-white text-2xl w-12 h-12 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform font-mono shadow-inner">
                    {style.shape}
                  </span>
                  <span className="flex-1 line-clamp-2 drop-shadow-sm font-medium tracking-wide">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </footer>
        </>
      ) : (
        <>
          <main className="flex-grow flex flex-col justify-center items-center my-4 w-full">
            <div className="w-full max-w-2xl bg-wood-surface/60 backdrop-blur border border-wood-border/40 rounded-[2.5rem] p-12 text-center shadow-lg flex flex-col items-center justify-center gap-6 animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-4xl animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                ✓
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-wood-text-primary tracking-wide">
                პასუხი მიღებულია!
              </h2>

              <p className="text-wood-text-muted text-md md:text-lg max-w-sm">
                შენი არჩევანი წარმატებით ჩაიწერა. ველოდებით სხვა მოთამაშეების
                პასუხებს...
              </p>

              <div className="flex gap-2 items-center justify-center mt-2">
                <span className="h-3 w-3 rounded-full bg-wood-accent animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-3 w-3 rounded-full bg-wood-accent animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-3 w-3 rounded-full bg-wood-accent animate-bounce"></span>
              </div>
            </div>
          </main>

          <div className="w-full h-2 bg-wood-surface rounded-full mb-6 overflow-hidden border border-wood-border/20">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-linear"
              style={{ width: `${timePercentage}%` }}
            />
          </div>

          <div className="h-[120px] md:h-[80px] w-full text-center text-xs text-wood-text-muted/40 font-mono flex items-center justify-center">
            სესიის კოდი: {joinCode}
          </div>
        </>
      )}
    </div>
  );
}
