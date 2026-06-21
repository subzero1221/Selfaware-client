"use client";

import { useState } from "react";
import { FaRegCopyright } from "react-icons/fa";
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
    <header className="relative overflow-hidden flex flex-col md:flex-row justify-between items-center bg-wood-surface/80 backdrop-blur-md border border-wood-border/60 p-8 rounded-[2rem] mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mb-6 md:mb-0 text-center md:text-left z-10">
        <p className="text-xs text-wood-text-muted uppercase tracking-[0.2em] font-semibold mb-2">
          შესასვლელი PIN კოდი
        </p>
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <h1 className="text-6xl md:text-7xl font-mono font-extrabold text-wood-accent tracking-widest drop-shadow-sm">
            {joinCode}
          </h1>
          <button
            onClick={copyPin}
            className="p-2 mb-12 cursor-pointer text-2xl text-wood-text-muted hover:text-white transition-colors"
            title="PIN-ის კოპირება"
          >
            {copied ? <IoMdDoneAll/> : <FaRegCopyright/>}
          </button>
        </div>
      </div>

      <div className="relative flex flex-col items-center md:items-end z-10 bg-wood-base/50 py-4 px-6 rounded-2xl border border-wood-border/40">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-sm text-wood-text-muted">მოთამაშე</p>
        </div>
        <span className="text-wood-text-secondary font-bold text-4xl leading-none">
          {playerCount}
        </span>
      </div>
    </header>
  );
}
