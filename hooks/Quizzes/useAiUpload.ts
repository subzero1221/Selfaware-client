import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "./useQuiz";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useQueryClient } from "@tanstack/react-query";

export default function useAiUpload(quizId?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => {
      const file = formData.get("file");
      console.log("Uploading AI quiz with file:", file);
      return apiClient<ApiResponse<string>>("/quiz/ai-generate", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: (data: ApiResponse<string>) => {
      queryClient.invalidateQueries({
        queryKey: ["quiz-create", quizId],
      });
      const newQuizId = data.data;
      router.push(`/dashboard/create/${newQuizId as string}`);
    },
    onError: (error: any) => {
      console.error("AI quiz upload error:", error);
    },
  });
}
