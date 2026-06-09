"use client";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import QuizEditQuestions from "./QuizEditQuestions";
import QuizEditSettings from "./QuizEditSettings";

export default function QuizEditor({
  initialQuiz,
}: {
  initialQuiz: QuizDetailResponse;
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <QuizEditSettings quiz={initialQuiz} />

      {/*<QuizEditQuestions
        initialQuestions={initialQuiz.questions || []}
        quizId={initialQuiz.id}
      />*/}
    </div>
  );
}
