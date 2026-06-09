import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuizUpdateFieldDto } from "@/types/dtos/quiz";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useQuizUpdate(quizId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (quizData: QuizUpdateFieldDto) => {
      return apiClient(`/quiz/${quizId}`, {
        method: "PATCH",
        body: JSON.stringify(quizData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`quiz-${quizId}`] });
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Quiz update error:", error);
    },
  });
}
