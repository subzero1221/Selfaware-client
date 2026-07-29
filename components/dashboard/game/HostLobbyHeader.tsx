"use client";

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

interface LobbyHeaderProps {
  joinCode: string;
  playerCount: number;
}

export default function HostLobbyHeader({
  joinCode,
  playerCount,
}: LobbyHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyPin = async () => {
    await navigator.clipboard.writeText(joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="relative flex flex-col md:flex-row justify-between items-center bg-wood-surface border-4 border-wood-border p-6 sm:p-8 rounded-3xl mb-8 shadow-[8px_8px_0_0_var(--color-wood-section-shadow)] gap-6">
      <div className="relative text-center md:text-left z-10">
        <p className="text-xs font-black text-wood-text-secondary uppercase tracking-[0.2em] mb-1">
          შესასვლელი PIN კოდი
        </p>

        <div className="flex items-center gap-4 justify-center md:justify-start">
          <h1 className="text-5xl md:text-7xl font-mono font-black text-wood-text-secondary tracking-widest drop-shadow-[0_4px_4px_0_0_var(--color-wood-shadow)]">
            {joinCode}
          </h1>

          <button
            onClick={copyPin}
            className="p-3 bg-[#FFD166] hover:bg-[#F2C249] border-3 border-wood-border rounded-2xl shadow-[0_4px_4px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-none transition-all text-amber-950 text-xl font-bold cursor-pointer"
            title="PIN-ის კოპირება"
          >
            {copied ? <IoMdDoneAll /> : <FaRegCopy />}
          </button>
        </div>
      </div>

      <div className="relative flex flex-col items-center md:items-end bg-[#FFD166] py-3 px-6 rounded-2xl border-4 border-wood-border shadow-[4px_4px_0_0_var(--color-wood-section-shadow)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06D6A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#06D6A0] border border-wood-border"></span>
          </span>
          <p className="text-xs font-black text-wood-text-primary uppercase tracking-wider">
            მოთამაშე
          </p>
        </div>
        <span className="text-wood-text-primary font-black text-4xl leading-none">
          {playerCount}
        </span>
      </div>
    </header>
  );
}
