import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuestionEditDto } from "@/types/dtos/quiz";
import { useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/hooks/useAuth";

export default function useEditQuestion(quizId: string, questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionData: QuestionEditDto) => {
      return apiClient<ApiResponse<string>>(
        `/quiz/${quizId}/questions/${questionId}`,
        {
          method: "PUT",
          body: JSON.stringify(questionData),
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`quiz-${quizId}`] });
    },
    onError: (error) => {
      console.error("Quiz update error:", error);
    },
  });
}
