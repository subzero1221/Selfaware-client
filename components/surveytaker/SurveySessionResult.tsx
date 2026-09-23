"use client";

import useSessionResult from "@/hooks/surveySession/useSessionResult";
import Loading from "../ui/Loading";
import NeoError from "../ui/NeoError";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { calculatePercent } from "@/types/dtos/surveySession";
import GameQuestionImage from "../playerslobby/GameQuestionImage";

const OPTION_STYLES = [
  {
    bg: "bg-[#EF476F] hover:bg-[#D9385E]",
    activeBg: "bg-[#EF476F]",
    text: "text-white",
    shape: "▲",
    rotate: "-rotate-1",
  },
  {
    bg: "bg-[#118AB2] hover:bg-[#0C6B8A]",
    activeBg: "bg-[#118AB2]",
    text: "text-white",
    shape: "◆",
    rotate: "rotate-1",
  },
  {
    bg: "bg-[#FFD166] hover:bg-[#E5B955]",
    activeBg: "bg-[#FFD166]",
    text: "text-amber-950",
    shape: "●",
    rotate: "-rotate-1",
  },
  {
    bg: "bg-[#06D6A0] hover:bg-[#05B586]",
    activeBg: "bg-[#06D6A0]",
    text: "text-amber-950",
    shape: "■",
    rotate: "rotate-2",
  },
];

interface SurveySessionResultProps {
  surveySessionId: string;
  onBack?: () => void;
}

export default function SurveySessionResult({
  surveySessionId,
  onBack,
}: SurveySessionResultProps) {
  const {
    data: sessionResult,
    isLoading,
    error: sessionResultError,
  } = useSessionResult(surveySessionId);

  if (isLoading) {
    return <Loading text={"იტვირთება..."} />;
  }

  if (sessionResultError || !sessionResult) {
    return <NeoError />;
  }

  console.log("Resultados herdos:", sessionResult);

  return (
    <main className="flex-grow flex flex-col items-center p-4 w-full animate-fade-in pb-12">
      <div className="w-full max-w-4xl bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-6 md:p-8 text-center shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] transform transition-transform hover:-translate-y-1 rotate-1 mb-10">
        <h2 className="text-3xl md:text-5xl font-black tracking-wide text-wood-text-primary drop-shadow-[0_4px_0_var(--color-wood-shadow)] leading-relaxed">
          თქვენი პასუხები
        </h2>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-12">
        {sessionResult.questions.map((question, qIndex) => {
          const userAnswer = sessionResult.userAnswers.find(
            (a) => a.questionId === question.id,
          );

          const containerRotation = qIndex % 2 === 0 ? "-rotate-1" : "rotate-1";

          return (
            <div
              key={question.id}
              className={`w-full bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-6 md:p-10 shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] ${containerRotation}`}
            >
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="flex items-center justify-center bg-wood-text-primary text-wood-surface font-black w-12 h-12 rounded-full border-4 border-wood-border text-2xl shadow-[4px_4px_0_0_var(--color-wood-shadow)]">
                    {question.order}
                  </span>
                  <h3 className="font-black text-2xl md:text-3xl text-wood-text-primary drop-shadow-[0_2px_0_var(--color-wood-shadow)]">
                    {question.text}
                  </h3>
                </div>

                {question.imageUrl && (
                  <div className="w-full max-w-2xl mb-6">
                    <GameQuestionImage imageUrl={question.imageUrl} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {question.options.map((option, index) => {
                  const style = OPTION_STYLES[index % OPTION_STYLES.length];
                  const isSelected = userAnswer?.optionId === option.id;

                  const percent = calculatePercent(
                    question.totalVotes,
                    option.voteCount || 0,
                  );

                  const opacityClass = isSelected
                    ? "opacity-100 scale-[1.02] z-10"
                    : "opacity-60 scale-95";

                  const borderClass = isSelected
                    ? "border-white border-4 shadow-[0_0_0_4px_var(--color-wood-border),8px_8px_0_0_var(--color-wood-section-shadow)]"
                    : "border-wood-border border-4 border-b-[8px] shadow-[4px_8px_0_0_var(--color-wood-section-shadow)]";

                  return (
                    <div
                      key={option.id}
                      className={`
                        relative group flex flex-col justify-center px-6 py-6 rounded-3xl font-black text-xl text-left overflow-hidden
                        ${style.bg} ${style.text} ${opacityClass} ${borderClass}
                      `}
                    >
                      <div
                        className="absolute inset-0 bg-black/20 origin-left transition-transform duration-1000 ease-out"
                        style={{ transform: `scaleX(${percent / 100})` }}
                      />

                      <div className="relative z-10 flex items-center gap-4 w-full">
                        <span
                          className={`
                            flex shrink-0 items-center justify-center bg-white/20 border-2 border-wood-border/30 w-14 h-14 rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)]
                          `}
                        >
                          {isSelected ? (
                            <CheckCircle size={28} strokeWidth={3} />
                          ) : (
                            style.shape
                          )}
                        </span>

                        <span className="flex-1 drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] leading-tight tracking-wide">
                          {option.text}
                        </span>

                        <div className="flex flex-col items-end drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] shrink-0">
                          <span className="text-3xl font-black">
                            {percent}%
                          </span>
                          <span className="text-sm opacity-90">
                            {option.voteCount || 0} ხმა
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/40 px-3 py-1 rounded-full text-xs text-white uppercase tracking-wider backdrop-blur-sm shadow-sm z-10">
                          თქვენი არჩევანი
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {onBack && (
        <div className="mt-12 w-full max-w-4xl flex justify-center">
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#EF476F] text-white border-4 border-wood-border font-black text-xl md:text-2xl uppercase tracking-wider shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1 transition-all"
          >
            <ArrowLeft size={28} strokeWidth={4} />
            უკან დაბრუნება
          </button>
        </div>
      )}
    </main>
  );
}
