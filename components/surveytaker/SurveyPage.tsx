"use client";

import { useState } from "react";
import SurveyStartScreen from "./StartSurveyScreen";
import ActiveSurveyScreen from "./ActiveSurveyScreen";

export default function SurveyPage({ surveyId }: { surveyId: string }) {
  const [sessionState, setSessionState] = useState<"idle" | "active">("idle");

  if (sessionState === "idle") {
    return <SurveyStartScreen surveyTitle="მომხმარებელთა გამოკითხვა" surveyId={surveyId} setSessionState={setSessionState} />;
  }

  return <ActiveSurveyScreen surveyId={surveyId} />;
}
