import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function usePutQuiz(quizId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (quizData: QuizDetailResponse) => {
      return apiClient(`/quiz/${quizId}`, {
        method: "PUT",
        body: JSON.stringify(quizData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-createtion-draft"] });
      queryClient.invalidateQueries({ queryKey: [`quizzes`] });
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Quiz update error:", error);
    },
  });
}
