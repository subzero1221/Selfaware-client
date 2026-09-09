import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//კაროჩე შემთხვევით რაღაც მომენტში კლეო გადაწერე ქუიზის მთლიანი წაშლა, ქუიზიდან კითხვის წაშლით ამიტომ ახლა
// ეს შლის დრაფტსსაც და ეს შლის მთლიან ქუიზსაც, იგივე კომენტარს ვადებ useQuizDeletes. kleo

export default function useDeleteQuestion(quizId: string, questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<ApiResponse<string>>(
        `/quiz/${quizId}/questions/${questionId}`,
        {
          method: "DELETE",
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`quiz-${quizId}`] });
    },
    onError: (error) => {
      console.error("Quiz deletion error:", error);
    },
  });
}
