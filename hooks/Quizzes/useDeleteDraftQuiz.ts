import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//კაროჩე შემთხვევით რაღაც მომენტში კლეო გადაწერე ქუიზის მთლიანი წაშლა, ქუიზიდან კითხვის წაშლით ამიტომ ახლა 
// ეს შლის დრაფტსსაც და ეს შლის მთლიან ქუიზსაც, იგივე კომენტარს ვადებ useQuizDeletes. kleo
export default function useDeleteDraftQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizId: string) =>
      apiClient<ApiResponse<string>>(`/quiz/${quizId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`quizzes`] });
    },
    onError: (error) => {
      console.error("Quiz deletion error:", error);
    },
  });
}
