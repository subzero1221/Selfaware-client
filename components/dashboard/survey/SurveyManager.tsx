"use client";

import useMySurveys from "@/hooks/survey/useMySurveys";
import ActivateSurvey from "./ActivateSurvey";
import ActiveSurveysList from "./ActiveSurveysList";
import { Sparkles, Activity } from "lucide-react";

export default function SurveyManager() {
  const { data: surveys, isLoading, isError } = useMySurveys();

  

  if (!surveys || isError) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <p className="font-black text-wood-text-secondary uppercase tracking-widest">
          აქტიური კითხვარები ვერ მოიძებნა ან მოხდა შეცდომა
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-10 border-b-4 border-wood-border pb-6 flex items-center gap-4">
        <div className="bg-brutal-blue p-3 rounded-xl border-4 border-brutal-dark shadow-[4px_4px_0_var(--color-wood-section-shadow)] -rotate-3">
          <Activity size={32} strokeWidth={3} className="text-white" />
        </div>
        <div>
          <h1 className="font-black text-3xl md:text-4xl text-wood-text-primary uppercase tracking-widest">
            კითხვარის მართვა
          </h1>
          <p className="font-bold text-wood-text-secondary mt-1">
            გააქტიურეთ ახალი სესიები და მართეთ მიმდინარე გამოკითხვები
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-16 items-start">
        <div className="w-full lg:w-1/3 xl:w-[400px] flex-shrink-0 relative group">
          <div className="absolute -top-4 -left-4 bg-brutal-yellow border-4 border-brutal-dark px-3 py-1 rounded-lg font-black text-sm uppercase tracking-wider shadow-[2px_2px_0_var(--color-brutal-dark)] rotate-[-5deg] z-10 flex items-center gap-2">
            <Sparkles size={16} strokeWidth={3} />
            ახალი სესია
          </div>

          <div className="bg-wood-surface border-4 border-wood-border rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_var(--color-wood-border)]">
            <ActivateSurvey />
          </div>
        </div>

        <div className="hidden lg:block w-1.5 self-stretch bg-wood-border rounded-full opacity-30 mx-4" />

        <div className="w-full lg:flex-1 relative">
          <div className="absolute -top-4 -left-4 md:-left-8 bg-brutal-green border-4 border-brutal-dark px-3 py-1 rounded-lg font-black text-sm uppercase tracking-wider shadow-[2px_2px_0_var(--color-brutal-dark)] rotate-[3deg] z-10">
            მიმდინარე ({surveys?.length})
          </div>

          <div className="bg-wood-surface border-4 border-wood-border rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_var(--color-wood-border)] min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-full min-h-[300px]">
                <p className="font-black text-wood-text-secondary uppercase tracking-widest animate-pulse">
                  იტვირთება...
                </p>
              </div>
            ) : (
              <ActiveSurveysList surveys={surveys} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
