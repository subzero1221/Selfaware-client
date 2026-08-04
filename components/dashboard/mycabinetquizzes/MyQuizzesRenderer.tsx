"use client";

import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import useDeleteDraftQuiz from "@/hooks/Quizzes/useDeleteDraftQuiz";
import { BookOpen, Link2, Trash2, PackageOpen, Eye } from "lucide-react";

interface MyQuizzesRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizzesRenderer({ quizzes }: MyQuizzesRendererProps) {
  const { mutate: deleteQuiz, isPending } = useDeleteDraftQuiz();

  function handleDelete(quizId: string) {
    if (isPending) return;
    if (
      confirm(
        "ნამდვილად გსურთ ტესტის წაშლა? ეს მოქმედება არ იქნება დაბრუნებადი.",
      )
    ) {
      deleteQuiz(quizId);
    }
  }

  return (
    <div className="w-full flex flex-col font-sans">
      <div className="border-b-4 border-brutal-dark pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-3xl font-black tracking-tight text-wood-text-primary flex items-center gap-3">
          <BookOpen size={32} strokeWidth={3} className="text-brutal-green" />
          ჩემი ტესტები
        </h3>
        <span className="bg-brutal-green border-2 border-brutal-dark text-brutal-dark font-black text-xs px-4 py-1.5 rounded-xl shadow-[3px_3px_0_0_rgba(67,20,7,1)] uppercase">
          გამოქვეყნებული: {quizzes?.length || 0}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center min-h-[350px] border-4 border-dashed border-wood-border rounded-3xl bg-wood-surface/50 p-8 text-center">
            <PackageOpen
              size={64}
              strokeWidth={2}
              className="text-wood-text-muted mb-4 opacity-50"
            />
            <p className="font-black text-xl text-wood-text-primary">
              ტესტები ჯერ არ გამოგიქვეყნებია
            </p>
            <p className="font-bold text-xs text-wood-text-muted mt-2 uppercase tracking-widest">
              No published quizzes yet
            </p>
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group bg-wood-surface border-4 border-brutal-dark rounded-3xl p-6 shadow-[6px_6px_0_0_rgba(67,20,7,1)]  hover:shadow-[8px_8px_0_0_rgba(67,20,7,1)] transition-all duration-200 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4 gap-3">
                  <h4 className="text-xl font-black text-wood-text-secondary line-clamp-2 leading-tight">
                    {quiz.title || "უსათაურო ტესტი"}
                  </h4>

                  <span className="shrink-0 bg-brutal-yellow text-wood-text-primary font-black text-[10px] uppercase border-2 border-brutal-dark px-2.5 py-1 rounded-lg shadow-[2px_2px_0_0_rgba(67,20,7,1)]">
                    {quiz.quizType || "Quiz"}
                  </span>
                </div>

                <p className="text-sm font-bold text-wood-text-secondary line-clamp-3 leading-relaxed italic mb-6">
                  {quiz.description || "აღწერა არ არის მითითებული..."}
                </p>
              </div>

              <div className="pt-4 border-t-4 border-wood-border flex items-center justify-between gap-2">
                <div className="bg-wood-base border-2 border-brutal-dark px-3 py-1.5 rounded-xl shadow-[2px_2px_0_0_rgba(67,20,7,1)] flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase text-wood-text-muted leading-none">
                    კითხვა
                  </span>
                  <span className="text-base font-black text-wood-text-primary leading-tight">
                    {quiz.questionCount}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/edit/${quiz.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 bg-brutal-blue text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-brutal-dark shadow-[2px_2px_0_0_rgba(67,20,7,1)] hover:bg-brutal-blue/90 active:translate-y-px active:shadow-none transition-all"
                    title="ტესტის დეტალური ნახვა"
                  >
                    <Eye size={16} strokeWidth={3} />
                    <span>ნახვა</span>
                  </Link>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/quiz/${quiz.id}`,
                      );
                      alert("ლინკი დაკოპირებულია!");
                    }}
                    className="w-10 h-10 bg-brutal-yellow text-brutal-dark border-2 border-brutal-dark rounded-xl flex items-center justify-center shadow-[2px_2px_0_0_rgba(67,20,7,1)] hover:bg-yellow-400 active:translate-y-px active:shadow-none transition-all cursor-pointer"
                    title="ლინკის დაკავშირება"
                  >
                    <Link2 size={18} strokeWidth={3} />
                  </button>

                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="w-10 h-10 bg-brutal-red text-white border-2 border-brutal-dark rounded-xl flex items-center justify-center shadow-[2px_2px_0_0_rgba(67,20,7,1)] hover:bg-red-600 active:translate-y-px active:shadow-none transition-all cursor-pointer"
                    title="ტესტის წაშლა"
                  >
                    <Trash2 size={18} strokeWidth={3} />
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
