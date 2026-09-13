"use client";

import { useState } from "react";
import { Users, Check, Copy, Clock, Power } from "lucide-react";
import { ActiveSurveyDto } from "@/types/dtos/survey";
import CountdownTimer from "./CountDownTimer";
import useDeactivateSurvey from "@/hooks/survey/useDeactivateSurvey";

interface ActiveSurveysListProps {
  surveys: ActiveSurveyDto[];
}




export default function ActiveSurveysList({
  surveys,
}: ActiveSurveysListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const {mutate: deactivateSurvey, isPending} = useDeactivateSurvey();

  const handleCopyLink = (shareCode: string, id: string) => {
    const url = `${window.location.origin}/survey/${shareCode}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!surveys || surveys.length === 0) {
    return (
      <div className="text-center p-8 bg-brutal-yellow border-4 border-wood-border rounded-2xl shadow-[4px_4px_0_var(--color-wood-section-shadow)]">
        <p className="font-black text-wood-text-primary text-lg uppercase tracking-wider">
          აქტიური კითხვარები არ მოიძებნა
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-wood-surface gap-6 w-full max-w-2xl mx-auto font-sans">
      <h2 className="font-black text-2xl text-wood-text-primary uppercase tracking-wider mb-2 -rotate-1">
        აქტიური კითხვარები
      </h2>

      {surveys.map((survey, index) => {
        const rotationClass = index % 2 === 0 ? "rotate-1" : "-rotate-1";

        return (
          <div
            key={survey.surveyId}
            className={`relative flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-wood-surface border-4 border-brutal-dark rounded-2xl p-5 shadow-[6px_6px_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-wood-section-shadow)] transition-all ${rotationClass}`}
          >
          
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brutal-green text-brutal-dark font-black text-xs px-2 py-1 rounded-md border-2 border-brutal-dark uppercase tracking-wider shadow-[2px_2px_0_var(--color-brutal-dark)]">
                  Active
                </span>
                <span className="text-sm font-bold text-wood-text-secondary">
                  კითხვები: {survey.quiz.questionCount}
                </span>
              </div>

              <h3 className="font-black text-xl text-wood-text-primary">
                {survey.quiz.title || "უსათაურო კითხვარი"}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-wood-text-secondary font-bold text-sm mt-1">
                <div className="flex items-center gap-1.5">
                  <Users size={16} strokeWidth={2.5} />
                  <span>შევსებულია {survey.completedBy}</span>
                </div>

                {survey.expiresAt && (
                  <div className="flex items-center gap-1.5 bg-brutal-yellow/30 px-2 py-0.5 rounded-lg border-2 border-brutal-dark/20 text-wood-text-primary">
                    <Clock size={16} strokeWidth={2.5} />
                    <CountdownTimer expirationDate={survey.expiresAt} />
                  </div>
                )}
              </div>
            </div>

   
            <div className="flex flex-col text-wood-text-secondary items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
              <div className="bg-white border-4 border-brutal-dark rounded-xl px-4 py-2 shadow-[4px_4px_0_var(--color-brutal-dark)] font-black text-lg tracking-widest uppercase">
                {survey.shareCode}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() =>
                    handleCopyLink(survey.shareCode, survey.surveyId)
                  }
                  className={`
                    flex-1 md:flex-none flex items-center justify-center cursor-pointer gap-2 px-4 py-2 border-4 border-brutal-dark rounded-xl font-black uppercase text-sm tracking-wider shadow-[4px_4px_0_var(--color-wood-section-shadow)] active:translate-y-[4px] active:shadow-[0px_0px_0_var(--color-wood-section-shadow)] transition-all
                    ${
                      copiedId === survey.surveyId
                        ? "bg-brutal-yellow text-brutal-dark"
                        : "bg-brutal-blue text-white hover:bg-brutal-red"
                    }
                  `}
                >
                  {copiedId === survey.surveyId ? (
                    <>
                      <Check size={18} strokeWidth={3} /> კოპირებულია
                    </>
                  ) : (
                    <>
                      <Copy size={18} strokeWidth={3} /> ბმული
                    </>
                  )}
                </button>

             
                <button
                  onClick={() => deactivateSurvey(survey.surveyId)}
                  title="სესიის დეაქტივაცია"
                  className="flex items-center justify-center cursor-pointer p-2 bg-brutal-red text-white border-4 border-brutal-dark rounded-xl font-black shadow-[4px_4px_0_var(--color-wood-section-shadow)] hover:brightness-110 active:translate-y-[4px] active:shadow-[0px_0px_0_var(--color-wood-section-shadow)] transition-all"
                >
                  <Power size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
