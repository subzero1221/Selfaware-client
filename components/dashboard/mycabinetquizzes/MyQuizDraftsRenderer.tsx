"use client";
import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";

interface MyQuizDraftsRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizDraftsRenderer({
  quizzes,
}: MyQuizDraftsRendererProps) {
  return (
    <div className="relative w-full bg-wood-surface border-[4px] border-wood-border rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-300 min-h-[500px] flex flex-col">
      <div className="absolute inset-0 border border-wood-border-focus/30 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] pointer-events-none"></div>

      <div className="relative p-6 flex flex-col h-full flex-grow">
        <div className="border-b-2 border-wood-border-focus/40 pb-4 mb-5 relative">
          <h3 className="font-serif text-lg font-bold tracking-wide text-wood-text-primary drop-shadow-md flex items-center gap-3">
            <span className="text-xl opacity-80">🗄️</span>
            ჩანახატები // Drafts
          </h3>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-wood-border-focus/60 via-wood-border-focus/20 to-transparent"></div>
        </div>

        <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {quizzes.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-wood-border/40 rounded bg-wood-base/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">
              <span className="text-3xl opacity-30 mb-3 grayscale">📭</span>
              <p className="font-serif text-sm font-semibold text-wood-text-muted">
                ჩანახატები ცარიელია
              </p>
              <p className="font-mono text-[10px] text-wood-text-muted/60 mt-1 uppercase tracking-widest">
                No active drafts
              </p>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group relative bg-wood-base border border-wood-border border-l-4 border-l-wood-accent/70 p-4 rounded shadow-[inset_0_1px_3px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)] hover:border-wood-accent hover:border-l-wood-accent hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-serif text-sm font-bold text-wood-text-primary truncate">
                    {quiz.title || "უსათაურო ჩანახატი..."}
                  </h4>
                  <div className="flex justify-between items-center pt-2 border-t border-wood-border/30">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-wood-text-secondary bg-wood-surface px-2 py-0.5 rounded border border-wood-border/50">
                      📋 {quiz.questionCount} კითხვა
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/create/${quiz.id}`}
                  className="absolute inset-0 w-full h-full bg-wood-surface/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 rounded cursor-pointer flex items-center justify-end pr-4 text-wood-accent font-serif font-bold text-xs uppercase tracking-wider border border-wood-accent/50"
                >
                  გახსნა ➔
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
