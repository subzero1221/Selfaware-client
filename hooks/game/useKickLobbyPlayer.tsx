"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";

export default function useKickLobbyPlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: KickLobbyPlayerDto) => {
      return apiClient<ApiResponse<string>>(`/lobby/players`, {
        method: "DELETE",
        body: JSON.stringify({
          Id: data.id,
          joinCode: data.joinCode,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lobby", "current"],
      });
    },
    onError: (error: any) => {
      console.error("Join lobby error:", error);
    },
  });
}
