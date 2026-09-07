"use client";
import { useState } from "react";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import Button from "@/components/ui/Button";
import { useEditQuiz } from "@/hooks/Quizzes/useEditQuiz";
import { SettingsField, QuizType } from "@/types/enums/quizEnums";

export default function DraftQuizSettings({
  quiz,
}: {
  quiz: QuizDetailResponse;
}) {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [timeInMinutes, setTimeInMinutes] = useState(quiz.timeInMinutes || 30);

  const [quizType, setQuizType] = useState(quiz.quizType);
  console.log("QuizType state:", quizType);

  const { editSettings, isEditingSettings, editSettingsError } = useEditQuiz(
    quiz.id,
  );

  return (
    <div className="relative bg-wood-surface border-4 border-wood-border rounded-3xl p-6 md:p-8 space-y-6 shadow-[6px_8px_0_0_var(--color-wood-border)] transition-all duration-300 hover:-translate-y-2 group">
      <div className="flex flex-col gap-2 relative">
        <div className="text-sm md:text-base font-black text-white uppercase tracking-wide bg-wood-accent w-fit px-3 py-1 rounded-lg border-2 border-wood-border -rotate-1 mb-2">
          ქვიზის პარამეტრები // Settings
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-wood-text-primary uppercase tracking-wider ml-1">
          სათაური / Title
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full flex-1 bg-gray-50 border-4 border-wood-border px-4 py-3 rounded-2xl font-black text-lg text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all placeholder:text-wood-text-options/30"
          />
          <Button
            size="sm"
            className="border-4 border-wood-border rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[4px] hover:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all px-6 md:py-3.5"
            onClick={() =>
              editSettings({ field: SettingsField.Title, value: title })
            }
          >
            შენახვა
          </Button>
        </div>
      </div>

      <div className="h-0.5 bg-wood-border w-full my-4" />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-wood-text-primary uppercase tracking-wider ml-1">
          აღწერა / Description
        </label>
        <div className="flex flex-col gap-4 items-end">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 bg-gray-50 border-4 border-wood-border px-4 py-3 rounded-2xl font-black text-lg text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all placeholder:text-wood-text-options/30 resize-none"
          />
          <Button
            size="sm"
            className="border-4 border-wood-border rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[4px] hover:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all px-6"
            onClick={() =>
              editSettings({
                field: SettingsField.Description,
                value: description,
              })
            }
          >
            შენახვა
          </Button>
        </div>
      </div>

      <div className="h-0.5 bg-wood-border w-full my-4" />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-wood-text-primary uppercase tracking-wider ml-1">
          ტიპი / Quiz Type
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-1 gap-3">
            <button
              type="button"
              onClick={() => setQuizType(0)}
              className={`flex-1 border-4 cursor-pointer border-wood-border rounded-2xl font-black text-sm md:text-base uppercase tracking-wider transition-all py-3 px-4 ${
                quizType === QuizType.Knowledge
                  ? "bg-brutal-green text-brutal-dark translate-y-[4px] shadow-[0px_0px_0_0_var(--color-wood-border)]"
                  : "bg-gray-50 text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-wood-border)]"
              }`}
            >
              Knowledge
            </button>
            <button
              type="button"
              onClick={() => setQuizType(1)}
              className={`flex-1 border-4 cursor-pointer border-wood-border rounded-2xl font-black text-sm md:text-base uppercase tracking-wider transition-all py-3 px-4 ${
                quizType === QuizType.Survey
                  ? "bg-brutal-green text-brutal-dark translate-y-[4px] shadow-[0px_0px_0_0_var(--color-wood-border)]"
                  : "bg-gray-50 text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-wood-border)]"
              }`}
            >
              Survey
            </button>
          </div>
          <Button
            size="sm"
            className="border-4 border-wood-border rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[4px] hover:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all px-6 md:py-3.5"
            onClick={() =>
              editSettings({
                field: SettingsField.QuizType,
                quizType: String(quizType),
              })
            }
          >
            შენახვა
          </Button>
        </div>
      </div>

      <div className="h-0.5 bg-wood-border w-full my-4" />

      <div className="w-full md:max-w-xs flex flex-col items-start gap-2">
        <label className="text-sm font-black bg-wood-accent text-white px-3 py-1 rounded-lg border-2 border-wood-border uppercase tracking-wide rotate-[1deg]">
          დროის ლიმიტი // Time Limit
        </label>
        <div className="relative flex items-center w-full mt-2 gap-4">
          <div className="relative flex-1">
            <input
              type="number"
              min={1}
              max={300}
              value={timeInMinutes || ""}
              onChange={(e) => setTimeInMinutes(Number(e.target.value))}
              placeholder="30"
              className="w-full bg-gray-50 border-4 border-wood-border pl-4 pr-16 py-3 rounded-2xl font-black text-lg text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all placeholder:text-wood-text-options/30"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-sm text-wood-text-options/50 uppercase tracking-wider pointer-events-none">
              წუთი
            </span>
          </div>
          <Button
            size="sm"
            className="border-4 border-wood-border rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[4px] hover:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all px-6 h-[56px]"
            onClick={() =>
              editSettings({
                field: SettingsField.TimeLimit,
                value: String(timeInMinutes),
              })
            }
          >
            შენახვა
          </Button>
        </div>
      </div>
    </div>
  );
}
