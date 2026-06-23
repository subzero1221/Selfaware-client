import useQuizzes from "@/hooks/Quizzes/useQuizzes";
import { useState } from "react";

export default function HostLobbyChooseQuiz({ playersLength }: { playersLength: number }) {
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const { data, isLoading, error } = useQuizzes();

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center text-wood-text-muted font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-wood-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase text-sm">იტვირთება ლობი...</p>
        </div>
      </div>
    );
  }

  console.log(selectedQuizId)

  return (
    <aside className="bg-wood-surface/80 backdrop-blur-sm border border-wood-border/60 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between h-full min-h-[450px] shadow-lg">
      <div>
        <h2 className="text-lg font-semibold text-wood-accent mb-6 border-b border-wood-border/40 pb-4 tracking-wide">
          პანელის მართვა
        </h2>

        <div className="mb-6">
          <label className="block text-xs text-wood-muted font-semibold uppercase tracking-wider mb-3 ml-1">
            აირჩიე ქვიზი
          </label>
          <div className="relative">
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="w-full bg-wood-base text-wood-accent border border-wood-border/80 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-wood-accent/50 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option className="text-wood-accent" value="" disabled>
                -- აირჩიე ტესტი --
              </option>
              {data.quizzes.map((quiz) => (
                <option
                  className="text-wood-muted"
                  key={quiz.id}
                  value={quiz.id}
                >
                  {quiz.title}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-wood-text-muted">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          // onClick={() => startGameMutation.mutate()}
          disabled={!selectedQuizId || playersLength === 0}
          className={`relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 overflow-hidden ${
            selectedQuizId && playersLength > 0
              ? "bg-white text-wood-accent hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] cursor-pointer"
              : "bg-wood-base border border-wood-border/50 text-wood-text-muted/50 cursor-not-allowed"
          }`}
        >
          თამაშის დაწყება
        </button>

        <div className="h-6 mt-3 flex items-center justify-center">
          {!selectedQuizId && (
            <p className="text-xs text-wood-accent font-medium animate-pulse">
              დასაწყებად აირჩიე ქვიზი
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
