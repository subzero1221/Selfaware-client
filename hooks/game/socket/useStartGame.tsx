"use client";
import { useEffect, useState } from "react";
import { ensureConnected, getSignalRConnection } from "@/lib/signalr";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { GameDto } from "@/types/dtos/game";

export default function useStartGame(
  joinCode: string,
  hostId: string,
  quizId: string,
) {
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    const connection = getSignalRConnection("http://localhost:5027/game");

    const handleGameStart = (game: GameDto, joinCode: string) => {
      console.log(game);
      queryClient.setQueryData(["game", joinCode], game);
      router.push(`/game/${joinCode}`);
    };

    const handleStartGameFail = (errorMessage: string) => {
      alert(`Error starting game: ${errorMessage}`);
      setIsStarting(false);
    };

    connection.on("StartGame", handleGameStart);
    connection.on("StartGameFail", handleStartGameFail);

    ensureConnected("http://localhost:5027/game")
      .then((conn) => {
        conn.invoke("JoinLobby", joinCode);
      })
      .catch(console.error);

    return () => {
      connection.off("StartGame", handleGameStart);
      connection.off("StartGameFail", handleStartGameFail);
    };
  }, [joinCode, hostId, quizId, queryClient, router]);

  return {
    isStarting,
    sendStartGameSignal: async () => {
      try {
        setIsStarting(true);
        const conn = getSignalRConnection("http://localhost:5027/game");
        await conn.invoke("StartGame", joinCode, hostId, quizId);
      } catch (err) {
        console.error("Failed to invoke StartGame", err);
        setIsStarting(false);
      }
    },
  };
}
