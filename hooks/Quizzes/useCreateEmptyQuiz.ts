import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "./useQuiz";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { QuizUploadedResponse } from "@/types/dtos/quiz";

export default function useCreateEmptyQuiz() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return apiClient<ApiResponse<QuizUploadedResponse>>("/quiz/empty", {
        method: "POST",
        // body: JSON.stringify({
        //   title: "Untitled Quiz",
        //   description: "",
        // }),
      });
    },
    onSuccess: (data: ApiResponse<QuizUploadedResponse>) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      console.log("Quiz created successfully:", data.data);
      const newQuizId = data.data.quizId;
      router.push(`/dashboard/create/${newQuizId}`);
    },
    onError: (error: any) => {
      console.error("Quiz creation error:", error);
    },
  });
}
