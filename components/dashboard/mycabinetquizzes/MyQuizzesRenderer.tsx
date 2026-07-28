"use client";
import Link from "next/link";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import { CiLink } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useQuizDelete from "@/hooks/Quizzes/useDeleteQuiz";
import Button from "@/components/ui/Button";

interface MyQuizzesRendererProps {
  quizzes: QuizDetailResponse[];
}

export default function MyQuizzesRenderer({ quizzes }: MyQuizzesRendererProps) {
  const { mutate: deleteQuiz, isPending } = useQuizDelete();

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
    <div className="relative w-full flex flex-col h-full">
      <div className="border-b-2 border-wood-border-focus/50 pb-5 mb-8 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-wood-text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center gap-3">
          <span className="text-3xl opacity-90 filter drop-shadow-lg">📚</span>
          ჩემი ტესტები
        </h3>
        <span className="font-mono text-xs text-wood-text-secondary uppercase tracking-[0.2em] bg-wood-surface border border-wood-border px-3 py-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
          Published // {quizzes?.length || 0}
        </span>
        <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-wood-accent/80 via-wood-border-focus/40 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        {quizzes?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center min-h-[350px] border-2 border-dashed border-wood-border/40 bg-wood-base/40 shadow-[inset_0_4px_16px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute inset-2 border border-wood-border/20 pointer-events-none"></div>
            <span className="text-5xl opacity-20 mb-5 grayscale drop-shadow-md">
              📦
            </span>
            <p className="font-serif text-lg font-bold text-wood-text-muted drop-shadow-sm">
              ტესტები ჯერ არ გამოგიქვეყნებია
            </p>
            <p className="font-mono text-[11px] text-wood-text-muted/50 mt-2 uppercase tracking-[0.2em]">
              No published quizzes yet
            </p>
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group relative bg-wood-surface border-[3px] border-wood-border p-1 shadow-[0_8px_16px_rgba(0,0,0,0.5),inset_0_1px_3px_rgba(255,255,255,0.05)] hover:border-wood-accent hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative border border-wood-border/40 p-5 flex flex-col flex-grow bg-wood-base/20">
                <div className="mb-5 flex-grow">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <h4 className="font-serif text-lg md:text-xl font-bold text-wood-text-primary group-hover:text-wood-accent transition-colors drop-shadow-md line-clamp-2 leading-snug">
                      {quiz.title || "უსათაურო ტესტი"}
                    </h4>

                    <span className="bg-wood-base px-2.5 py-1 text-[9px] font-mono font-bold text-wood-accent border border-wood-accent/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] whitespace-nowrap uppercase tracking-widest rounded-sm">
                      {quiz.quizType}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-2 top-0 bottom-0 w-[2px] bg-wood-border-focus/30"></div>
                    <p className="text-[13px] font-serif text-wood-text-secondary/90 line-clamp-3 leading-relaxed pl-3 italic">
                      {quiz.description || "აღწერა არ არის მითითებული..."}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t-2 border-wood-border/50 border-dashed flex items-end justify-between gap-2">
                  <div className="flex flex-col bg-wood-base/80 px-3 py-2 rounded-sm border border-wood-border/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-wood-text-muted mb-1">
                      კითხვები
                    </span>
                    <span className="font-serif text-base text-wood-text-primary font-bold leading-none drop-shadow-sm">
                      {quiz.questionCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/edit/${quiz.id}`}
                      className="flex items-center justify-center px-4 py-2 h-[34px] text-[10px] md:text-[11px] font-bold font-serif tracking-widest text-wood-text-primary uppercase bg-wood-surface border border-wood-border-focus shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-wood-base hover:border-wood-accent hover:text-wood-accent active:translate-y-px transition-all duration-200"
                      title="ტესტის დეტალური ნახვა"
                    >
                      ნახვა ↵
                    </Link>

                    <Button
                      icon={<CiLink size={18} />}
                      variant="outline"
                      size="sm"
                      title="ლინკის დაკავშირება"
                      className="h-[34px] w-[34px] !p-0 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:border-wood-accent"
                    />

                    <Button
                      icon={<MdDelete size={18} />}
                      variant="danger"
                      size="sm"
                      title="ტესტის წაშლა"
                      onClick={() => handleDelete(quiz.id)}
                      className="h-[34px] w-[34px] !p-0 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
