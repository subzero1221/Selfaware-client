"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/hooks/useAuth";

import { QuizEditSettingsDto } from "@/types/dtos/quiz";

export function useEditQuiz(quizId: string) {
  const queryClient = useQueryClient();

  const editQuizSettingsMutation = useMutation({
    mutationFn: (data: QuizEditSettingsDto) =>
      apiClient<ApiResponse<string>>(`/quiz/${quizId}/settings`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`quiz-${quizId}`] });
    },
  });

  return {
    editSettings: editQuizSettingsMutation.mutate,
    isEditingSettings: editQuizSettingsMutation.isPending,
    editSettingsError: editQuizSettingsMutation.error,
  };
}
