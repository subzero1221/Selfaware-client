"use client";
import { QuestionDto } from "@/types/dtos/quiz";
import { useState } from "react";
import PaginationManager from "./PaginationManager";


export default function DraftQuestions({ questions, setQuestions}: { questions: QuestionDto[]; setQuestions: (questions: QuestionDto[]) => void }) {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);  

  const handleQuestionChange = (qIndex: number, newText: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].text = newText;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    newText: string,
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].text = newText;
    setQuestions(updatedQuestions);
    localStorage.setItem(
      "QuizDraft",
      JSON.stringify({questions: updatedQuestions }),
    );
  };

  const handleMarkCorrect = (qIndex: number, correctOptionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.forEach(
      (opt: { score: number }, idx: number) => {
        opt.score = idx === correctOptionIndex ? 1 : 0;
      },
    );
    setQuestions(updatedQuestions);
};

  const handleDeleteQuestion = (qIndex: number) => {
    const updatedQuestions = questions.filter(
      (_: any, idx: number) => idx !== qIndex,
    );
    setQuestions(updatedQuestions);
    localStorage.setItem(
      "QuizDraft",
      JSON.stringify({questions: updatedQuestions }),
    );
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <PaginationManager
        currentPage={page}
        setCurrentPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={questions.length}
      />
      <div>
        {visibleQuestions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="relative bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_3px_6px_rgba(0,0,0,0.8)] p-6 md:p-8 overflow-hidden transition-colors duration-300 space-y-6"
          >
            <div className="absolute inset-0 border border-wood-border-focus/40 shadow-[inset_0_0_6px_rgba(0,0,0,0.5)] pointer-events-none"></div>

            <button
              onClick={() => handleDeleteQuestion(qIndex)}
              className="absolute top-4 right-4 font-mono text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 border border-red-900/40 bg-red-950/20 px-2 py-1 rounded-sm transition-colors z-10 shadow-sm"
            >
              ✕ წაშლა
            </button>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
                კითხვა // Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="w-full bg-wood-base border-2 border-wood-border px-4 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all"
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-wood-border-focus/20 relative">
              <p className="text-xs font-serif font-semibold text-wood-text-muted uppercase tracking-wider drop-shadow-sm mb-2">
                სავარაუდო პასუხები (მონიშნეთ სწორი):
              </p>

              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-answer-${qIndex}`}
                    checked={opt.score === 1}
                    onChange={() => handleMarkCorrect(qIndex, oIndex)}
                    className="w-5 h-5 accent-wood-accent cursor-pointer bg-wood-base border-2 border-wood-border focus:ring-0 transition-all"
                  />

                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className={`w-full px-4 py-2 rounded shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.5)] font-mono text-sm focus:outline-none transition-all border-2 ${
                      opt.score === 1
                        ? "border-green-700 bg-green-950/20 text-green-200 focus:border-green-500"
                        : "bg-wood-base border-wood-border text-wood-text-primary focus:border-wood-accent focus:ring-1 focus:ring-wood-accent"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
