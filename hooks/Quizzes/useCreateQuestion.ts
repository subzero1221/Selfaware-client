import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QuestionDto, CreateQuestionDto } from "@/types/dtos/quiz";
import { ApiResponse } from "./useQuiz";

export default function useCreateQuestion(quizId: string) {
  return useMutation({
    mutationFn: async (newQuestion: CreateQuestionDto) => {
      const response = await apiClient<ApiResponse<QuestionDto>>(
        `/quiz/${quizId}/questions`,
        {
          method: "POST",
          body: JSON.stringify(newQuestion),
        },
      );
      return response.data;
    },
  });
}
