"use client";

import { useEffect } from "react";
import { ensureConnected, getSignalRConnection } from "@/lib/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { GameDto } from "@/types/dtos/game";

export default function useShowLeaderBoard(
  joinCode: string,
  playerId?: string | null,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!joinCode) return;

    const connection = getSignalRConnection("http://localhost:5027/game");

    const handleShowLeaderBoard = (game: GameDto) => {
      queryClient.setQueryData<GameDto>(["game", joinCode], game);
    };

    const handleShowLeaderBoardFail = (errorMessage: string) => {
      alert(`Error during leaderboard: ${errorMessage}`);
    };

    connection.on("ShowLeaderBoard", handleShowLeaderBoard);
    connection.on("ShowLeaderBoardFail", handleShowLeaderBoardFail);

    ensureConnected("http://localhost:5027/game", joinCode).catch(
      console.error,
    );

    return () => {
      connection.off("ShowLeaderBoard", handleShowLeaderBoard);
      connection.off("ShowLeaderBoardFail", handleShowLeaderBoardFail);
    };
  }, [joinCode, playerId, queryClient]);

  return {
    sendShowLeaderBoardSignal: async () => {
      try {
        const conn = getSignalRConnection("http://localhost:5027/game");
        await conn.invoke("ShowLeaderBoard", joinCode, playerId);
      } catch (err) {
        console.error("Failed to invoke ShowLeaderBoard", err);
      }
    },
  };
}
