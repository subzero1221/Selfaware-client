"use client";

import useJoinLobby from "@/hooks/game/useJoinLobby";
import { useState } from "react";
import { User, Rocket } from "lucide-react";

export default function JoinGameForm() {
  const [joinCode, setJoinCode] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate: joinLobby, isPending, error } = useJoinLobby();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    joinLobby({ nickname, joinCode });
    console.log("Joining game with:", { joinCode, nickname });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pointer-events-auto flex flex-col sm:flex-row items-stretch sm:items-center bg-[#118AB2] border-4 border-amber-950 rounded-[32px] p-3 gap-3 shadow-[4px_8px_0_0_rgba(67,20,7,1)] hover:shadow-[4px_10px_0_0_rgba(67,20,7,1)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-center gap-3 bg-white border-4 border-amber-950 rounded-2xl px-4 py-3 flex-1 focus-within:-translate-y-1 focus-within:shadow-[0_4px_0_0_rgba(67,20,7,1)] transition-all">
        <span className="text-amber-950 text-xs md:text-sm font-black tracking-widest uppercase bg-[#FFD166] border-2 border-amber-950 px-3 py-1.5 rounded-xl shadow-[0_3px_0_0_rgba(67,20,7,1)] rotate-2">
          PIN
        </span>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="123456"
          maxLength={6}
          required
          className="bg-transparent text-xl md:text-2xl focus:outline-none w-full placeholder:text-amber-950/30 text-amber-950 font-black tracking-widest text-center"
        />
      </div>

      <div className="flex items-center gap-3 bg-white border-4 border-amber-950 rounded-2xl px-4 py-3 flex-1 focus-within:-translate-y-1 focus-within:shadow-[0_4px_0_0_rgba(67,20,7,1)] transition-all">
        <span className="text-amber-950 select-none bg-[#06D6A0] border-2 border-amber-950 w-10 h-10 flex items-center justify-center rounded-xl shadow-[0_3px_0_0_rgba(67,20,7,1)] -rotate-3">
          <User size={20} strokeWidth={3} />
        </span>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="შენი სახელი"
          required
          className="bg-transparent text-lg md:text-xl focus:outline-none w-full placeholder:text-amber-950/30 text-amber-950 font-bold"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#06D6A0] hover:bg-[#05C593] text-amber-950 border-4 border-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] font-black text-lg px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isPending ? "ერთვები..." : "ჩართვა"}</span>
        <Rocket size={24} strokeWidth={3} className="animate-pulse" />
      </button>
    </form>
  );
}
