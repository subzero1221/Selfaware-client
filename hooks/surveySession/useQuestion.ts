import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { NextQuestionResponseDto } from "@/types/dtos/surveySession";

export default function useQuestion(surveyId: string, order: number) {
  return useQuery<NextQuestionResponseDto>({
    queryKey: ["surveyQuestion", surveyId, order],
    queryFn: () => {
      const endpoint = `/surveysession/${surveyId}/question/${order}`;
      return apiClient<ApiResponse<NextQuestionResponseDto>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
