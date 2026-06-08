"use client";
import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";

interface MyQuizzesRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizzesRenderer({ quizzes }: MyQuizzesRendererProps) {
  return (
    <div className="relative w-full flex flex-col h-full">

      <div className="border-b-2 border-wood-border-focus/40 pb-4 mb-6 relative flex justify-between items-end">
        <h3 className="font-serif text-xl md:text-2xl font-bold tracking-wide text-wood-text-primary drop-shadow-md flex items-center gap-3">
          <span className="text-2xl opacity-90 drop-shadow-lg">📚</span>
          ჩემი ტესტები // My Quizzes
        </h3>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-wood-border-focus/60 via-wood-border-focus/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6">
        {quizzes?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-wood-border/40 rounded bg-wood-base/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">
            <span className="text-4xl opacity-30 mb-4 grayscale">📦</span>
            <p className="font-serif text-base font-semibold text-wood-text-muted">
              ტესტები ჯერ არ გამოგიქვეყნებია
            </p>
            <p className="font-mono text-xs text-wood-text-muted/60 mt-2 uppercase tracking-widest">
              No published quizzes yet
            </p>
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group relative bg-wood-surface border-2 border-wood-border p-5 rounded shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.05)] hover:border-wood-accent hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h4 className="font-serif text-lg font-bold text-wood-text-primary group-hover:text-wood-accent transition-colors drop-shadow-sm line-clamp-2 leading-tight">
                    {quiz.title || "უსათაურო ტესტი"}
                  </h4>
                  <span className="bg-wood-base px-2 py-1 rounded text-[10px] font-mono text-wood-text-secondary border border-wood-border shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] whitespace-nowrap uppercase tracking-wider">
                    {quiz.quizType}
                  </span>
                </div>
                <p className="text-xs font-mono text-wood-text-muted/80 line-clamp-2 leading-relaxed">
                  {quiz.description || "აღწერა არ არის მითითებული..."}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-wood-border/40 flex items-center justify-between">
                <div className="flex flex-col bg-wood-base/50 px-3 py-1.5 rounded border border-wood-border/30">
                  <span className="text-[9px] font-serif uppercase tracking-widest text-wood-text-muted mb-0.5">
                    კითხვები
                  </span>
                  <span className="font-mono text-sm text-wood-text-primary font-bold leading-none">
                    {quiz.questionCount}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/quiz/${quiz.id}`}
                    className="px-4 py-2 text-[10px] md:text-xs font-bold font-serif tracking-wider text-wood-text-primary uppercase bg-wood-base border-2 border-wood-border-focus rounded shadow-sm hover:bg-wood-surface-hover hover:border-wood-accent hover:text-wood-accent active:translate-y-px transition-all duration-200"
                    title="ტესტის დეტალური ნახვა"
                  >
                    ნახვა ↵
                  </Link>

                  <button
                    className="px-3 py-2 text-xs font-mono text-wood-text-muted bg-wood-base border-2 border-wood-border rounded shadow-sm hover:border-wood-border-focus hover:text-wood-text-primary hover:bg-wood-surface-hover transition-all active:translate-y-px"
                    title="ბმულის კოპირება"
                  >
                    🔗
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
