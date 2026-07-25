"use client";
import useGame from "@/hooks/game/useGame";
import { useRouter, useParams } from "next/navigation";
import ActiveGameScreen from "./ActiveGameScreen";
import GameLeaderboard from "./GameLeaderboard";
import FinishedGame from "./FinishedGame";

export default function ActiveGame() {
  const router = useRouter();
  const params = useParams();
  const joinCode = params.id as string;
  const playerId = params.playerId as string;

  const { data: game, isLoading } = useGame(joinCode, playerId);

  console.log("Game", game);

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

  if (game.state === 1) {
    return (
      <GameLeaderboard game={game} joinCode={joinCode} playerId={playerId} />
    );
  }

  if (game.state === 2) {
    return (
    <FinishedGame game={game} joinCode={joinCode} playerId={playerId} />
    );
  }

  return (
    <ActiveGameScreen game={game} joinCode={joinCode} playerId={playerId} />
  );
}
