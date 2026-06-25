"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../useAuth";

interface JoinLobbyResponse {
  id: string;
  nickName: string;
  joinedAt: string;
}

export default function useJoinLobby() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: JoinLobbyDto) => {
      return apiClient<ApiResponse<JoinLobbyResponse>>(`/lobby/players`, {
        method: "POST",
        body: JSON.stringify({
          nickName: data.nickname,
          joinCode: data.joinCode,
        }),
      });
    },
    onSuccess: (response, variables) => {
      localStorage.setItem("playerToken", response.data.id);
      localStorage.setItem("playerName", response.data.nickName);
      localStorage.setItem("lobby", variables.joinCode);

      router.push(`/lobby/${variables.joinCode}`);

      queryClient.invalidateQueries({
        queryKey: ["lobby", "current"],
      });
    },
    onError: (error: any) => {
      console.error("Join lobby error:", error);
    },
  });
}
