"use client";

import HostGameInfo from "./HostGameInfo";
import useGameForHost from "@/hooks/game/useGameForHost";

export default function HostGame({ joinCode }: { joinCode: string }) {
  const { data: game, isLoading } = useGameForHost(joinCode);

  if (isLoading || !game) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center text-wood-text-muted font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-wood-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase text-sm">იტვირთება ლობი...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wood-base text-wood-text-primary p-4 md:p-8 font-sans flex flex-col justify-start items-center max-w-4xl mx-auto w-full selection:bg-violet-500/30 selection:text-white">
      <main className="w-full flex flex-col gap-6 my-auto">
        <HostGameInfo game={game} joinCode={joinCode} />
      </main>
    </div>
  );
}
