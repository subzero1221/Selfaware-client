"use client";

import ConfirmModal from "@/components/ui/ConfirmModal";
import useDeleteLobby from "@/hooks/game/useDeleteLobby";
import { Copy, Check, ArrowRight, Trash2 } from "lucide-react";

import Link from "next/link";
import { useState } from "react";

interface ActiveLobbyViewProps {
  activePin: string;
}

export default function ActiveLobby({ activePin }: ActiveLobbyViewProps) {
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
    <div className="pt-2 flex flex-col items-center w-full font-sans">
      <div className="bg-brutal-green border-2 border-brutal-dark px-4 py-1.5 rounded-xl shadow-[3px_3px_0_var(--color-wood-section-shadow)] mb-8 rotate-1">
        <h4 className="text-sm font-black text-wood-text-primary tracking-widest uppercase">
          თქვენი ოთახი აქტიურია
        </h4>
      </div>

      <div className="w-full bg-brutal-yellow border-4 border-brutal-dark p-6 rounded-3xl shadow-[6px_6px_0_var(--color-wood-section-shadow)] flex flex-col items-center justify-center gap-4 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10  pointer-events-none"></div>

        <span className="relative z-10 text-xs sm:text-sm font-black text-wood-text-secondary uppercase tracking-widest bg-white border-2 border-brutal-dark px-3 py-1 rounded-lg shadow-[2px_2px_0_var(--color-wood-shadow)]">
          გასაწევრიანებელი PIN
        </span>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
          <span className="text-6xl select-none sm:text-7xl font-black font-mono text-wood-text-primary tracking-[0.15em] drop-shadow-[3px_3px_0_var(--color-wood-shadow)]">
            {activePin}
          </span>

          <button
            onClick={copyToClipboard}
            className={`
              p-4 rounded-2xl border-4 border-brutal-dark transition-all duration-200 cursor-pointer
              ${
                copied
                  ? "bg-brutal-green text-wood-text-primary translate-y-[4px] shadow-[0_0_0_var(--color-shadow)]"
                  : "bg-white text-wood-text-secondary shadow-[4px_4px_0_var(--color-section-shadow)] hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0_0_0_var(--color-brutal-dark)]"
              }
            `}
            title="PIN-ის დაკოპირება"
          >
            {copied ? (
              <Check size={32} strokeWidth={3} />
            ) : (
              <Copy size={32} strokeWidth={3} />
            )}
          </button>
        </div>

        <div className="h-6 relative z-10">
          {copied && (
            <span className="text-xs font-black text-brutal-dark bg-wood-text-primary px-3 py-1 rounded-lg border-2 border-brutal-dark uppercase tracking-widest shadow-[2px_2px_0_var(--color-wood-shadow)]">
              დაკოპირდა!
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-4">
        <Link
          href={"/dashboard/lobby"}
          className="flex-1 flex items-center justify-center gap-3 bg-brutal-blue text-wood-text-primary py-4 px-4 font-black text-base sm:text-lg uppercase tracking-wider border-4 border-brutal-dark rounded-2xl shadow-[4px_4px_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-brutal-blue)] active:translate-y-[4px] active:shadow-[0px_0px_0_var(--color-brutal-dark)] transition-all"
        >
          <span>ლობიში გადასვლა</span>
          <ArrowRight size={24} strokeWidth={3} />
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-brutal-red text-wood-text-primary py-4 px-6 font-black text-base sm:text-lg uppercase tracking-wider border-4 border-brutal-dark rounded-2xl shadow-[4px_4px_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-brutal-red)] active:translate-y-[4px] active:shadow-[0px_0px_0_var(--color-brutal-dark)] transition-all cursor-pointer"
        >
          <Trash2 size={24} strokeWidth={3} />
          <span>წაშლა</span>
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
