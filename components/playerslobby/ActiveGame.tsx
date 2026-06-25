"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSignalRConnection } from "@/lib/signalr";
import { useEffect } from "react";
import { GameDto } from "@/types/dtos/game";
import ActiveGameScreen from "./ActiveGameScreen";

export default function ActiveGame() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const joinCode = params.joinCode as string;

  const { data: game, isLoading } = useQuery<GameDto>({
    queryKey: ["game", joinCode],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5027/api/game/${joinCode}`);
      if (!res.ok) throw new Error("თამაში ვერ მოიძებნა");
      return res.json();
    },
    enabled: !!joinCode,
    staleTime: Infinity,
  });


  useEffect(() => {
    if (!joinCode) return;
    const connection = getSignalRConnection("http://localhost:5027/game");


    const handleGameStateChanged = (updatedGame: GameDto) => {

      queryClient.setQueryData(["game", joinCode], updatedGame);
    };

    connection.on("GameStateChanged", handleGameStateChanged);

    return () => {
      connection.off("GameStateChanged", handleGameStateChanged);
    };
  }, [joinCode]);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-wood-base text-wood-text-muted">
        <p className="animate-pulse text-lg">თამაში იტვირთება...</p>
      </div>
    );
  }


  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-wood-base text-white">
        <p className="text-xl font-bold mb-4">
          ხარვეზი: თამაშის მონაცემები ცარიელია
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-wood-surface rounded-xl"
        >
          მთავარზე დაბრუნება
        </button>
      </div>
    );
  }


  const handleSelectOption = async (optionId: string) => {
    console.log(`Player submitted option: ${optionId}`);
    const connection = getSignalRConnection("http://localhost:5027/game");
    await connection.invoke("SubmitAnswer", joinCode, optionId);
  };


  return <ActiveGameScreen game={game} onSelectOption={handleSelectOption} />;
}
