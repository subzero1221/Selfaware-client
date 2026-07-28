"use client";

import MyQuizzesRenderer from "./MyQuizzesRenderer";
import MyQuizDraftsRenderer from "./MyQuizDraftsRenderer";
import useQuizzes from "@/hooks/Quizzes/useQuizzes";

export default function MyQuizzes() {
  const { data: quizzes, isLoading, error } = useQuizzes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-4">
        <div className="bg-wood-surface border-2 border-wood-border p-6 rounded shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.05)] relative overflow-hidden">
          <div className="absolute inset-1 border border-wood-border/30 pointer-events-none border-dashed"></div>
          <span className="relative font-serif text-sm text-wood-accent animate-pulse uppercase tracking-[0.3em] drop-shadow-md">
            ტესტების ჩატვირთვა... // Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!quizzes || error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-4">
        <div className="bg-red-950/20 border-2 border-red-900/50 p-6 rounded shadow-[0_8px_16px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-1 border border-red-900/30 pointer-events-none border-dashed"></div>
          <span className="relative font-mono text-sm text-red-400 uppercase tracking-widest drop-shadow-md">
            ⚠️ ტესტების ჩატვირთვა ვერ მოხერხდა. // Failed to load.
          </span>
        </div>
      </div>
    );
  }

  const approvedQuizzes =
    quizzes?.quizzes.filter((quiz) => quiz.quizStatus === 1) || [];
  const draftQuizzes =
    quizzes?.quizzes.filter((quiz) => quiz.quizStatus === 0) || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
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
