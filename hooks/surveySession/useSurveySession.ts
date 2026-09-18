import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { SurveySessionDto } from "@/types/dtos/surveySession";

export default function useSurveySession(sessionId: string) {
  return useQuery<SurveySessionDto>({
    queryKey: ["SurveySession", sessionId],
    queryFn: () => {
      const endpoint = `/surveysession/${sessionId}`;
      console.log("survey share code:", sessionId);
      return apiClient<ApiResponse<SurveySessionDto>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
