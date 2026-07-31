"use client";
import SingleQuizRendererForDashboard from "./SingleQuizRendererForDashboard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import { ApiResponse } from "@/hooks/Quizzes/useQuiz";
import { Loader2, AlertTriangle } from "lucide-react";

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
      <div className="flex justify-center items-center min-h-screen bg-wood-base p-4 selection:bg-brutal-yellow selection:text-brutal-dark">
        <div className="flex items-center gap-4 bg-brutal-yellow border-4 border-brutal-dark px-8 py-5 rounded-2xl shadow-[6px_6px_0_0_rgba(67,20,7,1)] animate-pulse rotate-1">
          <Loader2
            size={32}
            strokeWidth={3}
            className="text-brutal-dark animate-spin"
          />
          <span className="font-sans font-black text-xl text-brutal-dark uppercase tracking-widest">
            იტვირთება...
          </span>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-wood-base p-4 selection:bg-brutal-yellow selection:text-brutal-dark">
        <div className="flex flex-col items-center text-center max-w-md gap-4 bg-brutal-red border-4 border-brutal-dark p-8 rounded-3xl shadow-[8px_8px_0_0_rgba(67,20,7,1)] -rotate-1">
          <AlertTriangle size={48} strokeWidth={2.5} className="text-white" />
          <span className="font-sans font-black text-2xl text-white uppercase tracking-wider drop-shadow-md">
            შეცდომა
          </span>
          <p className="text-white font-bold text-lg drop-shadow-sm">
            კითხვარის ჩატვირთვა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.
          </p>
        </div>
      </div>
    );
  }

  return <SingleQuizRendererForDashboard quiz={quiz} />;
}
