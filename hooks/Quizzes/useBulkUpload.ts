import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "./useQuiz";
import { QuizUploadedResponse } from "@/types/dtos/quiz";

export default function useBulkUpload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return apiClient<ApiResponse<QuizUploadedResponse>>("/quiz/bulk-create", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error: any) => {
      console.error("Bulk quiz upload error:", error);
    },
  });
}
