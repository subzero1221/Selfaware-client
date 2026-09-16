"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { apiClient } from "@/lib/apiClient";
import {
  SubmitSurveyAnswerDto,
  UserAnswerDto,
} from "@/types/dtos/surveySession";

export default function useSubmitAnswer(shareCode: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (SubmitSurveyAnswerDto: SubmitSurveyAnswerDto) => {
      return apiClient<ApiResponse<UserAnswerDto>>("/surveysession/answer", {
        method: "POST",
        body: JSON.stringify(SubmitSurveyAnswerDto),
      });
    },
    onSuccess: (data: ApiResponse<UserAnswerDto>) => {
      queryClient.invalidateQueries({
        queryKey: ["surveyQuestion", shareCode],
      });
    },
    onError: (error: any) => {
      console.error("Survey session creation error:", error);
    },
  });
}
