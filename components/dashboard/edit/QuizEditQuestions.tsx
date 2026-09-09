"use client";
import { QuestionDto } from "@/types/dtos/quiz";
import { useEffect, useState } from "react";
import PaginationManager from "../create/PaginationManager";
import QuestionEditor from "./QuestionEditor";
import QuestionAddBlock from "./QuestionAddBlock";
import { Plus } from "lucide-react";

export default function QuizEditQuestions({
  initialQuestions,
  quizId,
}: {
  initialQuestions: QuestionDto[];
  quizId: string;
}) {
  

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleQuestions = initialQuestions.slice(startIndex, endIndex);

  const [isAddingNew, setIsAddingNew] = useState(false);

  

  return (
    <div className="space-y-8 pb-12">
      <PaginationManager
        currentPage={page}
        setCurrentPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={initialQuestions.length}
      />

      <div className="space-y-8 pb-12">
        <div className="space-y-8">
          {visibleQuestions.map((q, index) => (
            <QuestionEditor
              key={q.id + index}
              question={q}
              quizId={quizId}
              globalIndex={index}
            />
          ))}
        </div>

        {isAddingNew ? (
          <QuestionAddBlock
            quizId={quizId}
            nextOrderIndex={initialQuestions.length}
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
    </div>
  );
}
