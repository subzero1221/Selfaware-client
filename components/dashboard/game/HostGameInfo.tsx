"use client";

import { GameDto } from "@/types/dtos/game";
import HostAnsweringView from "./HostAnsweringView";
import HostLeaderboardView from "./HostLeaderboardView";
import HostGameOverView from "./HostGameOverView";

export default function HostGameInfo({
  game,
  joinCode,
}: {
  game: GameDto;
  joinCode: string;
}) {
  if (game.state === 0) {
    return <HostAnsweringView game={game} />;
  }

  if (game.state === 1) {
    return <HostLeaderboardView game={game} />;
  }

  if (game.state === 2) {
    return <HostGameOverView game={game} joinCode={joinCode} />;
  }

  return null;
}
