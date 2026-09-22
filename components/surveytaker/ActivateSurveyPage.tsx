"use client";

import useSurvey from "@/hooks/survey/useSurvey";
import Loading from "../ui/Loading";
import NeoError from "../ui/NeoError";
import StartSurveyScreen from "./StartSurveyScreen";

export default function ActivateSurveyPage({
  shareCode,
}: {
  shareCode: string;
}) {
  const { data: survey, isLoading, error: surveyError } = useSurvey(shareCode);

  if (isLoading) {
    return <Loading />;
  }

  if (!survey || surveyError) {
    return <NeoError />;
  }

  console.log(survey);
  return (
    <StartSurveyScreen
      surveyTitle="მომხმარებელთა გამოკითხვა"
      surveyId={survey.id}
      shareCode={shareCode}
    />
  );
}
