import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuestionDto, CreateQuestionDto } from "@/types/dtos/quiz";
import { ApiResponse } from "./useQuiz";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateQuestion(quizId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newQuestion: CreateQuestionDto) => {
      const res = await apiClient<ApiResponse<QuestionDto>>(
        `/quiz/${quizId}/questions`,
        {
          method: "POST",
          body: JSON.stringify(newQuestion),
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`quiz-${quizId}`],
      });
    },
  });
}
