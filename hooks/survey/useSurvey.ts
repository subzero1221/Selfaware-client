import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { ActiveSurveyDto } from "@/types/dtos/survey";

export default function useSurvey(shareCode: string) {
  return useQuery<ActiveSurveyDto>({
    queryKey: ["Survey", shareCode],
    queryFn: () => {
      const endpoint = `/survey/${shareCode}`;
      console.log("survey share code:", shareCode);
      return apiClient<ApiResponse<ActiveSurveyDto>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
