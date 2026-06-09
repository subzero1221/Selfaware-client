"use client";

import { useQuiz } from "@/hooks/Quizzes/useQuiz";
import PageNotFound from "@/components/ui/PageNotFound";
import QuizEditor from "./QuizEditor";

export default function QuizEditLoader({ quizId }: { quizId: string }) {

  const {
    data: quiz,
    isLoading: quizLoading,
    error: quizError,
  } = useQuiz(quizId);

  if (quizLoading) {
    return (
      <p className="font-serif text-center py-12 text-wood-text-secondary tracking-wide">
        კითხვები იტვირთება... // Loading questions...
      </p>
    );
  }

  if (quizError || !quiz) {
    return (
      <p className="font-serif text-center py-12 text-red-400 tracking-wide">
        კითხვების ჩატვირთვა ვერ მოხერხდა. სცადეთ თავიდან. // Failed to load
        quiz.
      </p>
    );
  }

  if (quiz.quizStatus === 0) {
    return <PageNotFound />;
  }

  return <QuizEditor initialQuiz={quiz} />;
}