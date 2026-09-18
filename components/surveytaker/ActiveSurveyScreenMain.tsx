"use client";
import GameQuestionImage from "../playerslobby/GameQuestionImage";
import useSubmitAnswer from "@/hooks/surveySession/useSubmitAnswer";
import { CheckCircle, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import useFirstQuestion from "@/hooks/surveySession/useFirstQuestion";
import Loading from "../ui/Loading";
import NeoError from "../ui/NeoError";

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

export default function ActiveSurveyScreenMain({
  surveyId,
}: {
  surveyId: string;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("SurveyID:", surveyId);

  const {
    data: question,
    isLoading,
    error: questionError,
  } = useFirstQuestion(surveyId);
  const { mutate: submitAnswer, isPending: isSubmiting } =
    useSubmitAnswer(surveyId);

  if (isLoading) {
    return <Loading />;
  }

  if (questionError || !question) {
    return <NeoError />;
  }

  const handleApprove = async () => {
    const questionId = question?.id;
    submitAnswer({ questionId, optionId: selectedOption });
    setIsSubmitted(true);
  };

  const handleNext = () => {};

  return (
    <>
      <main className="flex-grow flex flex-col justify-center items-center mb-6 w-full">
        {question?.imageUrl && (
          <GameQuestionImage imageUrl={question.imageUrl} />
        )}

        <div className="w-full bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-8 md:p-12 text-center shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] transform transition-transform hover:-translate-y-1">
          <h2 className="text-3xl md:text-5xl font-black tracking-wide text-wood-text-primary drop-shadow-[0_4px_0_var(--color-wood-shadow)] leading-relaxed">
            {question.text}
          </h2>
        </div>
      </main>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        {question.options.map((option, index) => {
          const style = OPTION_STYLES[index % OPTION_STYLES.length];
          const isSelected = selectedOption === option.id;

          const opacityClass =
            selectedOption && !isSelected && !isSubmitted
              ? "opacity-60 scale-95"
              : "opacity-100";
          const borderClass =
            isSelected && !isSubmitted
              ? "border-white border-4 shadow-[0_0_0_4px_var(--color-wood-border),8px_8px_0_0_var(--color-wood-section-shadow)] scale-[1.02] z-10"
              : "border-wood-border border-4 border-b-[8px] shadow-[4px_8px_0_0_var(--color-wood-section-shadow)]";

          return (
            <button
              key={option.id}
              onClick={() => !isSubmitted && setSelectedOption(option.id)}
              disabled={isSubmitted}
              className={`
                  relative group cursor-pointer flex flex-col justify-center px-6 py-6 md:py-8 rounded-3xl font-black text-xl md:text-2xl text-left transition-all duration-300
                  ${style.bg} ${style.text} ${opacityClass} ${borderClass}
                  ${!isSubmitted ? style.rotate + " hover:rotate-0 hover:-translate-y-1" : ""}
                  ${isSubmitted ? "cursor-default" : "active:border-b-4 active:translate-y-[4px]"}
                  overflow-hidden
                `}
            >
              {isSubmitted && (
                <div
                  className="absolute inset-0 bg-black/20 origin-left transition-transform duration-1000 ease-out"
                  style={{
                    transform: `scaleX(${(option.voteCount || 0) / 100})`,
                  }}
                />
              )}

              <div className="relative z-10 flex items-center gap-4 w-full">
                <span
                  className={`
                    flex items-center justify-center bg-white/20 border-2 border-wood-border/30 w-14 h-14 rounded-2xl transition-transform shadow-[0_4px_0_0_rgba(0,0,0,0.1)]
                    ${isSelected && !isSubmitted ? "animate-pulse" : "group-hover:scale-110 group-hover:-rotate-12"}
                  `}
                >
                  {isSubmitted && isSelected ? (
                    <CheckCircle size={28} strokeWidth={3} />
                  ) : (
                    style.shape
                  )}
                </span>

                <span className="flex-1 drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] leading-tight tracking-wide">
                  {option.text}
                </span>

                {isSubmitted && (
                  <div className="flex flex-col items-end drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                    <span className="text-3xl font-black">
                      {(question.totalVotes / option.voteCount) * 100}
                    </span>
                    <span className="text-sm opacity-90">
                      {option.voteCount || 0} ხმა
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <footer className="w-full flex justify-center pb-6 h-20">
        {!isSubmitted ? (
          <button
            onClick={handleApprove}
            disabled={!selectedOption || isSubmitting}
            className={`
                flex items-center cursor-pointer gap-3 px-8 py-4 rounded-2xl font-black text-xl uppercase tracking-wider transition-all
                border-4 border-wood-border shadow-[4px_6px_0_0_var(--color-wood-section-shadow)]
                ${
                  selectedOption
                    ? "bg-[#06D6A0] text-amber-950 hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1"
                    : "bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed"
                }
              `}
          >
            <Check size={28} strokeWidth={4} />
            {isSubmitting ? "იგზავნება..." : "დადასტურება"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex cursor-pointer items-center gap-3 px-8 py-4 rounded-2xl bg-[#FFD166] text-amber-950 border-4 border-wood-border font-black text-xl uppercase tracking-wider shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1 animate-fade-in transition-all"
          >
            შემდეგი კითხვა
            <ArrowRight size={28} strokeWidth={4} />
          </button>
        )}
      </footer>
    </>
  );
}
