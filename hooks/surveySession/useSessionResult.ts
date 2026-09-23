import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { SurveySessionResultDto } from "@/types/dtos/surveySession";

export default function useSessionResult(surveySessionId: string) {
  return useQuery<SurveySessionResultDto>({
    queryKey: ["surveySessionResult", surveySessionId],
    queryFn: () => {
      const endpoint = `/surveysession/${surveySessionId}/result`;
      return apiClient<ApiResponse<SurveySessionResultDto>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
