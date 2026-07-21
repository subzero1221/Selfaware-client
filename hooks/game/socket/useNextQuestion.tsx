"use client";

import { useEffect } from "react";
import { ensureConnected, getSignalRConnection } from "@/lib/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { GameDto } from "@/types/dtos/game";

export default function useNextQuestion(
  joinCode: string,
  playerId?: string | null,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!joinCode) return;

    const connection = getSignalRConnection("http://localhost:5027/game");

    const handleNextQuestion = (game: GameDto) => {
      queryClient.setQueryData<GameDto>(["game", joinCode], game);
    };

    const handleNextQuestionFail = (errorMessage: string) => {
      alert(`Error during next question: ${errorMessage}`);
    };

    connection.on("NextQuestion", handleNextQuestion);
    connection.on("NextQuestionFail", handleNextQuestionFail);

    ensureConnected("http://localhost:5027/game", joinCode).catch(
      console.error,
    );

    return () => {
      connection.off("NextQuestion", handleNextQuestion);
      connection.off("NextQuestionFail", handleNextQuestionFail);
    };
  }, [joinCode, playerId, queryClient]);

  return {
    sendNextQuestionSignal: async () => {
      try {
        const conn = getSignalRConnection("http://localhost:5027/game");
        await conn.invoke("NextQuestion", joinCode, playerId);
      } catch (err) {
        console.error("Failed to invoke NextQuestion", err);
      }
    },
  };
}
