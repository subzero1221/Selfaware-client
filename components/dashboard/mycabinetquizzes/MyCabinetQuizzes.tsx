"use client";

import MyQuizzesRenderer from "./MyQuizzesRenderer";
import MyQuizDraftsRenderer from "./MyQuizDraftsRenderer";
import useQuizzes from "@/hooks/Quizzes/useQuizzes";

export default function MyQuizzes() {
  const { data: quizzes, isLoading, error } = useQuizzes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-wood-surface p-4">
        <span className="font-mono text-xs text-wood-text-muted animate-pulse uppercase tracking-widest">
          ტესტების ჩატვირთვა... // Loading...
        </span>
      </div>
    );
  }

  if (!quizzes || error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-wood-surface p-4">
        <span className="font-mono text-xs text-red-500 uppercase tracking-widest bg-red-950/10 px-4 py-2 border border-red-900/30 rounded">
          ტესტების ჩატვირთვა ვერ მოხერხდა. // Failed to load.
        </span>
      </div>
    );
  }

  const approvedQuizzes =
    quizzes?.quizzes.filter((quiz) => quiz.quizStatus === 1) || [];
  const draftQuizzes =
    quizzes?.quizzes.filter((quiz) => quiz.quizStatus === 0) || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
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
