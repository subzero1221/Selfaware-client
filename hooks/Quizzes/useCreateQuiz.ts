import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "./useQuiz";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { QuizUploadedResponse, CreateQuizDto } from "@/types/dtos/quiz";

export default function useCreateQuiz() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (CreateQuizDto: CreateQuizDto) => {
      return apiClient<ApiResponse<QuizUploadedResponse>>("/quiz", {
        method: "POST",
        body: JSON.stringify(CreateQuizDto),
      });
    },
    onSuccess: (data: ApiResponse<QuizUploadedResponse>) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      const newQuizId = data.data.id;
      router.push(`/dashboard/create/${newQuizId}`);
    },
    onError: (error: any) => {
      console.error("Quiz creation error:", error);
    },
  });
}
