"use client";
import { QuestionDto } from "@/types/dtos/quiz";
import { useState } from "react";
import PaginationManager from "./PaginationManager";
import ImageUploader from "./ImageUploader";

export default function DraftQuestions({
  questions,
  setQuestions,
}: {
  questions: QuestionDto[];
  setQuestions: (questions: QuestionDto[]) => void;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleQuestionChange = (qIndex: number, newText: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].text = newText;
    setQuestions(updatedQuestions);
  };

  const handleImageChange = (
    qIndex: number,
    data: { imageUrl: string | null; publicId: string | null },
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].imageUrl = data.imageUrl || undefined;
    updatedQuestions[qIndex].imagePublicId = data.publicId || undefined;

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
      JSON.stringify({ questions: updatedQuestions }),
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
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="space-y-10">
      <PaginationManager
        currentPage={page}
        setCurrentPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={questions.length}
      />
      <div className="space-y-8">
        {visibleQuestions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="relative bg-wood-surface border-4 border-wood-border rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-[6px_8px_0_0_var(--color-wood-border)] space-y-6 hover:-translate-y-2 group"
          >
            <button
              onClick={() => handleDeleteQuestion(qIndex)}
              className="absolute cursor-pointer -top-4 -right-2 md:-right-4 bg-brutal-red text-white border-4 border-brutal-dark px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 transition-all z-10 rotate-3 hover:rotate-0"
            >
              ✕ წაშლა
            </button>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm md:text-base font-black text-wood-text-primary uppercase tracking-wide bg-brutal-blue text-white w-fit px-3 py-1 rounded-lg border-2 border-wood-border -rotate-1 mb-2">
                კითხვა {qIndex + 1}
              </label>

              <input
                type="text"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="ჩაწერეთ კითხვა აქ..."
                className="w-full bg-gray-50 border-4 border-wood-border px-4 py-3 rounded-2xl font-black text-lg text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all placeholder:text-wood-text-options/30"
              />

              <ImageUploader
                imageUrl={q.imageUrl}
                onImageSelect={(data) => handleImageChange(qIndex, data)}
              />
            </div>

            <div className="h-0.5 bg-wood-border w-full my-4" />

            <div className="space-y-4 pt-4 border-t-4 border-dashed border-wood-border relative">
              <p className="text-sm font-bold text-wood-text-primary uppercase tracking-wider mb-4">
                სავარაუდო პასუხები (მონიშნეთ სწორი):
              </p>

              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    <input
                      type="radio"
                      name={`correct-answer-${qIndex}`}
                      checked={opt.score === 1}
                      onChange={() => handleMarkCorrect(qIndex, oIndex)}
                      className="peer w-8 h-8 opacity-0 absolute cursor-pointer z-10"
                    />
                    <div className="w-8 h-8 bg-white border-4 border-wood-border rounded-full shadow-[2px_2px_0_0_var(--color-wood-border)] peer-checked:bg-brutal-green transition-all" />
                    {opt.score === 1 && (
                      <div className="absolute w-3 h-3 bg-white rounded-full pointer-events-none" />
                    )}
                  </div>

                  <input
                    type="text"
                    value={opt.text}
                    placeholder={`პასუხი ${oIndex + 1}`}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className={`w-full px-4 text-base py-3 rounded-2xl font-bold text-base focus:outline-none transition-all border-4 shadow-[4px_4px_0_0_var(--color-wood-border)] focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] ${
                      opt.score === 1
                        ? "border-wood-border bg-brutal-green text-white placeholder:text-white/60"
                        : "bg-white border-wood-border text-wood-text-options placeholder:text-wood-text-options/30"
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
