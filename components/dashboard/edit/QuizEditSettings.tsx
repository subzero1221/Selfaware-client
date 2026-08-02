"use client";
import { useState } from "react";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import Button from "@/components/ui/Button";
import { useEditQuiz } from "@/hooks/Quizzes/useEditQuiz";
import { SettingsField } from "@/types/enums/quizEnums";

export default function QuizEditSettings({
  quiz,
}: {
  quiz: QuizDetailResponse;
}) {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [timeInMinutes, setTimeInMinutes] = useState(quiz.timeInMinutes || 30);

  const { editSettings, isEditingSettings, editSettingsError } = useEditQuiz(
    quiz.id,
  );

  return (
    <div className="relative bg-white border-4 border-brutal-dark rounded-3xl p-6 md:p-8 space-y-6 shadow-[6px_8px_0_0_var(--color-brutal-dark)]">
      <div className="text-sm md:text-base font-black text-brutal-dark uppercase tracking-wide bg-brutal-yellow w-fit px-3 py-1 rounded-lg border-2 border-brutal-dark -rotate-1 mb-2">
        ქვიზის პარამეტრები // Settings
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-brutal-dark uppercase tracking-wider">
          სათაური / Title
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full flex-1 bg-gray-50 border-4 border-brutal-dark px-4 py-3 rounded-2xl font-black text-lg text-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-brutal-dark)] transition-all placeholder:text-brutal-dark/30"
          />
          <Button
            size="sm"
            className="border-4 border-brutal-dark rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 transition-all bg-brutal-green text-white px-6 h-auto"
            onClick={() =>
              editSettings({ field: SettingsField.Title, value: title })
            }
          >
            შენახვა
          </Button>
        </div>
      </div>

      <div className="h-0.5 bg-brutal-dark/20 w-full my-4" />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-brutal-dark uppercase tracking-wider">
          აღწერა / Description
        </label>
        <div className="flex flex-col gap-4 items-end">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 bg-gray-50 border-4 border-brutal-dark px-4 py-3 rounded-2xl font-black text-lg text-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-brutal-dark)] transition-all placeholder:text-brutal-dark/30 resize-none"
          />
          <Button
            size="sm"
            className="border-4 border-brutal-dark rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 transition-all bg-brutal-green text-white px-6"
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

      <div className="h-0.5 bg-brutal-dark/20 w-full my-4" />

      <div className="w-full md:max-w-xs flex flex-col items-start gap-2">
        <label className="text-sm font-black bg-brutal-blue text-white px-3 py-1 rounded-lg border-2 border-brutal-dark uppercase tracking-wide rotate-[1deg]">
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
              className="w-full bg-gray-50 border-4 border-brutal-dark pl-4 pr-16 py-3 rounded-2xl font-black text-lg text-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-brutal-dark)] transition-all placeholder:text-brutal-dark/30"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-sm text-brutal-dark/50 uppercase tracking-wider pointer-events-none">
              წუთი
            </span>
          </div>
          <Button
            size="sm"
            className="border-4 border-brutal-dark rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 transition-all bg-brutal-green text-white px-6 h-[56px]"
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
