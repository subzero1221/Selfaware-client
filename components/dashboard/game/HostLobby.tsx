"use client";

import useLobby from "@/hooks/game/useLobby";
import PlayerList from "./PlayerList";
import HostLobbyHeader from "./HostLobbyHeader";
import HostLobbyChooseQuiz from "./HostLobbyChooseQuiz";

export default function HostLobbyPage() {
  const { data: lobby, isLoading } = useLobby();

  if (isLoading || !lobby) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center text-amber-950 font-sans selection:bg-[#FFD166] selection:text-amber-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-950 border-t-[#FFD166] animate-spin" />
          <p className="tracking-widest uppercase font-black text-xl drop-shadow-[0_2px_0_rgba(67,20,7,1)] text-white">
            იტვირთება ლობი...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wood-base text-amber-950 p-6 md:p-12 font-sans flex flex-col justify-between max-w-5xl mx-auto w-full selection:bg-[#FFD166] selection:text-amber-950">
      <HostLobbyHeader
        joinCode={lobby.joinCode}
        playerCount={lobby.players.length}
      />

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
        <PlayerList players={lobby.players} joinCode={lobby.joinCode} />

        <HostLobbyChooseQuiz
          hostId={lobby.hostId}
          joinCode={lobby.joinCode}
          playersLength={lobby.players.length}
        />
      </main>
    </div>
  );
}
