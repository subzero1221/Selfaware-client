import SurveyPage from "@/components/surveytaker/SurveyPage";

interface PageProps {
  params: Promise<{
    shareCode: string;
  }>;
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const { shareCode } = params;

  return <SurveyPage shareCode={shareCode} />;
}
