"use client";

import useJoinLobby from "@/hooks/game/useJoinLobby";
import { useState } from "react";

export default function JoinGameForm() {
  const [joinCode, setJoinCode] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate: joinLobby, isPending, error } = useJoinLobby();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    joinLobby({nickname, joinCode});
    console.log("Joining game with:", { joinCode, nickname });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center bg-wood-surface border border-wood-border rounded-xl p-1 focus-within:border-wood-accent/50 transition-all"
    >
      <input
        type="text"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value)}
        placeholder="PIN კოდი"
        maxLength={6}
        required
        className="bg-transparent text-sm focus:outline-none w-full sm:w-28 placeholder:text-wood-text-muted py-2 pl-4 font-mono text-wood-accent"
      />

      <div className="hidden sm:block w-px h-6 bg-wood-border mx-2" />

      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="შენი სახელი"
        required
        className="bg-transparent text-sm focus:outline-none w-full sm:w-40 placeholder:text-wood-text-muted py-2 pl-4 sm:pl-0 text-wood-accent"
      />

      <button
        type="submit"
        className="bg-wood-surface mt-2 sm:mt-0 w-full sm:w-auto cursor-pointer border border-wood-border text-wood-text-muted hover:text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap"
      >
        ჩართვა →
      </button>
    </form>
  );
}
