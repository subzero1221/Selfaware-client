import SurveyPage from "@/components/surveytaker/SurveyPage";

interface PageProps {
  params: Promise<{
    surveyId: string;
  }>;
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const { surveyId } = params;

  return <SurveyPage surveyId={surveyId} />;
}
