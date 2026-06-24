"use client";

import NotFound from "@/app/not-found";
import useLobbyForPlayers from "@/hooks/game/useLobbyForPlayers";

import  LobbyHeader  from "./LobbyHeader";
import  PlayerCard  from "./PlayerCard";
import  ReadyButton  from "./ReadyButton";

export default function PlayerLobbyPage({ joinCode }: { joinCode: string }) {
  const currentPlayerId =
    typeof window !== "undefined" ? localStorage.getItem("playerToken") : null;

  const { data: lobby, isLoading } = useLobbyForPlayers(
    joinCode,
    currentPlayerId as string,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center text-wood-text-muted font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-wood-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase text-sm">
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
    <div className="min-h-screen bg-wood-base text-wood-text-primary p-6 md:p-12 font-sans flex flex-col items-center max-w-5xl mx-auto w-full">
      
      <LobbyHeader />

   
      {me && (
        <ReadyButton
          joinCode={joinCode}
          playerId={currentPlayerId as string}
          isCurrentlyReady={me.isReady}
        />
      )}

  
      <section className="w-full bg-gradient-to-b from-wood-surface/90 to-wood-surface/40 backdrop-blur-sm border border-wood-border/60 rounded-[2rem] p-6 sm:p-8 flex flex-col shadow-lg min-h-[400px]">
        <div className="flex justify-between items-end border-b border-wood-border/40 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-wood-accent tracking-wide">
            მოთამაშეები ოთახში
          </h2>
          <span className="text-xs text-wood-text-muted bg-wood-base px-3 py-1 rounded-full border border-wood-border/50">
            სულ: {lobby.players.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pr-2 content-start custom-scrollbar">
          {lobby.players.map((player: any) => (
            <PlayerCard
              key={player.id}
              player={player}
              isMe={player.id === currentPlayerId}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
