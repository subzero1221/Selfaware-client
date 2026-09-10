//import QuizReviewLoader from "@/components/dashboard/create/QuizReviwLoader";
import QuizEditLoader from "@/components/dashboard/edit/QuizEditLoader";

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



  return <QuizEditLoader quizId={quizId} />;
}
