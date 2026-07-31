"use client";
import React, { useState, useMemo } from "react";
import { AiOption, QuizDetailResponse } from "@/types/dtos/quiz";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

interface QuizRunnerProps {
  quiz: QuizDetailResponse;
}

export default function SingleQuizRendererForDashboard({
  quiz,
}: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = quiz.questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const currentOptions = useMemo(() => {
    if (!currentQuestion) return [];
    try {
      return currentQuestion.options as AiOption[];
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
    <div className="flex justify-center items-center min-h-screen bg-wood-base p-4 sm:p-8 selection:bg-brutal-yellow selection:text-brutal-dark font-sans">
      <div className="relative max-w-3xl w-full bg-wood-surface border-4 border-brutal-dark rounded-3xl shadow-[8px_12px_0_0_rgba(67,20,7,1)] flex flex-col min-h-[600px] z-10">
        <div className="p-6 md:p-10 flex flex-col flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-wood-text-primary drop-shadow-[0_2px_0_rgba(67,20,7,1)] leading-tight mb-2">
                {quiz.title}
              </h2>
              <p className="font-bold text-lg text-wood-text-muted">
                {quiz.description}
              </p>
            </div>

            <div className="shrink-0 bg-brutal-yellow border-4 border-brutal-dark px-4 py-2 rounded-xl shadow-[4px_4px_0_0_rgba(67,20,7,1)] flex items-center gap-2 rotate-2 hover:rotate-0 transition-transform cursor-default">
              <span className="text-sm font-black uppercase tracking-widest text-brutal-dark">
                კითხვა
              </span>
              <div className="text-xl font-black text-brutal-dark bg-white px-2 py-0.5 rounded border-2 border-brutal-dark">
                {String(currentIndex + 1).padStart(2, "0")}
              </div>
              <span className="text-brutal-dark font-black">/</span>
              <span className="text-brutal-dark font-black">
                {String(quiz.questionCount).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-8">
            <div className="bg-white border-4 border-brutal-dark p-6 md:p-8 rounded-2xl shadow-[4px_4px_0_0_rgba(67,20,7,1)] -rotate-1 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-brutal-blue border-4 border-brutal-dark rounded-full shadow-[2px_2px_0_0_rgba(67,20,7,1)]"></div>
              <h3 className="text-xl md:text-2xl font-black text-brutal-dark leading-relaxed">
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
                      group relative flex items-center p-4 md:p-5 cursor-pointer transition-all duration-200
                      border-4 rounded-2xl shadow-[4px_4px_0_0_rgba(67,20,7,1)]
                      hover:-translate-y-1 hover:shadow-[4px_6px_0_0_rgba(67,20,7,1)] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(67,20,7,1)]
                      ${
                        isSelected
                          ? "bg-brutal-green border-brutal-dark text-brutal-dark z-10 scale-[1.01]"
                          : "bg-wood-base border-brutal-dark text-wood-text-primary hover:bg-wood-surface-hover"
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
                        w-8 h-8 rounded-lg border-4 mr-5 flex-shrink-0 flex items-center justify-center transition-colors bg-white
                        ${isSelected ? "border-brutal-dark" : "border-brutal-dark opacity-50 group-hover:opacity-100"}
                      `}
                    >
                      {isSelected && (
                        <Check
                          size={20}
                          strokeWidth={4}
                          className="text-brutal-dark"
                        />
                      )}
                    </div>

                    <span
                      className={`text-lg font-bold leading-snug ${isSelected ? "text-brutal-dark" : ""}`}
                    >
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex justify-between items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className={`
                flex items-center gap-2 px-6 py-4 font-black tracking-wider uppercase text-base rounded-2xl transition-all duration-200 border-4 border-b-[8px]
                ${
                  isFirstQuestion
                    ? "opacity-50 cursor-not-allowed bg-wood-base text-wood-text-muted border-brutal-dark/50"
                    : "bg-white text-brutal-dark border-brutal-dark hover:bg-gray-100 active:border-b-4 active:translate-y-[4px]"
                }
              `}
            >
              <ArrowLeft size={20} strokeWidth={3} />
              <span className="hidden sm:inline">უკან</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isLastQuestion}
              className={`
                flex items-center gap-2 px-8 py-4 font-black tracking-wider uppercase text-base rounded-2xl transition-all duration-200 border-4 border-b-[8px]
                ${
                  isLastQuestion
                    ? "opacity-50 cursor-not-allowed bg-wood-base text-wood-text-muted border-brutal-dark/50"
                    : "bg-brutal-blue text-white border-brutal-dark shadow-[4px_0_0_0_rgba(67,20,7,1)] hover:bg-brutal-blue/90 active:border-b-4 active:translate-y-[4px]"
                }
              `}
            >
              <span>შემდეგი</span>
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
