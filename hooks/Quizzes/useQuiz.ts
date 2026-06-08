"use client";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { QuizDetailResponse } from "@/types/dtos/quiz";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | Record<string, string[]> | null;
}

export function useQuiz(quizId?: string) {
  return useQuery<QuizDetailResponse>({
    queryKey: ["quiz-createtion-draft", quizId],
    queryFn: () =>
      apiClient<ApiResponse<QuizDetailResponse>>(`/quiz/${quizId}`).then(
        (res) => res.data,
      ),
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
