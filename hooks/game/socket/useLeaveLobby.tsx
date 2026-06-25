"use client";
import { useEffect } from "react";
import { ensureConnected, getSignalRConnection } from "@/lib/signalr";
import { useRouter } from "next/navigation";

export default function useLeaveLobby(joinCode: string, playerId: string) {
  const router = useRouter();

  useEffect(() => {
    const connection = getSignalRConnection("http://localhost:5027/game");

    const handleUpdate = () => {
      router.push("/");
      localStorage.removeItem("playerToken");
      localStorage.removeItem("playerName");
      localStorage.removeItem("lobby");
    };

    connection.on("LeaveLobby", handleUpdate);

    ensureConnected("http://localhost:5027/game")
      .then((conn) => {
        conn.invoke("JoinLobby", joinCode);
      })
      .catch(console.error);

    return () => {
      connection.off("LeaveLobby", handleUpdate);
    };
  }, []);

  return {
    sendLeaveSignal: async () => {
      const conn = getSignalRConnection("http://localhost:5027/game");
      await conn.invoke("LeaveLobby", playerId, joinCode);
    },
  };
}
