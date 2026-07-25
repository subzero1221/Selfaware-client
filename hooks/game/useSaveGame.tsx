"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { apiClient } from "@/lib/apiClient";

export default function useSaveGame(joinCode: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return apiClient<ApiResponse<string>>(`/gamesession/${joinCode}`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game", joinCode] });
    },
    onError: (error: Error) => {
      console.error("Save game error:", error);
    },
  });
}
