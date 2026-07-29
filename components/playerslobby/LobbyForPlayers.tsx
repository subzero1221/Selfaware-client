"use client";

import NotFound from "@/app/not-found";
import useLobbyForPlayers from "@/hooks/game/useLobbyForPlayers";
import LobbyHeader from "./LobbyHeader";
import PlayerCard from "./PlayerCard";
import ReadyButton from "./ReadyButton";
import useStartGame from "@/hooks/game/socket/useStartGame";

export default function PlayerLobbyPage({ joinCode }: { joinCode: string }) {
  const currentPlayerId =
    typeof window !== "undefined" ? localStorage.getItem("playerToken") : null;

  const { data: lobby, isLoading } = useLobbyForPlayers(
    joinCode,
    currentPlayerId,
  );

  useStartGame(joinCode, lobby?.hostId, lobby?.quizId, currentPlayerId, false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center text-amber-950 font-sans selection:bg-[#FFD166] selection:text-amber-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-950 border-t-[#FFD166] animate-spin" />
          <p className="tracking-widest uppercase font-black text-xl drop-shadow-[0_2px_0_rgba(67,20,7,1)] text-white">
            იტვირთება ოთახი...
          </p>
        </div>
      </div>
    );
  }

  if (!lobby) {
    return <NotFound />;
  }

  const me = lobby.players.find((p: any) => p.id === currentPlayerId);

  return (
    <div className="min-h-screen bg-wood-base text-amber-950 p-6 md:p-12 font-sans flex flex-col items-center max-w-5xl mx-auto w-full selection:bg-[#FFD166] selection:text-amber-950">
      <LobbyHeader />

      {me && (
        <ReadyButton
          joinCode={joinCode}
          playerId={currentPlayerId as string}
          isCurrentlyReady={me.isReady}
        />
      )}

    
      <section className="w-full bg-wood-surface border-4 border-wood-border rounded-3xl p-6 sm:p-8 flex flex-col shadow-[8px_8px_0_0_rgba(67,20,7,1)] min-h-[400px] mt-4">
        <div className="flex justify-between items-end border-b-4 border-wood-border pb-4 mb-8">
          <h2 className="text-xl md:text-2xl font-black text-wood-text-primary tracking-wide uppercase">
            მოთამაშეები ოთახში
          </h2>
          <span className="text-sm md:text-base font-bold bg-[#FFD166] px-4 py-2 rounded-xl border-2 border-amber-950 shadow-[2px_2px_0_0_rgba(67,20,7,1)]">
            სულ: {lobby.players.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pr-2 content-start custom-scrollbar">
          {lobby.players.map((player: any, index: number) => (
            <PlayerCard
              key={currentPlayerId + index}
              joinCode={joinCode}
              playerId={currentPlayerId as string}
              player={player}
              isMe={player.id === currentPlayerId}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
