import { QuizzesResponse } from "@/types/dtos/quiz";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "./useQuiz";

export default function useQuizzes() {
  return useQuery<QuizzesResponse>({
    queryKey: ["quizzes"],
    queryFn: () =>
      apiClient<ApiResponse<QuizzesResponse>>("/quiz").then((res) => res.data),
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}
