"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { apiClient } from "@/lib/apiClient";
import { ActiveSurveyDto, ActivateSurveyDto } from "@/types/dtos/survey";

export default function useActivateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activateSurveyDto: ActivateSurveyDto) => {
      return apiClient<ApiResponse<ActiveSurveyDto>>(`/survey`, {
        method: "POST",
        body: JSON.stringify(activateSurveyDto),
      });
    },
    onSuccess: (data: ApiResponse<ActiveSurveyDto>) => {
      queryClient.invalidateQueries({
        queryKey: [`mySurveys`],
      });
    },
    onError: (error: any) => {
      console.error("Quiz creation error:", error);
    },
  });
}
