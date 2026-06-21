"use client";

import ConfirmModal from "@/components/ui/ConfirmModal";
import useDeleteLobby from "@/hooks/game/useDeleteLobby";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

import Link from "next/link";
import { useState } from "react";

interface ActiveLobbyViewProps {
  activePin: string;
}

export default function Lobby({ activePin }: ActiveLobbyViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { mutate: deleteLobby } = useDeleteLobby();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(activePin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="pt-2">
      <h4 className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide uppercase mb-4 text-center">
        თქვენი ოთახი აქტიურია
      </h4>

      <div className="bg-wood-base/80 border-2 border-wood-accent/50 p-6 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center gap-2">
        <span className="text-xs font-mono text-wood-text-muted uppercase tracking-widest">
          გასაწევრიანებელი PIN
        </span>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-5xl font-mono font-bold text-wood-accent drop-shadow-md tracking-[0.2em]">
            {activePin}
          </span>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg cursor-pointer bg-wood-surface/30 hover:bg-wood-accent/20 transition-all text-wood-text-muted hover:text-wood-accent border border-wood-border/30"
          >
            {copied ? <IoMdDoneAll /> : <FaRegCopyright />}
          </button>
        </div>

        <div className="h-4">
          {copied && (
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">
              დაკოპირდა!
            </span>
          )}
        </div>

        <Link
          href={"/dashboard/lobby"}
          className="mt-2 cursor-pointer text-sm font-serif font-bold text-wood-text-primary hover:text-wood-accent underline decoration-wood-border-focus underline-offset-4 transition-colors"
        >
          ლობიში გადასვლა →
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-1 cursor-pointer text-sm font-serif font-bold text-delete-surface hover:text-delete-hover underline decoration-wood-border-focus underline-offset-4 transition-colors"
        >
          წაშლა
        </button>
      </div>

      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={deleteLobby}
          confirmText="წაშლა"
          title="ოთახის წაშლა"
          description="დარწმუნებული ხართ რომ გსურთ ოთახის წაშლა?"
        />
      )}
    </div>
  );
}
