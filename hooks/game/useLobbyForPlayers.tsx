"use client";

import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";

export default function useLobbyForPlayers(joinCode: string, playerId: string) {
  return useQuery({
    queryKey: [`lobby`, "current"],
    queryFn: () =>
      apiClient<ApiResponse<LobbyDto>>(`/lobby/${joinCode}/${playerId}`).then(
        (res) => res.data,
      ),
    refetchInterval: 1000*60,
    refetchIntervalInBackground: true,
  });
}
