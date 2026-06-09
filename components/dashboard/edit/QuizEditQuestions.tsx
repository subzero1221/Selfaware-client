"use client";
import { QuestionDto } from "@/types/dtos/quiz";
import { useState } from "react";
import PaginationManager from "../create/PaginationManager";

export default function QuizEditQuestions({
  initialQuestions,
  quizId,
}: {
  initialQuestions: QuestionDto[];
  quizId: string;
}) {
  const [questions, setQuestions] = useState<QuestionDto[]>(initialQuestions);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleQuestions = questions.slice(startIndex, endIndex);

  const MiniSaveButton = ({
    onClick,
    isSaving,
  }: {
    onClick: () => void;
    isSaving: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isSaving}
      className="px-3 py-2 bg-wood-border hover:bg-wood-accent border border-wood-border-focus/40 text-wood-text-primary hover:text-wood-base text-xs font-serif font-bold uppercase tracking-wider rounded shadow-[0_1.5px_3px_rgba(0,0,0,0.5)] active:scale-[0.97] transition-all disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap"
    >
      {isSaving ? "..." : "შენახვა"}
    </button>
  );

  const handleLocalQuestionTextChange = (
    globalIndex: number,
    value: string,
  ) => {
    const updated = [...questions];
    updated[globalIndex].text = value;
    setQuestions(updated);
  };

  const handleLocalOptionTextChange = (
    globalIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updated = [...questions];
    updated[globalIndex].options[optionIndex].text = value;
    setQuestions(updated);
  };

  const handleLocalRadioChange = (globalIndex: number, optionIndex: number) => {
    const updated = [...questions];
    updated[globalIndex].options.forEach((opt, idx) => {
      opt.score = idx === optionIndex ? 1 : 0;
    });
    setQuestions(updated);
    onSaveCorrectAnswer(globalIndex, optionIndex);
  };

  return (
    <div className="space-y-8">
      <PaginationManager
        currentPage={page}
        setCurrentPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={questions.length}
      />

      <div className="space-y-6">
        {visibleQuestions.map((q, localIndex) => {
          const globalIndex = startIndex + localIndex;

          return (
            <div
              key={globalIndex}
              className="relative bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_3px_6px_rgba(0,0,0,0.8)] p-6 md:p-8 overflow-hidden transition-colors duration-300 space-y-6"
            >
              <div className="absolute inset-0 border border-wood-border-focus/40 shadow-[inset_0_0_6px_rgba(0,0,0,0.5)] pointer-events-none"></div>

              <button
                type="button"
                disabled={deletingQuestions[globalIndex]}
                onClick={() => onDeleteQuestion(globalIndex)}
                className="absolute top-4 right-4 font-mono text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 border border-red-900/40 bg-red-950/20 px-2 py-1 rounded-sm transition-colors z-10 shadow-sm disabled:opacity-40"
              >
                {deletingQuestions[globalIndex] ? "იშლება..." : "✕ წაშლა"}
              </button>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  კითხვა // Question {globalIndex + 1}
                </label>
                <div className="flex gap-2 items-center w-full">
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) =>
                      handleLocalQuestionTextChange(globalIndex, e.target.value)
                    }
                    className="w-full flex-1 bg-wood-base border-2 border-wood-border px-4 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all"
                  />
                  <MiniSaveButton
                    onClick={() => onSaveQuestionText(globalIndex, q.text)}
                    isSaving={savingQuestions[globalIndex] || false}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-wood-border-focus/20 relative">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-serif font-semibold text-wood-text-muted uppercase tracking-wider drop-shadow-sm">
                    სავარაუდო პასუხები (მონიშვნა ინახავს მომენტალურად):
                  </p>
                  {savingCorrectAnswers[globalIndex] && (
                    <span className="text-[10px] font-mono font-bold text-wood-accent uppercase tracking-widest animate-pulse">
                      სწორი პასუხი ახლდება...
                    </span>
                  )}
                </div>

                {q.options.map((opt, oIndex) => {
                  const optionKey = `${globalIndex}-${oIndex}`;
                  const isCorrect = opt.score === 1;

                  return (
                    <div
                      key={oIndex}
                      className="flex items-center gap-3 w-full"
                    >
                      <input
                        type="radio"
                        name={`live-correct-answer-${globalIndex}`}
                        checked={isCorrect}
                        disabled={savingCorrectAnswers[globalIndex]}
                        onChange={() =>
                          handleLocalRadioChange(globalIndex, oIndex)
                        }
                        className="w-5 h-5 accent-wood-accent cursor-pointer bg-wood-base border-2 border-wood-border focus:ring-0 transition-all disabled:opacity-40"
                      />

                      <div className="flex flex-1 gap-2 items-center">
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) =>
                            handleLocalOptionTextChange(
                              globalIndex,
                              oIndex,
                              e.target.value,
                            )
                          }
                          className={`w-full flex-1 px-4 py-2 rounded shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.5)] font-mono text-sm focus:outline-none transition-all border-2 ${
                            isCorrect
                              ? "border-green-700 bg-green-950/20 text-green-200 focus:border-green-500"
                              : "bg-wood-base border-wood-border text-wood-text-primary focus:border-wood-accent focus:ring-1 focus:ring-wood-accent"
                          }`}
                        />
                        <MiniSaveButton
                          onClick={() =>
                            onSaveOptionText(globalIndex, oIndex, opt.text)
                          }
                          isSaving={savingOptions[optionKey] || false}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
