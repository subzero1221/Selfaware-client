"use client";

import { useEffect } from "react";
import { ensureConnected, getSignalRConnection } from "@/lib/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { GameDto, GamePlayerDto } from "@/types/dtos/game";

export default function useSubmitAnswer(
  joinCode: string,
  playerId: string,
  questionId: string,
) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!joinCode) return;

    const connection = getSignalRConnection("http://localhost:5027/game");

    const handleSubmitAnswer = (updatedPlayer: GamePlayerDto) => {
      queryClient.setQueryData<GameDto>(["game", joinCode], (oldGame) => {
        if (!oldGame) return oldGame;

        const updatedPlayers = oldGame.players.map((player) => {
          if (player.playerId === updatedPlayer.playerId) {
            return {
              ...player,
              state: updatedPlayer.state,
              score: updatedPlayer.score,
              streak: updatedPlayer.streak,
            };
          }
          return player;
        });
        return {
          ...oldGame,
          players: updatedPlayers,
        };
      });
    };

    const handleSubmitAnswerFail = (errorMessage: string) => {
      alert(`Error starting game: ${errorMessage}`);
    };

    connection.on("SubmitAnswer", handleSubmitAnswer);
    connection.on("SubmitAnswerFail", handleSubmitAnswerFail);

    ensureConnected("http://localhost:5027/game").catch(console.error);

    return () => {
      connection.off("SubmitAnswer", handleSubmitAnswer);
      connection.off("SubmitAnswerFail", handleSubmitAnswerFail);
    };
  }, [joinCode, playerId, questionId, queryClient]);

  return {
    sendSubmitAnswerSignal: async (optionId: string) => {
      try {
        const conn = getSignalRConnection("http://localhost:5027/game");
        await conn.invoke("SubmitAnswer", {
          joinCode: joinCode,
          playerId: playerId,
          questionId: questionId,
          optionId: optionId,
        });
      } catch (err) {
        console.error("Failed to invoke StartGame", err);
      }
    },
  };
}
