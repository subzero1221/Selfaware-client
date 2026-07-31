"use client";

import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import useDeleteDraftQuiz from "@/hooks/Quizzes/useDeleteDraftQuiz";
import { Archive, Trash2, ArrowRight, FileText, Inbox } from "lucide-react";

interface MyQuizDraftsRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizDraftsRenderer({
  quizzes,
}: MyQuizDraftsRendererProps) {
  const { mutate: deleteQuiz, isPending } = useDeleteDraftQuiz();

  return (
    <div className="w-full bg-wood-surface border-4 border-brutal-dark rounded-3xl shadow-[6px_6px_0_0_rgba(67,20,7,1)] p-6 min-h-[500px] flex flex-col font-sans">
      <div className="border-b-4 border-brutal-dark pb-4 mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-black tracking-tight text-wood-text-primary flex items-center gap-3">
          <Archive size={26} strokeWidth={3} className="text-brutal-yellow" />
          ჩანახატები
        </h3>
        <span className="bg-brutal-yellow border-2 border-brutal-dark text-brutal-dark font-black text-xs px-3 py-1 rounded-xl shadow-[2px_2px_0_0_rgba(67,20,7,1)] uppercase">
          {quizzes.length} ჩანახატი
        </span>
      </div>

      <div className="flex-grow overflow-y-auto space-y-4 pr-1">
        {quizzes.length === 0 ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border-4 border-dashed border-wood-border rounded-2xl bg-wood-base/50">
            <Inbox
              size={48}
              strokeWidth={2}
              className="text-wood-text-muted mb-3 opacity-60"
            />
            <p className="font-black text-lg text-wood-text-primary">
              ჩანახატები ცარიელია
            </p>
            <p className="font-bold text-xs text-wood-text-muted mt-1 uppercase tracking-wider">
              No active drafts found
            </p>
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group relative bg-white border-4 border-brutal-dark p-4 rounded-2xl shadow-[4px_4px_0_0_rgba(67,20,7,1)] hover:-translate-y-0.5 hover:shadow-[4px_6px_0_0_rgba(67,20,7,1)] transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <h4 className="font-black text-lg text-brutal-dark truncate leading-snug">
                  {quiz.title || "უსათაურო ჩანახატი..."}
                </h4>

                <div className="flex justify-between items-center pt-2 border-t-2 border-brutal-dark/20">
                  <span className="text-xs font-black uppercase text-brutal-dark/70 flex items-center gap-1.5">
                    <FileText size={16} strokeWidth={2.5} />
                    {quiz.questionCount} კითხვა
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-brutal-yellow border-4 border-brutal-dark rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between px-4 z-10 shadow-[4px_4px_0_0_rgba(67,20,7,1)]">
                <button
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (confirm("ნამდვილად გსურთ ამ ჩანახატის წაშლა?")) {
                      deleteQuiz(quiz.id);
                    }
                  }}
                  className="w-10 h-10 bg-brutal-red border-2 border-brutal-dark rounded-xl flex items-center justify-center text-white shadow-[2px_2px_0_0_rgba(67,20,7,1)] hover:bg-red-600 active:translate-y-px active:shadow-none transition-all cursor-pointer"
                  title="წაშლა"
                >
                  <Trash2 size={20} strokeWidth={3} />
                </button>

                <Link
                  href={`/dashboard/create/${quiz.id}`}
                  className="flex items-center gap-2 bg-brutal-dark text-white font-black text-sm uppercase tracking-wider px-4 py-2 rounded-xl shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:bg-black transition-all"
                >
                  <span>გახსნა</span>
                  <ArrowRight size={18} strokeWidth={3} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
