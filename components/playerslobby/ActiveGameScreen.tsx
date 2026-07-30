"use client";

import useShowLeaderBoard from "@/hooks/game/socket/useShowLeaderBoard";
import useSubmitAnswer from "@/hooks/game/socket/useSubmitAnswer";
import useGame from "@/hooks/game/useGame";
import useGameTimer from "@/hooks/game/useGameTimer";
import { GameDto } from "@/types/dtos/game";
import { useCallback } from "react";
import { Target, Timer, CheckCircle } from "lucide-react";

interface ActiveGameScreenProps {
  game: GameDto;
  joinCode: string;
  playerId: string;
}


const OPTION_STYLES = [
  {
    bg: "bg-opt-red hover:bg-opt-red-hover",
    text: "text-white",
    shape: "▲",
    rotate: "-rotate-1",
  },
  {
    bg: "bg-opt-blue hover:bg-opt-blue-hover",
    text: "text-white",
    shape: "◆",
    rotate: "rotate-1",
  },
  {
    bg: "bg-opt-yellow hover:bg-opt-yellow-hover",
    text: "text-amber-950",
    shape: "●",
    rotate: "-rotate-1",
  },
  {
    bg: "bg-opt-green hover:bg-opt-green-hover",
    text: "text-white",
    shape: "■",
    rotate: "rotate-2",
  },
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
  }, [sendShowLeaderBoardSignal]);

  const timeLeft = useGameTimer({
    initialTime: liveGame.timeLeft,
    onTimeUp: handleTimeUp,
  });

  const handleSubmitAnswer = (id: string) => {
    sendSubmitAnswerSignal(id);
  };

  const timePercentage = (timeLeft / (timeLimitSeconds || 30)) * 100;

  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-wood-text-primary flex flex-col font-sans overflow-hidden transition-colors duration-300">
      <div className="flex flex-col min-h-screen justify-between p-4 md:p-8 max-w-6xl mx-auto w-full relative z-10">
    
        <header className="flex justify-between items-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EF476F] border-4 border-wood-border text-white font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2">
            <Target size={20} strokeWidth={4} />
            <span className="uppercase tracking-wider text-sm md:text-base drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">
              კითხვა {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#FFD166] border-4 border-wood-border text-amber-950 font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-2">
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

        {!hasAnswered ? (
          <>
            
            <main className="flex-grow flex flex-col justify-center items-center my-4 w-full">
              <div className="w-full bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-8 md:p-16 text-center shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] transform transition-transform hover:-translate-y-2 mb-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-wide text-wood-text-primary drop-shadow-[0_4px_0_var(--color-wood-shadow)] md:drop-shadow-[0_6px_0_var(--color-wood-shadow)] leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>
            </main>

          
            <div className="w-full h-8 bg-wood-surface rounded-full mb-8 overflow-hidden border-4 border-wood-border shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1">
              <div
                className="h-full bg-[#06D6A0] border-r-4 border-wood-border transition-all duration-1000 ease-linear"
                style={{ width: `${timePercentage}%` }}
              />
            </div>

          
            <footer className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pb-6">
              {currentQuestion.options.map((option, index) => {
                const style = OPTION_STYLES[index % OPTION_STYLES.length];
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSubmitAnswer(option.id)}
                    disabled={timeLeft === 0}
                    className={`
                      group relative w-full cursor-pointer flex items-center gap-4 px-6 py-6 md:py-8 rounded-3xl font-black text-xl md:text-2xl text-left transition-all
                      border-4 border-wood-border border-b-[8px] active:border-b-4 active:translate-y-[4px] 
                      shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] hover:shadow-[4px_6px_0_0_var(--color-wood-section-shadow)]
                      disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-[4px] disabled:border-b-4 disabled:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)]
                      ${style.bg} ${style.text} ${style.rotate} hover:rotate-0
                    `}
                  >
                    <span className="flex items-center justify-center bg-white/20 border-2 border-wood-border/30 w-14 h-14 rounded-2xl group-hover:scale-110 group-hover:-rotate-12 transition-transform shadow-[0_4px_0_0_rgba(0,0,0,0.1)]">
                      {style.shape}
                    </span>
                    <span className="flex-1 drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] leading-tight tracking-wide">
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
              <div className="w-full max-w-2xl bg-[#06D6A0] border-4 border-wood-border rounded-[3rem] p-12 md:p-16 text-center shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] flex flex-col items-center justify-center gap-8 -rotate-1 hover:rotate-1 transition-transform duration-500 animate-fade-in">
                <div className="w-24 h-24 rounded-3xl bg-white border-4 border-wood-border flex items-center justify-center text-[#06D6A0] shadow-[0_6px_0_0_var(--color-wood-section-shadow)] animate-bounce">
                  <CheckCircle size={48} strokeWidth={4} />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-amber-950 uppercase tracking-wider drop-shadow-[0_2px_0_rgba(255,255,255,0.5)]">
                    პასუხი მიღებულია!
                  </h2>
                  <p className="text-amber-900 font-bold text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                    შენი არჩევანი წარმატებით ჩაიწერა. ველოდებით სხვა
                    მოთამაშეების პასუხებს...
                  </p>
                </div>

                <div className="flex gap-3 items-center justify-center mt-4">
                  <span className="h-4 w-4 border-2 border-wood-border rounded-full bg-white animate-bounce shadow-[0_2px_0_0_var(--color-wood-section-shadow)] [animation-delay:-0.3s]"></span>
                  <span className="h-4 w-4 border-2 border-wood-border rounded-full bg-white animate-bounce shadow-[0_2px_0_0_var(--color-wood-section-shadow)] [animation-delay:-0.15s]"></span>
                  <span className="h-4 w-4 border-2 border-wood-border rounded-full bg-white animate-bounce shadow-[0_2px_0_0_var(--color-wood-section-shadow)]"></span>
                </div>
              </div>
            </main>


            <footer className="w-full flex justify-center pb-8">
              <div className="bg-wood-surface border-4 border-wood-border px-6 py-3 rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1">
                <p className="text-wood-text-primary font-bold tracking-widest uppercase">
                  სესიის კოდი:{" "}
                  <span className="text-[#FFD166]">{joinCode}</span>
                </p>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
