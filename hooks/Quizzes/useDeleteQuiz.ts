import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useQuizDelete(quizId: string, questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<ApiResponse<string>>(
        `/quiz/${quizId}/questions/${questionId}`,
        {
          method: "DELETE",
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`quiz-${quizId}`] });
    },
    onError: (error) => {
      console.error("Quiz deletion error:", error);
    },
  });
}
