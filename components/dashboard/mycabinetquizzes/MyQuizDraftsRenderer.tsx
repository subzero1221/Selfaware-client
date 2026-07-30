"use client";
import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import useDeleteDraftQuiz from "@/hooks/Quizzes/useDeleteDraftQuiz";

interface MyQuizDraftsRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizDraftsRenderer({
  quizzes,
}: MyQuizDraftsRendererProps) {
  const { mutate: deleteQuiz, isPending } = useDeleteDraftQuiz();

  return (
    <div className="relative w-full bg-wood-surface border-[3px] border-wood-border rounded-sm shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-hidden transition-colors duration-300 min-h-[500px] flex flex-col">
      <div className="absolute inset-0 border-[4px] border-wood-base/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-20"></div>

      <div className="relative p-6 flex flex-col h-full flex-grow z-10">
        <div className="border-b-2 border-wood-border-focus/40 pb-4 mb-5 relative flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold tracking-widest text-wood-text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center gap-3">
            <span className="text-xl opacity-90 drop-shadow-md">🗄️</span>
            ჩანახატები
          </h3>
          <span className="font-mono text-[10px] text-wood-text-muted uppercase tracking-widest bg-wood-base px-2 py-1 rounded shadow-inner">
            {quizzes.length} Drafts
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-wood-accent/50 via-wood-border-focus/20 to-transparent"></div>
        </div>

        <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {quizzes.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-wood-border/30 rounded bg-wood-base/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)]">
              <span className="text-4xl opacity-20 mb-4 grayscale drop-shadow-md">
                📭
              </span>
              <p className="font-serif text-sm font-bold text-wood-text-muted drop-shadow-sm">
                ჩანახატები ცარიელია
              </p>
              <p className="font-mono text-[10px] text-wood-text-muted/50 mt-2 uppercase tracking-widest">
                No active drafts found
              </p>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group relative bg-wood-base/80 border-y border-r border-l-[6px] border-wood-border border-l-wood-accent/80 p-4 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4),0_4px_6px_rgba(0,0,0,0.2)] hover:border-wood-accent hover:border-l-wood-accent hover:bg-wood-surface hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="absolute inset-1 border border-wood-border/20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col gap-3">
                  <h4 className="font-serif text-sm font-bold text-wood-text-primary truncate drop-shadow-sm">
                    {quiz.title || "უსათაურო ჩანახატი..."}
                  </h4>
                  <div className="flex justify-between items-center pt-2 border-t border-wood-border/40">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-wood-text-secondary flex items-center gap-1">
                      <span className="opacity-70">📋</span>{" "}
                      {quiz.questionCount} კითხვა
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 w-full h-full bg-wood-base/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between px-3 z-20 border border-wood-accent/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)]">
                  <button
                    disabled={isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm("ნამდვილად გსურთ ამ ჩანახატის წაშლა?")) {
                        deleteQuiz(quiz.id);
                      }
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-red-950/60 hover:bg-red-900/80 text-red-400 hover:text-red-200 border border-red-900/50 hover:border-red-500/50 rounded shadow-md transition-all cursor-pointer"
                    title="წაშლა"
                  >
                    🗑️
                  </button>

                  <Link
                    href={`/dashboard/create/${quiz.id}`}
                    className="flex-grow flex items-center justify-end text-wood-accent hover:text-wood-text-primary font-serif font-bold text-[11px] uppercase tracking-widest transition-colors"
                  >
                    გახსნა <span className="ml-2 text-sm">➔</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
