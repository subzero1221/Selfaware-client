"use client";
import { useState } from "react";
import DraftQuestions from "./DraftQuestions";
import DraftQuizSettings from "./DraftQuizSettings";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import usePutQuiz from "@/hooks/Quizzes/usePutQuiz";

export default function QuizReviewer({
  initialQuiz,
}: {
  initialQuiz: QuizDetailResponse;
}) {
  const {
    mutate: updateQuiz,
    isPending: isUpdating,
    error: updateError,
  } = usePutQuiz(initialQuiz.id);

  const [questions, setQuestions] = useState(initialQuiz?.questions || []);

  const handleFinalSave = async () => {
    try {
      const payload = {
        id: initialQuiz.id,
        title: initialQuiz.title,
        description: initialQuiz.description,
        slug: initialQuiz.slug,
        timeInMinutes: initialQuiz.timeInMinutes || 30,
        quizStatus: 1,
        quizType: initialQuiz.quizType,
        questionCount: questions.length,
        questions: questions,
      };

      updateQuiz(payload);
    } catch (error) {
      console.error("Save failed", updateError || error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <DraftQuizSettings quiz={initialQuiz} />

      <DraftQuestions questions={questions} setQuestions={setQuestions} />

      <div className="flex justify-end pt-4">
        <button
          onClick={handleFinalSave}
          disabled={isUpdating}
          className="bg-wood-accent border-2 border-wood-border px-6 py-2.5 font-serif font-bold text-sm text-wood-text-primary uppercase tracking-wider rounded shadow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isUpdating
            ? "სეივდება... // Saving..."
            : "გამოქვეყნება // Publish Quiz"}
        </button>
      </div>
    </div>
  );
}
