import { QuizzesResponse } from "@/types/dtos/quiz";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "./useQuiz";

export default function useQuizzes(
  quizType: number | string | undefined = undefined,
) {
  return useQuery<QuizzesResponse>({
    queryKey: ["quizzes", quizType],
    queryFn: () => {
      const endpoint =
        quizType !== undefined ? `/quiz?quizType=${quizType}` : "/quiz";
      return apiClient<ApiResponse<QuizzesResponse>>(endpoint).then(
        (res) => res.data,
      );
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
