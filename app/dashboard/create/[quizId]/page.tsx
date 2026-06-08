import QuizReviewLoader from "@/components/dashboard/create/QuizReviwLoader";


interface PageProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function QuizDetailPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const quizId = params.quizId;



  return <QuizReviewLoader quizId={quizId} />;
}
