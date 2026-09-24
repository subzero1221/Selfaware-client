"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { apiClient } from "@/lib/apiClient";
import {
  StartSurveySessionDto,
  SurveySessionDto,
} from "@/types/dtos/surveySession";

export default function useStartSurveySession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (StartSurveySessionDto: StartSurveySessionDto) => {
      return apiClient<ApiResponse<SurveySessionDto>>("/surveysession", {
        method: "POST",
        body: JSON.stringify(StartSurveySessionDto),
      });
    },
    onSuccess: (data: ApiResponse<SurveySessionDto>) => {
      queryClient.invalidateQueries({
        queryKey: ["surveySession", data.data.id],
      });
      localStorage.setItem("userToken", data.data.anonymousToken);
    },
    onError: (error: any) => {
      console.error("Survey session creation error:", error);
    },
  });
}
