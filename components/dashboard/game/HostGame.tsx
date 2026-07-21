"use client";
import HostGameInfo from "./HostGameInfo";
import useGameForHost from "@/hooks/game/useGameForHost";

export default function HostGame({ joinCode }: { joinCode: string }) {
  const { data: game, isLoading } = useGameForHost(joinCode);
  console.log("Game data for host:", game);
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
    <div className="min-h-screen bg-wood-base text-wood-text-primary p-6 md:p-12 font-sans flex flex-col justify-between max-w-5xl mx-auto w-full selection:bg-violet-500/30 selection:text-white">
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
        <div className="col-span-2 flex flex-col gap-6">
          <HostGameInfo game={game} />
        </div>
      </main>
    </div>
  );
}
