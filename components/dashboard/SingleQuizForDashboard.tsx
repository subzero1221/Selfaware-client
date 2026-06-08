"use client";
import SingleQuizRendererForDashboard from "./SingleQuizRendererForDashboard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import { ApiResponse } from "@/hooks/Quizzes/useQuiz";

export default function QuizRunner() {
  const params = useParams();
  const quizId = params.quizId as string;

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () =>
      apiClient<ApiResponse<QuizDetailResponse>>(`/quiz/${quizId}`).then(
        (res) => res.data,
      ),
    enabled: !!quizId,
    retry: false,
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-wood-surface p-4">
        <span className="font-mono text-xs text-wood-text-muted animate-pulse uppercase tracking-widest">
          კითხვარის ჩატვირთვა...
        </span>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-wood-surface p-4">
        <span className="font-mono text-xs text-red-500 uppercase tracking-widest">
          კითხვარის ჩატვირთვა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.
        </span>
      </div>
    );
  }

  console.log("Loaded quiz:", quiz);

  return <SingleQuizRendererForDashboard quiz={quiz} />;
}
