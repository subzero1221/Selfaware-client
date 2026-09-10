"use client";

import { useQuiz } from "@/hooks/Quizzes/useQuiz";
import PageNotFound from "@/components/ui/PageNotFound";
import QuizEditor from "./QuizEditor";
import { usePathname } from "next/navigation";
import Loading from "@/components/ui/Loading";


export default function QuizEditLoader({ quizId }: { quizId: string }) {
  const pathname = usePathname();
  const {
    data: quiz,
    isLoading: quizLoading,
    error: quizError,
  } = useQuiz(quizId);

  if (quizLoading) {
    return (
      <Loading />
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

  const isCreateRoute = pathname.includes("/create");
  const isEditRoute = pathname.includes("/edit");

  if (
    (isCreateRoute && quiz.quizStatus === 1) ||
    (isEditRoute && quiz.quizStatus === 0)
  ) {
    return <PageNotFound />;
  }

  return <QuizEditor initialQuiz={quiz} />;
}
