"use client";

import { useState } from "react";
import SurveyStartScreen from "./StartSurveyScreen";
import ActiveSurveyScreen from "./ActiveSurveyScreen";

export default function SurveyPage({ surveyId }: { surveyId: string }) {
  const [sessionState, setSessionState] = useState<"idle" | "active">("idle");
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleStartSession = async (nickname: string | null) => {
    setSessionState("active");
  };

  if (sessionState === "idle") {
    return (
      <SurveyStartScreen
        surveyTitle="მომხმარებელთა გამოკითხვა"
        onStartSession={handleStartSession}
      />
    );
  }

  return (
    <ActiveSurveyScreen
    //question={currentQuestion}
    />
  );
}
