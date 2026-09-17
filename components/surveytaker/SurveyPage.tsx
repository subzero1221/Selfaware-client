"use client";

import { useState, useEffect } from "react";
import SurveyStartScreen from "./StartSurveyScreen";
import ActiveSurveyScreen from "./ActiveSurveyScreen";

export default function SurveyPage({ shareCode }: { shareCode: string }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
    setIsCheckingStorage(false);
  }, []);

  if (isCheckingStorage) {
    return null;
  }

  if (!userToken) {
    return (
      <SurveyStartScreen
        surveyTitle="მომხმარებელთა გამოკითხვა"
        shareCode={shareCode}
        onSessionCreated={(token) => setUserToken(token)}
      />
    );
  }

  return <ActiveSurveyScreen surveyId={surveyId} />;
}
