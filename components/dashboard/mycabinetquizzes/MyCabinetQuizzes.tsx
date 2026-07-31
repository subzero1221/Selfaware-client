"use client";

import MyQuizzesRenderer from "./MyQuizzesRenderer";
import MyQuizDraftsRenderer from "./MyQuizDraftsRenderer";
import useQuizzes from "@/hooks/Quizzes/useQuizzes";
import { Loader2, AlertTriangle } from "lucide-react";

export default function MyQuizzes() {
  const { data: quizzes, isLoading, error } = useQuizzes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-4 font-sans selection:bg-brutal-yellow selection:text-brutal-dark">
        <div className="flex items-center gap-4 bg-brutal-yellow border-4 border-brutal-dark px-8 py-5 rounded-2xl shadow-[6px_6px_0_0_rgba(67,20,7,1)] animate-pulse rotate-1">
          <Loader2
            size={32}
            strokeWidth={3}
            className="text-brutal-dark animate-spin"
          />
          <span className="font-black text-xl text-brutal-dark uppercase tracking-widest">
            ტესტების ჩატვირთვა...
          </span>
        </div>
      </div>
    );
  }

  if (!quizzes || error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-4 font-sans selection:bg-brutal-yellow selection:text-brutal-dark">
        <div className="flex flex-col items-center text-center max-w-md gap-4 bg-brutal-red border-4 border-brutal-dark p-8 rounded-3xl shadow-[8px_8px_0_0_rgba(67,20,7,1)] -rotate-1">
          <AlertTriangle size={48} strokeWidth={2.5} className="text-white" />
          <span className="font-black text-2xl text-white uppercase tracking-wider drop-shadow-md">
            შეცდომა
          </span>
          <p className="text-white font-bold text-lg drop-shadow-sm">
            ტესტების ჩატვირთვა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.
          </p>
        </div>
      </div>
    );
  }

  const approvedQuizzes =
    quizzes?.quizzes.filter((quiz) => quiz.quizStatus === 1) || [];
  const draftQuizzes =
    quizzes?.quizzes.filter((quiz) => quiz.quizStatus === 0) || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 font-sans selection:bg-brutal-yellow selection:text-brutal-dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <MyQuizDraftsRenderer quizzes={draftQuizzes} />
        </div>

        <div className="lg:col-span-8">
          <MyQuizzesRenderer quizzes={approvedQuizzes} />
        </div>
      </div>
    </div>
  );
}
