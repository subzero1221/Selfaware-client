"use client";
import SurveyStartScreen from "./StartSurveyScreen";

export default function ActivateSurveyPage({
  shareCode,
}: {
  shareCode: string;
}) {
  return (
    <SurveyStartScreen
      surveyTitle="მომხმარებელთა გამოკითხვა"
      shareCode={shareCode}
    />
  );
}
