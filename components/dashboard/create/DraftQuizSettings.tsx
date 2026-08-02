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
    <div className="relative bg-wood-surface border-4 border-brutal-dark rounded-2xl p-6 md:p-8 space-y-6 shadow-[6px_6px_0_0_var(--color-brutal-dark)]">
      <div className="inline-block bg-brutal-yellow border-2 border-brutal-dark px-3 py-1 shadow-[2px_2px_0_0_var(--color-brutal-dark)] mb-2 rotate-[-1deg]">
        <h2 className="text-base font-black text-brutal-dark uppercase tracking-widest">
          ქვიზის პარამეტრები // Settings
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-black text-wood-text-primary uppercase tracking-wider">
          სათაური / Title
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full flex-1 bg-wood-base border-4 border-brutal-dark px-4 py-3 text-sm text-wood-text-primary font-bold shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[2px] focus:translate-x-[2px] focus:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all"
          />
          <Button
            size="sm"
            className="border-4 border-brutal-dark font-black shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all"
            onClick={() =>
              editSettings({ field: SettingsField.Title, value: title })
            }
          >
            შენახვა
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-black text-wood-text-primary uppercase tracking-wider">
          აღწერა / Description
        </label>
        <div className="flex flex-col gap-4 items-end">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 bg-wood-base border-4 border-brutal-dark px-4 py-3 text-sm text-wood-text-primary font-bold resize-none shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[2px] focus:translate-x-[2px] focus:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all"
          />
          <Button
            size="sm"
            className="border-4 border-brutal-dark font-black shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all"
            onClick={() =>
              editSettings({
                field: SettingsField.Description,
                value: description,
              })
            }
          >
            შენახვა
          </Button>

          <div className="w-full md:max-w-xs flex flex-col items-end gap-2 mt-4">
            <label className="text-sm font-black bg-brutal-blue text-white px-2 py-1 border-2 border-brutal-dark shadow-[2px_2px_0_0_var(--color-brutal-dark)] uppercase tracking-wide rotate-[1deg]">
              დროის ლიმიტი // Time Limit
            </label>
            <div className="relative flex items-center w-full mt-2">
              <input
                type="number"
                min={1}
                max={300}
                value={timeInMinutes || ""}
                onChange={(e) => setTimeInMinutes(Number(e.target.value))}
                placeholder="30"
                className="w-full bg-wood-base border-4 border-brutal-dark pl-4 pr-16 py-3 font-mono font-black text-sm text-wood-text-primary shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[2px] focus:translate-x-[2px] focus:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all"
              />
              <span className="absolute right-4 font-black text-xs text-wood-text-muted uppercase tracking-wider pointer-events-none">
                წუთი
              </span>
            </div>
            <Button
              size="sm"
              className="mt-2 border-4 border-brutal-dark font-black shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all"
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
    </div>
  );
}
