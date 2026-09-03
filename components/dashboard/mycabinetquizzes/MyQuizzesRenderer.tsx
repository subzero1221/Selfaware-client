"use client";

import { useState } from "react";
import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import useDeleteDraftQuiz from "@/hooks/Quizzes/useDeleteDraftQuiz";
import {
  BookOpen,
  Link2,
  Trash2,
  PackageOpen,
  Eye,
  Filter,
  Zap,
  BarChart2,
} from "lucide-react";

type FilterMode = "ALL" | "Knowledge" | "Survey";

interface MyQuizzesRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizzesRenderer({ quizzes }: MyQuizzesRendererProps) {
  const [activeFilter, setActiveFilter] = useState<FilterMode>("ALL");
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


  const filteredQuizzes = quizzes?.filter((quiz) => {
    if (activeFilter === "ALL") return true;

    const quizTypeStr = String(quiz.quizType).toLowerCase();
    if (activeFilter === "Knowledge") {
      return quizTypeStr === "knowledge" || quizTypeStr === "0";
    }
    if (activeFilter === "Survey") {
      return quizTypeStr === "survey" || quizTypeStr === "1";
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col font-sans">
      <div className="border-b-4 border-brutal-dark pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-3xl font-black tracking-tight text-wood-text-primary flex items-center gap-3">
          <BookOpen size={32} strokeWidth={3} className="text-brutal-green" />
          ტესტები / გამოკითხვები
        </h3>
        <span className="bg-brutal-green border-2 border-brutal-dark text-brutal-dark font-black text-xs px-4 py-1.5 rounded-xl shadow-[3px_3px_0_0_rgba(67,20,7,1)] uppercase">
          გამოქვეყნებული: {filteredQuizzes?.length || 0}
        </span>
      </div>


      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`flex items-center gap-2 px-5 py-2.5 font-black text-xs md:text-sm uppercase tracking-wider rounded-xl border-4 border-brutal-dark transition-all cursor-pointer ${
            activeFilter === "ALL"
              ? "bg-brutal-yellow text-brutal-dark shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1 translate-y-[-2px]"
              : "bg-gray-50 text-brutal-dark/50 shadow-[2px_2px_0_0_var(--color-brutal-dark)] hover:bg-gray-100 hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:text-brutal-dark"
          }`}
        >
          <Filter size={18} strokeWidth={3} />
          ყველა ({quizzes?.length || 0})
        </button>

        <button
          onClick={() => setActiveFilter("Knowledge")}
          className={`flex items-center gap-2 px-5 py-2.5 font-black text-xs md:text-sm uppercase tracking-wider rounded-xl border-4 border-brutal-dark transition-all cursor-pointer ${
            activeFilter === "Knowledge"
              ? "bg-brutal-blue text-wood-text-primary shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1 translate-y-[-2px]"
              : "bg-gray-50 text-brutal-dark/50 shadow-[2px_2px_0_0_var(--color-brutal-dark)] hover:bg-gray-100 hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:text-brutal-dark"
          }`}
        >
          <Zap size={18} strokeWidth={3} />
          ქვიზები
        </button>

        <button
          onClick={() => setActiveFilter("Survey")}
          className={`flex items-center gap-2 px-5 py-2.5 font-black text-xs md:text-sm uppercase tracking-wider rounded-xl border-4 border-brutal-dark transition-all cursor-pointer ${
            activeFilter === "Survey"
              ? "bg-brutal-green text-brutal-dark shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1 translate-y-[-2px]"
              : "bg-gray-50 text-brutal-dark/50 shadow-[2px_2px_0_0_var(--color-brutal-dark)] hover:bg-gray-100 hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:text-brutal-dark"
          }`}
        >
          <BarChart2 size={18} strokeWidth={3} />
          გამოკითხვები
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuizzes?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center min-h-[350px] border-4 border-dashed border-brutal-dark rounded-3xl bg-wood-surface/50 p-8 text-center rotate-1 shadow-[4px_4px_0_0_var(--color-brutal-dark)] transition-all">
            <PackageOpen
              size={64}
              strokeWidth={2}
              className="text-brutal-dark mb-4 opacity-50"
            />
            <p className="font-black text-xl text-brutal-dark">
              ჩანაწერები არ მოიძებნა
            </p>
            <p className="font-bold text-xs text-brutal-dark mt-2 uppercase tracking-widest bg-brutal-yellow px-3 py-1 rounded-lg border-2 border-brutal-dark -rotate-1">
              No items match this filter
            </p>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group bg-wood-surface border-4 border-brutal-dark rounded-3xl p-6 shadow-[6px_6px_0_0_rgba(67,20,7,1)] hover:shadow-[8px_8px_0_0_var(--color-wood-section-shadow)] transition-all duration-200 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4 gap-3">
                  <h4 className="text-xl font-black text-wood-text-secondary line-clamp-2 leading-tight">
                    {quiz.title || "უსათაურო ტესტი"}
                  </h4>

                  <span
                    className={`shrink-0 font-black text-[10px] uppercase border-2 border-brutal-dark px-2.5 py-1 rounded-lg shadow-[2px_2px_0_0_rgba(67,20,7,1)] rotate-1 ${String(quiz.quizType).toLowerCase() === "survey" || String(quiz.quizType) === "1" ? "bg-brutal-green text-brutal-dark" : "bg-brutal-yellow text-brutal-dark"}`}
                  >
                    {quiz.quizType || "Quiz"}
                  </span>
                </div>

                <p className="text-sm font-bold text-wood-text-secondary line-clamp-3 leading-relaxed italic mb-6">
                  {quiz.description || "აღწერა არ არის მითითებული..."}
                </p>
              </div>

              <div className="pt-4 border-t-4 border-brutal-dark flex items-center justify-between gap-2">
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
