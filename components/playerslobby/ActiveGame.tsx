"use client";
import { useParams, useRouter } from "next/navigation";
import ActiveGameScreen from "./ActiveGameScreen";
import useGame from "@/hooks/game/useGame";

export default function ActiveGame() {
  const router = useRouter();
  const params = useParams();
  const joinCode = params.id as string;
  const playerId = params.playerId as string;
  console.log("Game:", joinCode, playerId);

  const { data: game, isLoading } = useGame(joinCode, playerId);

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

  return <ActiveGameScreen game={game} />;
}
