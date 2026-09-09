"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import OptionEditor from "./OptionEditor";
import ImageUploader from "@/components/dashboard/create/ImageUploader";
import useCreateQuestion from "@/hooks/Quizzes/useCreateQuestion";
import { QuestionType } from "@/types/enums/quizEnums";

interface QuestionAddBlockProps {
  quizId: string;
  nextOrderIndex: number;
  onCancel: () => void;
}

const QUESTION_TYPE_OPTIONS = [
  { id: QuestionType.SingleChoice, label: "ერთპასუხიანი" },
  { id: QuestionType.MultipleChoice, label: "მრავალპასუხიანი" },
];

export default function QuestionAddBlock({
  quizId,
  nextOrderIndex,
  onCancel,
}: QuestionAddBlockProps) {
  const { mutate: createQuestion, isPending } = useCreateQuestion(quizId);

  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: [
      { text: "", score: 1 },
      { text: "", score: 0 },
      { text: "", score: 0 },
      { text: "", score: 0 },
    ],
    order: nextOrderIndex,
    questionType: QuestionType.SingleChoice,
    imageUrl: undefined as string | undefined,
    imagePublicId: undefined as string | undefined,
  });

  const handleQuestionTextChange = (value: string) => {
    setCurrentQuestion((prev) => ({ ...prev, text: value }));
  };

  const handleTypeChange = (type: QuestionType) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      questionType: type,

      options: prev.options.map((opt, idx) => ({
        ...opt,
        score: idx === 0 ? 1 : 0,
      })),
    }));
  };

  const handleOptionTextChange = (oIndex: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) =>
        idx === oIndex ? { ...opt, text: value } : opt,
      ),
    }));
  };

  const handleOptionRadioChange = (oIndex: number) => {
    setCurrentQuestion((prev) => {
      if (prev.questionType === QuestionType.MultipleChoice) {
        return {
          ...prev,
          options: prev.options.map((opt, idx) =>
            idx === oIndex ? { ...opt, score: opt.score === 1 ? 0 : 1 } : opt,
          ),
        };
      }

      return {
        ...prev,
        options: prev.options.map((opt, idx) =>
          idx === oIndex ? { ...opt, score: 1 } : { ...opt, score: 0 },
        ),
      };
    });
  };

  const handleImageChange = (data: {
    imageUrl: string | null;
    publicId: string | null;
  }) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      imageUrl: data.imageUrl || undefined,
      imagePublicId: data.publicId || undefined,
    }));
  };

  const handleSave = () => {
    createQuestion(currentQuestion, {
      onSuccess: () => {
        onCancel();
      },
    });
  };

  return (
    <div className="relative bg-wood-surface border-4 border-dashed border-brutal-dark/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-inner mt-8">
      <button
        onClick={onCancel}
        disabled={isPending}
        className="absolute cursor-pointer -top-5 right-6 bg-wood-accent border-4 border-wood-border text-white px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-wood-border)] hover:scale-105 transition-all z-10"
      >
        ✕ გაუქმება
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="text-sm md:text-base font-black text-wood-text-primary uppercase tracking-wide bg-brutal-green text-brutal-dark w-fit px-3 py-1 rounded-lg border-2 border-brutal-dark rotate-1">
          ახალი კითხვა
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {QUESTION_TYPE_OPTIONS.map((t) => {
            const isActive = currentQuestion.questionType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTypeChange(t.id)}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider border-2 border-brutal-dark transition-all ${
                  isActive
                    ? "bg-brutal-yellow text-brutal-dark shadow-[2px_2px_0_0_rgba(67,20,7,1)] -translate-y-0.5"
                    : "bg-white text-brutal-dark/70 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 relative pt-2">
        <ImageUploader
          onImageSelect={handleImageChange}
          imageUrl={currentQuestion.imageUrl}
        />

        <input
          type="text"
          value={currentQuestion.text}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          placeholder="ჩაწერეთ ახალი კითხვა აქ..."
          className="w-full bg-white border-4 border-wood-border px-4 py-3 rounded-2xl font-black text-lg text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all placeholder:text-wood-text-options/30"
        />
      </div>

      <div className="h-0.5 bg-wood-border/40 w-full my-4" />

      <div className="space-y-4 pt-4 relative">
        <p className="text-sm font-bold text-wood-text-primary uppercase tracking-wider mb-4">
          {currentQuestion.questionType === QuestionType.MultipleChoice
            ? "სავარაუდო პასუხები (მონიშნეთ ყველა სწორი):"
            : "სავარაუდო პასუხები (მონიშნეთ სწორი):"}
        </p>

        {currentQuestion.options.map((opt, oIndex) => (
          <OptionEditor
            key={`new-opt-${oIndex}`}
            handleOptionTextChange={handleOptionTextChange}
            handleOptionRadioChange={handleOptionRadioChange}
            globalIndex={nextOrderIndex}
            currentQuestionId="new"
            oIndex={oIndex}
            option={opt as any}
            isEditing={true}
          />
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          size="md"
          onClick={handleSave}
          disabled={isPending}
          className="bg-brutal-green cursor-pointer text-brutal-dark border-4 border-brutal-dark px-8 py-3 rounded-2xl font-black text-base uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:translate-y-[4px] hover:shadow-[0px_0px_0_0_var(--color-brutal-dark)] transition-all"
        >
          {isPending ? "ემატება..." : "✓ დამატება (Add)"}
        </Button>
      </div>
    </div>
  );
}
