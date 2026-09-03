"use client";

import { useState } from "react";
import useStartGame from "@/hooks/game/socket/useStartGame";
import useQuizzes from "@/hooks/Quizzes/useQuizzes";

interface HostLobbyChooseQuizProps {
  playersLength: number;
  hostId: string;
  joinCode: string;
}

export default function HostLobbyChooseQuiz({
  playersLength,
  hostId,
  joinCode,
}: HostLobbyChooseQuizProps) {
  const { data, isLoading } = useQuizzes(0);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");

  const { sendStartGameSignal, isStarting } = useStartGame(
    joinCode,
    hostId,
    selectedQuizId,
    "",
    true,
  );

  if (isLoading || !data) {
    return (
      <div className="bg-wood-surface border-4 border-amber-950 flex items-center justify-center text-wood-text-primary font-sans h-full min-h-[450px] rounded-3xl shadow-[8px_8px_0_0_var(--color-wood-section-shadow)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-950 border-t-[#FFD166] rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase font-black text-sm">
            იტვირთება ქვიზები...
          </p>
        </div>
      </div>
    );
  }

  const isButtonEnabled = selectedQuizId && playersLength > 0;

  return (
    <aside className="bg-wood-surface border-4 border-wood-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[450px] shadow-[8px_8px_0_0_var(--color-wood-section-shadow)]">
      <div>
        <h2 className="text-xl font-black text-wood-text-primary mb-6 border-b-4 border-wood-border pb-4 tracking-wide uppercase">
          პანელის მართვა
        </h2>

        <div className="mb-6">
          <label className="block text-xs text-wood-text-primary/80 font-black uppercase tracking-wider mb-3 ml-1">
            აირჩიე ქვიზი
          </label>
          <div className="relative">
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="w-full bg-[#FFD166] text-amber-950 font-black border-4 border-amber-950 rounded-2xl px-4 py-3.5 text-sm focus:outline-none shadow-[4px_4px_0_0_rgba(67,20,7,1)] transition-all appearance-none cursor-pointer pr-10"
            >
              <option
                className="bg-white text-amber-950 font-bold"
                value=""
                disabled
              >
                -- აირჩიე ტესტი --
              </option>
              {data.quizzes.map((quiz) => (
                <option
                  className="bg-white text-amber-950 font-bold"
                  key={quiz.id}
                  value={quiz.id}
                >
                  {quiz.title}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-amber-950">
              <svg
                className="w-5 h-5 stroke-[3]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => sendStartGameSignal()}
          disabled={!isButtonEnabled}
          className={`w-full py-4 rounded-2xl font-black text-base tracking-widest uppercase transition-all flex items-center justify-center gap-3 border-4 border-amber-950 shadow-[4px_6px_0_0_rgba(67,20,7,1)] ${
            isButtonEnabled
              ? "bg-[#06D6A0] hover:bg-[#05C291] text-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] cursor-pointer"
              : "bg-gray-200 text-gray-400 border-gray-400 shadow-none cursor-not-allowed opacity-80"
          }`}
        >
          {isStarting ? "თამაში იწყება..." : "თამაშის დაწყება"}
        </button>

        <div className="h-6 mt-3 flex items-center justify-center">
          {!selectedQuizId && (
            <p className="text-xs text-[#EF476F] font-black uppercase tracking-wider animate-pulse">
              დასაწყებად აირჩიე ქვიზი
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
