import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ensureConnected, getSignalRConnection } from "@/lib/signalr";

export default function useIsReady(joinCode: string, playerId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = getSignalRConnection("http://localhost:5027/game");

    const handleUpdate = () => {
      console.log("invalidating query");
      queryClient.invalidateQueries({ queryKey: ["lobby", "current"] });
    };

    connection.on("PlayerIsReady", handleUpdate);
    connection.on("PlayerIsNotReady", handleUpdate);

    ensureConnected("http://localhost:5027/game")
      .then((conn) => {
        conn.invoke("JoinLobby", joinCode);
      })
      .catch(console.error);

    return () => {
      connection.off("PlayerIsReady", handleUpdate);
      connection.off("PlayerIsNotReady", handleUpdate);
    };
  }, [queryClient]);

  return {
    sendReadySignal: async () => {
      const conn = getSignalRConnection("http://localhost:5027/game");
      await conn.invoke("PlayerIsReady", playerId, joinCode);
    },
    sendNotReadySignal: async () => {
      const conn = getSignalRConnection("http://localhost:5027/game");
      await conn.invoke("PlayerIsNotReady", playerId, joinCode);
    },
  };
}
