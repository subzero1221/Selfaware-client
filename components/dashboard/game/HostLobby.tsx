"use client";

import { useState } from "react";
import useLobby from "@/hooks/game/useLobby";
import PlayerList from "./PlayerList";
import HostLobbyHeader from "./HostLobbyHeader";
import HostLobbyChooseQuiz from "./HostLobbyChooseQuiz";

export default function HostLobbyPage() {
  const { data: lobby, isLoading } = useLobby();

  if (isLoading || !lobby) {
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
