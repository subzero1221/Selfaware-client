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
          className="cursor-pointer bg-brutal-green text-white border-4 border-brutal-dark px-6 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 hover:shadow-[4px_4px_0_0_var(--color-brutal-green)] transition-all z-10 rotate-3 hover:rotate-0"
        >
          {isUpdating ? "სეივდება... // Saving..." : "გამოქვეყნება"}
        </button>
      </div>
    </div>
  );
}
