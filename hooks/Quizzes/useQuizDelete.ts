import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useQuizDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizId: string) =>
      apiClient<ApiResponse<string>>(`/quiz/${quizId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error) => {
      console.error("Quiz deletion error:", error);
    },
  });
}
