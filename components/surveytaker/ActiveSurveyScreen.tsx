"use client";

import { Target } from "lucide-react";
import Loading from "../ui/Loading";
import NeoError from "../ui/NeoError";
import useSurveySession from "@/hooks/surveySession/useSurveySession";
import SurveyQuestion from "./SurveyQuestion";
import { useEffect, useState } from "react";

export default function ActiveSurveyScreen({
  sessionId,
}: {
  sessionId: string;
}) {
  const {
    data: session,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSurveySession(sessionId);

  const [currentCount, setCurrentCount] = useState<number | null>(null);
  const [currentOrder, setCurrentOrder] = useState<number | null>(null);

  useEffect(() => {
    const item = localStorage.getItem("questionOrder");
    const parsed = Number(item);
    const initialOrder = item !== null && !isNaN(parsed) ? parsed : 0;

    const countItem = localStorage.getItem("questionCount");
    const parsedCount = Number(countItem);
    const initialCount =
      countItem !== null && !isNaN(parsedCount) ? parsedCount : 1;

    setCurrentCount(initialCount);
    setCurrentOrder(initialOrder);
  }, []);

  if (sessionLoading) {
    return <Loading />;
  }

  if (sessionError || !session) {
    return <NeoError />;
  }

  console.log("Session:", session);

  if (currentOrder === null || currentCount === null) {
    return <Loading text="აღადგენს თქვენს პროგრესს..." />;
  }

  const handleOrderChange = (nextOrder: number) => {
    setCurrentOrder(nextOrder);
    localStorage.setItem("questionOrder", nextOrder.toString());
  };

  const handleCountChange = () => {
    setCurrentCount((prev) => {
      const nextCount = (prev ?? 0) + 1;
      localStorage.setItem("questionCount", nextCount.toString());
      return nextCount;
    });
  };

  const isAllAnswered = currentCount > session.survey.quiz.questionCount;

  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-wood-text-primary flex flex-col font-sans overflow-hidden transition-colors duration-300">
      <div className="flex flex-col min-h-screen justify-between p-4 md:p-8 max-w-6xl mx-auto w-full relative z-10">
        <header className="flex justify-between items-center mb-6">
          {!isAllAnswered && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EF476F] border-4 border-wood-border text-white font-black shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2">
              <Target size={20} strokeWidth={4} />
              <span className="uppercase tracking-wider text-sm md:text-base drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">
                {currentCount} / {session.survey.quiz?.questionCount}
              </span>
            </div>
          )}

          <div className="bg-wood-surface border-4 border-wood-border px-4 py-2 rounded-xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1">
            <p className="text-wood-text-primary font-bold tracking-widest uppercase text-sm">
              PIN:{" "}
              <span className="text-[#FFD166]">{session.survey.shareCode}</span>
            </p>
          </div>
        </header>

        <SurveyQuestion
          surveyId={session.survey.id}
          surveySessionId={session.id}
          userNickName={session.nickname}
          onCountChange={handleCountChange}
          onOrderChange={handleOrderChange}
        />
      </div>
    </div>
  );
}
