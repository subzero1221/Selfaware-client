"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { apiClient } from "@/lib/apiClient";

export default function useCreateLobby() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return apiClient<ApiResponse<string>>("/lobby", {
        method: "POST",
      });
    },
    onSuccess: (data: ApiResponse<string>) => {
      queryClient.invalidateQueries({queryKey : ["lobby", "current"]})
    },
    onError: (error: any) => {
      console.error("Quiz creation error:", error);
    },
  });
}
