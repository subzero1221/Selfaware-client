"use client";

import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../useAuth";
import { GameDto } from "@/types/dtos/game";

export default function useGameForHost(joinCode: string) {
  return useQuery({
    queryKey: [`game`, joinCode],
    queryFn: () =>
      apiClient<ApiResponse<GameDto>>(`/gamesession/${joinCode}`).then(
        (res) => res.data,
      ),
    enabled: !!joinCode,
    staleTime: Infinity,
  });
}
