import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { QuestionResultDto } from "@/types/dtos/surveySession";

export default function useFirstQuestion(surveyId: string) {
  return useQuery<QuestionResultDto>({
    queryKey: ["surveyQuestion", surveyId],
    queryFn: () => {
      const endpoint = `/surveysession/question/${surveyId}`;
      return apiClient<ApiResponse<QuestionResultDto>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
