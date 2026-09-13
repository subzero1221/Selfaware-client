"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { apiClient } from "@/lib/apiClient";
import { ActiveSurveyDto } from "@/types/dtos/survey";

export default function useDeactivateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (surveyId: string) => {
      return apiClient<ApiResponse<ActiveSurveyDto>>(`/survey/${surveyId}`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySurveys"],
      });
    },
    onError: (error: any) => {
      console.error("Quiz creation error:", error);
    },
  });
}
