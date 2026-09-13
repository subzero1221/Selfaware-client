"use client";

import { useState } from "react";
import { Play, Loader2, Info, UserX, Clock, ClipboardList } from "lucide-react";
import { ActivateSurveyDto, QuizForSurveyDto } from "@/types/dtos/survey";
import { QuizzesResponse } from "@/types/dtos/quiz";
import useQuizzes from "@/hooks/Quizzes/useQuizzes";
import useActivateSurvey from "@/hooks/survey/useActivateSurvey";



export default function ActivateSurvey() {
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [duration, setDuration] = useState<number>(7);
  const [allowAnonymous, setAllowAnonymous] = useState<boolean>(true);
  const { data, isLoading: quizzesLoading } = useQuizzes(1);
  const { mutate: activateSurvey, isPending } = useActivateSurvey();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuizId) return;

    activateSurvey({
      quizId: selectedQuizId,
      DurationInDays: duration,
      AllowAnonymous: allowAnonymous,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 pt-2 font-sans w-full max-w-md mx-auto"
    >
      <div className="relative bg-brutal-yellow border-4 border-brutal-dark rounded-2xl p-5 shadow-[4px_4px_0_var(--color-wood-section-shadow)] -rotate-1 transition-colors">
        <div className="absolute -top-3 -left-3 bg-brutal-blue border-2 border-brutal-dark rounded-full p-1.5 shadow-[2px_2px_0_var(--color-wood-section-shadow)] rotate-[-10deg]">
          <Info size={20} strokeWidth={3} className="text-white" />
        </div>
        <p className="text-sm sm:text-base font-bold text-wood-text-primary text-center leading-relaxed mt-2">
          აირჩიეთ და გააქტიურეთ კითხვარი, რათა გაუზიაროთ
          <span className="inline-block bg-brutal-red text-white font-black px-2 py-0.5 rounded-lg border-2 border-brutal-dark shadow-[2px_2px_0_var(--color-wood-section-shadow)] mx-1 rotate-2">
            ბმული
          </span>{" "}
          მომხმარებლებს.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-white border-4 border-brutal-dark rounded-2xl p-3 shadow-[4px_4px_0_var(--color-wood-section-shadow)] focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_var(--color-wood-section-shadow)] transition-all">
          <ClipboardList
            className="text-brutal-dark ml-2 shrink-0"
            size={24}
            strokeWidth={2.5}
          />
          <select
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            required
            className="w-full bg-transparent font-black text-sm sm:text-base text-brutal-dark uppercase tracking-wider outline-none cursor-pointer appearance-none"
          >
            <option value="" disabled>
              -- აირჩიეთ კითხვარი --
            </option>
            {data &&
              data.quizzes.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title || "უსათაურო კითხვარი"} ({q.questionCount} კითხვა)
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-3 bg-brutal-yellow border-4 border-brutal-dark rounded-2xl p-3 shadow-[4px_4px_0_var(--color-wood-section-shadow)] focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_var(--color-wood-section-shadow)] transition-all">
          <Clock
            className="text-brutal-dark ml-2 shrink-0"
            size={24}
            strokeWidth={2.5}
          />
          <select
            value={duration}
            title="კითხვარის მოქმედების ვადა"
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-transparent font-black text-lg text-brutal-dark uppercase tracking-wider outline-none cursor-pointer appearance-none"
          >
            <option value={1}>1 დღე (Day)</option>
            <option value={3}>3 დღე (Days)</option>
            <option value={7}>7 დღე (Days)</option>
            <option value={30}>30 დღე (Days)</option>
          </select>
        </div>

        <button
          type="button"
          title="ანონიმური შევსება"
          onClick={() => setAllowAnonymous(!allowAnonymous)}
          className={`flex items-center justify-between p-4 border-4 border-brutal-dark rounded-2xl shadow-[4px_4px_0_var(--color-wood-section-shadow)] transition-all active:translate-y-[4px] active:shadow-[0px_0px_0_var(--color-wood-section-shadow)] ${
            allowAnonymous
              ? "bg-brutal-blue text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <UserX size={24} strokeWidth={3} />
            <span className="font-black text-lg uppercase tracking-wider">
              ანონიმური შევსება
            </span>
          </div>
          <div
            className={`w-6 h-6 rounded-md border-2 cursor-pointer border-brutal-dark flex items-center justify-center transition-colors ${
              allowAnonymous ? "bg-brutal-yellow" : "bg-white"
            }`}
          >
            {allowAnonymous && (
              <span className="block w-3 h-3 bg-brutal-dark rounded-sm" />
            )}
          </div>
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending || !selectedQuizId}
        className={`
          group relative flex items-center justify-center gap-3 w-full py-4 px-6
          font-sans font-black text-lg sm:text-xl tracking-wider text-brutal-dark uppercase
          border-4 border-brutal-dark rounded-2xl
          transition-all duration-200
          ${
            isPending || !selectedQuizId
              ? "bg-gray-300 opacity-70 cursor-not-allowed translate-y-[4px] shadow-[0px_0px_0_var(--color-wood-section-shadow)]"
              : "bg-brutal-green shadow-[6px_6px_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-brutal-green)] active:translate-y-[6px] active:shadow-[0px_0px_0_var(--color-brutal-green)] cursor-pointer"
          }
        `}
      >
        {isPending ? (
          <>
            <Loader2
              size={24}
              strokeWidth={3}
              className="animate-spin text-brutal-dark"
            />
            <span>ქტიურდება...</span>
          </>
        ) : (
          <>
            <span>{selectedQuizId ? "გააქტიურება" : "აირჩიეთ კითხვარი"}</span>
            <Play
              size={24}
              strokeWidth={3}
              className={`text-brutal-dark fill-brutal-dark transition-transform duration-200 ${
                selectedQuizId
                  ? "group-hover:scale-110 group-hover:translate-x-1"
                  : ""
              }`}
            />
          </>
        )}
      </button>
    </form>
  );
}
