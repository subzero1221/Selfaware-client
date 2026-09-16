"use client";

import { Target } from "lucide-react";
import useSurvey from "@/hooks/survey/useSurvey";
import useFirstQuestion from "@/hooks/surveySession/useFirstQuestion";
import Loading from "../ui/Loading";
import ActiveSurveyScreenMain from "./ActiveSurveyScreenMain";

export default function ActiveSurveyScreen({ surveyId }: { surveyId: string }) {
  const { data: survey, isLoading, error } = useSurvey(surveyId);
  const {
    data: question,
    isLoading: questionLoading,
    error: questionError,
  } = useFirstQuestion(surveyId);

  if (isLoading || questionLoading) {
    return <Loading />;
  }

  if (error || questionError || !survey || !question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-wood-text-primary text-lg font-bold">
          მოხდა შეცდომა მონაცემების ჩატვირთვისას. გთხოვთ სცადოთ თავიდან.
        </p>
      </div>
    );
  }

  console.log("Survey Data:", survey);
  console.log("Question Data:", question);

  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-wood-text-primary flex flex-col font-sans overflow-hidden transition-colors duration-300">
      <div className="flex flex-col min-h-screen justify-between p-4 md:p-8 max-w-6xl mx-auto w-full relative z-10">
        <header className="flex justify-between items-center mb-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EF476F] border-4 border-wood-border text-white font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2">
            <Target size={20} strokeWidth={4} />
            <span className="uppercase tracking-wider text-sm md:text-base drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">
              {question?.order || 0} / {survey?.quiz?.questionCount}
            </span>
          </div>

          <div className="bg-wood-surface border-4 border-wood-border px-4 py-2 rounded-xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1">
            <p className="text-wood-text-primary font-bold tracking-widest uppercase text-sm">
              PIN: <span className="text-[#FFD166]">{survey?.shareCode}</span>
            </p>
          </div>
        </header>

        <ActiveSurveyScreenMain question={question} surveyId={surveyId} />
      </div>
    </div>
  );
}
