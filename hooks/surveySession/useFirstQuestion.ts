import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { QuestionDto } from "@/types/dtos/quiz";

export default function useFirstQuestion(shareCode: string) {
  return useQuery<QuestionDto>({
    queryKey: ["surveyQuestion", shareCode],
    queryFn: () => {
      const endpoint = `/surveysession/question/${shareCode}`;
      return apiClient<ApiResponse<QuestionDto>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
