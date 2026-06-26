"use client";

import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { GameDto } from "@/types/dtos/game";

export default function useGame(joinCode: string, playerId: string) {
  return useQuery({
    queryKey: [`game`, joinCode],
    queryFn: () =>
      apiClient<ApiResponse<GameDto>>(
        `/gamesession/${joinCode}/${playerId}`,
      ).then((res) => res.data),
    enabled: !!joinCode,
    staleTime: Infinity,
  });
}
