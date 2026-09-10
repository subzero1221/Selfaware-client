"use client";
import { QuestionDto, QuizDetailResponse } from "@/types/dtos/quiz";
import { useState } from "react";
import PaginationManager from "../edit/PaginationManager";
import QuestionEditor from "./QuestionEditor";
import QuestionAddBlock from "./QuestionAddBlock";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import usePutQuiz from "@/hooks/Quizzes/usePutQuiz";

export default function QuizEditQuestions({
  quiz,
}: {
  quiz: QuizDetailResponse;
}) {
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleQuestions = quiz.questions?.slice(startIndex, endIndex) || [];

  const [isAddingNew, setIsAddingNew] = useState(false);

  const {
    mutate: updateQuiz,
    isPending: isUpdating,
    error: updateError,
  } = usePutQuiz(quiz.id);

  const handleFinalSave = async () => {
    try {
      const payload = {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        slug: quiz.slug,
        timeInMinutes: quiz.timeInMinutes || 30,
        quizStatus: 1,
        quizType: quiz.quizType,
        questionCount: quiz.questions.length,
        questions: quiz.questions,
      };

      updateQuiz(payload);
    } catch (error) {
      console.error("Save failed", updateError || error);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <PaginationManager
        currentPage={page}
        setCurrentPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={quiz.questions?.length || 0}
      />

      <div className="space-y-8 pb-4">
        <div className="space-y-8">
          {visibleQuestions.map((q, index) => (
            <QuestionEditor
              key={q.id + index}
              question={q}
              quizId={quiz.id}
              globalIndex={index}
            />
          ))}
        </div>

        {isAddingNew ? (
          <QuestionAddBlock
            quizId={quiz.id}
            nextOrderIndex={quiz.questions?.length || 0}
            onCancel={() => setIsAddingNew(false)}
          />
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-brutal-yellow border-4 border-brutal-dark text-brutal-dark font-black text-lg uppercase tracking-wider px-6 py-6 rounded-3xl shadow-[6px_6px_0_0_rgba(67,20,7,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(67,20,7,1)] active:translate-y-1 active:shadow-none transition-all mt-8 group"
          >
            <div className="bg-brutal-dark text-brutal-yellow p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
              <Plus size={24} strokeWidth={4} />
            </div>
            ახალი კითხვის დამატება (Add Question)
          </button>
        )}
      </div>
      {quiz.quizStatus == 0 ? (
        <div className="flex justify-end">
          <button
            onClick={handleFinalSave}
            disabled={isUpdating}
            className="cursor-pointer bg-brutal-green text-white border-4 border-brutal-dark px-6 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 hover:shadow-[4px_4px_0_0_var(--color-brutal-green)] transition-all z-10 rotate-3 hover:rotate-0"
          >
            {isUpdating ? "სეივდება..." : "გამოქვეყნება"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
