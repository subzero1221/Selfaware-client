import ActiveSurveyScreen from "@/components/surveytaker/ActiveSurveyScreen";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function ActiveSurveyPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const { sessionId } = params;
  console.log("shareCode from page", sessionId);

  return <ActiveSurveyScreen sessionId={sessionId} />;
}
