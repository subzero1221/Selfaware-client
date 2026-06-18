"use client";
import { QuestionDto } from "@/types/dtos/quiz";
import { useState } from "react";
import PaginationManager from "../create/PaginationManager";
import QuestionEditor from "./QuestionEditor";


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
            <QuestionEditor
              key={q.id}
              question={q}
              globalIndex={globalIndex}
              quizId={quizId}
              setQuestions={setQuestions}
       
            />
          );
        })}
      </div>
    </div>
  );
}
