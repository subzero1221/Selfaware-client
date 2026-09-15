import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { SurveysResponse } from "@/types/dtos/survey";

export default function useMySurveys() {
  return useQuery<SurveysResponse>({
    queryKey: ["mySurveys"],
    queryFn: () => {
      const endpoint = `/survey`;
     
      return apiClient<ApiResponse<SurveysResponse>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
