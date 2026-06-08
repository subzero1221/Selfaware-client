import React, { useState, useMemo } from "react";
import { QuizDetailResponse } from "@/types/dtos/quiz";

interface QuizRunnerProps {
  quiz: QuizDetailResponse;
}

export default function QuizRunner({ quiz }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = quiz.questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const currentOptions = useMemo(() => {
    if (!currentQuestion) return [];
    try {
      return JSON.parse(currentQuestion.optionsJson) as string[];
    } catch (e) {
      console.error("Failed to parse options JSON", e);
      return [];
    }
  }, [currentQuestion]);

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => !isLastQuestion && setCurrentIndex((i) => i + 1);
  const handlePrev = () => !isFirstQuestion && setCurrentIndex((i) => i - 1);

  if (!currentQuestion) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-wood-surface p-4">
      <div className="relative max-w-3xl w-full bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="absolute inset-0 border border-wood-border-focus/40 shadow-[inset_0_0_50px_rgba(0,0,0,0.7)] pointer-events-none"></div>

        <div className="relative p-8 md:p-10 flex flex-col min-h-[500px]">
          <div className="border-b-2 border-wood-border-focus/50 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative">
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-wide text-wood-text-primary drop-shadow-md">
                {quiz.title}
              </h2>
              <p className="font-mono text-sm text-wood-text-muted mt-2">
                {quiz.description}
              </p>
            </div>

            <div className="bg-wood-base border-2 border-wood-border px-4 py-2 rounded shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] flex items-center gap-2">
              <span className="text-[10px] font-serif uppercase tracking-widest text-wood-text-secondary">
                კითხვა (Q)
              </span>
              <span className="font-mono text-lg font-bold text-wood-accent drop-shadow-[0_0_5px_rgba(255,165,0,0.5)]">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-wood-text-muted">/</span>
              <span className="font-mono text-wood-text-primary">
                {String(quiz.questionCount).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-8">
            <div className="bg-wood-base/50 border border-wood-border p-6 rounded shadow-inner">
              <h3 className="font-serif text-xl text-wood-text-primary leading-relaxed drop-shadow-sm">
                {currentQuestion.text}
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {currentOptions.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option;

                return (
                  <label
                    key={idx}
                    className={`
                      relative flex items-center p-4 cursor-pointer transition-all duration-200
                      border-2 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
                      ${
                        isSelected
                          ? "bg-wood-surface-hover border-wood-accent text-wood-accent shadow-[0_0_15px_rgba(217,119,6,0.15)]"
                          : "bg-wood-base border-wood-border text-wood-text-primary hover:border-wood-border-focus hover:bg-wood-surface/50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(option)}
                      className="sr-only"
                    />

                    <div
                      className={`
                      w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors
                      ${isSelected ? "border-wood-accent" : "border-wood-text-muted/50"}
                    `}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-wood-accent drop-shadow-[0_0_3px_rgba(217,119,6,0.8)]" />
                      )}
                    </div>

                    <span className="font-mono text-sm leading-snug">
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-wood-border-focus/30 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className={`
                px-6 py-2.5 font-serif font-bold tracking-wider uppercase text-sm rounded transition-all duration-200
                ${
                  isFirstQuestion
                    ? "opacity-30 cursor-not-allowed bg-wood-base text-wood-text-muted border-2 border-transparent"
                    : "bg-wood-base border-2 border-wood-border text-wood-text-primary shadow-md hover:border-wood-border-focus hover:text-wood-accent active:translate-y-px"
                }
              `}
            >
              ← უკან (Prev)
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-2.5 bg-wood-surface border-2 border-wood-border-focus text-wood-text-primary font-serif font-bold tracking-wider uppercase text-sm rounded shadow-lg hover:bg-wood-surface-hover hover:border-wood-accent hover:text-wood-accent active:translate-y-px transition-all duration-200"
            >
              შემდეგი (Next) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
