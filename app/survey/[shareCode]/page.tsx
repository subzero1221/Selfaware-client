import ActivateSurveyPage from "@/components/surveytaker/ActivateSurveyPage";

interface PageProps {
  params: Promise<{
    shareCode: string;
  }>;
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const { shareCode } = params;
  console.log("shareCode from page", shareCode);

  return <ActivateSurveyPage shareCode={shareCode} />;
}
