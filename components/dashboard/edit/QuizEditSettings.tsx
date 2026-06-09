"use client";
import { useState } from "react";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import useQuizUpdate from "@/hooks/Quizzes/useQuizUpdate";
import Button from "@/components/ui/Button";


export default function QuizEditSettings({
  quiz,
}: {
  quiz: QuizDetailResponse;
}) {

  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [timeInMinutes, setTimeInMinutes] = useState(quiz.timeInMinutes || 30);

  const { mutate: updateField, isPending } = useQuizUpdate(quiz.id);

  return (
    <div className="relative bg-wood-surface border-[6px] border-wood-border rounded-sm p-6 md:p-8 space-y-6">
      <h2 className="text-base font-serif font-bold text-wood-text-primary uppercase tracking-wider">
        ქვიზის პარამეტრები // Quiz Settings
      </h2>


      <div className="flex flex-col gap-2">
        <label className="text-sm font-serif font-semibold text-wood-text-secondary">
          სათაური
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full flex-1 bg-wood-base border-2 border-wood-border px-4 py-2.5 text-sm text-wood-text-primary"
          />
          <button
            type="button"
            onClick={() => updateField({ field: "title", value: title })}
            className="px-4 py-2 bg-wood-border hover:bg-wood-accent text-xs font-bold uppercase rounded text-wood-text-primary"
          >
            შენახვა
          </button>
        </div>
      </div>


      <div className="flex flex-col gap-2">
        <label className="text-sm font-serif font-semibold text-wood-text-secondary">
          აღწერა
        </label>
        <div className="flex flex-col gap-2 items-end">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-28 bg-wood-base border-2 border-wood-border px-4 py-2.5 text-sm text-wood-text-primary resize-none"
          />
          <button
            type="button"
            onClick={() =>
              updateField({ field: "description", value: description })
            }
            className="px-4 py-2 bg-wood-border hover:bg-wood-accent text-xs font-bold uppercase rounded text-wood-text-primary"
          >
            შენახვა
          </button>
              <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
          დროის ლიმიტი // Time Limit
        </label>
        
          <div className="relative flex items-center w-full md:max-w-xs">
            <input
              type="number"
              min={1}
              max={300}
              value={timeInMinutes || ""}
              onChange={(e) => setTimeInMinutes(Number(e.target.value))}
              placeholder="30"
              className="w-full bg-wood-base border-2 border-wood-border pl-4 pr-16 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all"
            />
            <span className="absolute right-4 font-serif text-xs font-semibold text-wood-text-muted uppercase tracking-wider pointer-events-none">
              წუთი
            </span>
          </div>
          <Button />
        </div>
      </div>
    </div>
  );
}
