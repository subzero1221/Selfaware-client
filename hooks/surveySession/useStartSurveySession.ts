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
    mutationFn: (startSurveySessionDto: StartSurveySessionDto) => {
      return apiClient<ApiResponse<SurveySessionDto>>("/surveySession", {
        method: "POST",
        body: JSON.stringify(startSurveySessionDto),
      });
    },
    onSuccess: (data: ApiResponse<SurveySessionDto>) => {
      queryClient.invalidateQueries({
        queryKey: ["surveySession", data.data.Id],
      });
    },
    onError: (error: any) => {
      console.error("Survey session creation error:", error);
    },
  });
}
