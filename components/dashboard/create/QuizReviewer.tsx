"use client";
import { useState } from "react";
import DraftQuestions from "./DraftQuestions";
import DraftQuizSettings from "./DraftQuizSettings";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import useQuizPut from "@/hooks/Quizzes/useQuizPut";


export default function QuizReviewer({
  initialQuiz,
}: {
  initialQuiz: QuizDetailResponse;
}) {
  const {
    mutate: updateQuiz,
    isPending: isUpdating,
    error: updateError,
  } = useQuizPut(initialQuiz.id);

  const [title, setTitle] = useState(initialQuiz.title || "");
  const [description, setDescription] = useState(initialQuiz.description || "");
  const [timeInMinutes, setTimeInMinutes] = useState(
    initialQuiz.timeInMinutes || 30,
  );

  const [questions, setQuestions] = useState(initialQuiz.questions || []);

  console.log("Initial quiz data:", initialQuiz.slug);
  const handleFinalSave = async () => {
    try {
      const payload = {
        id: initialQuiz.id,
        title,
        description,
        slug: initialQuiz.slug,
        timeInMinutes: timeInMinutes,
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
      <DraftQuizSettings
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        timeInMinutes={timeInMinutes}
        setTimeInMinutes={setTimeInMinutes}
      />

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
