import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuizDetailResponse } from "@/types/dtos/quiz";
import { useQueryClient } from "@tanstack/react-query";

export default function useQuizPut(quizId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizData: QuizDetailResponse) => {
      return apiClient(`/quiz/${quizId}`, {
        method: "PUT",
        body: JSON.stringify(quizData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-createtion-draft"] });
    },
    onError: (error) => {
      console.error("Quiz update error:", error);
    },
  });
}
