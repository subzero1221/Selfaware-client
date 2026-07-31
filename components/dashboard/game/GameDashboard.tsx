"use client";

import useCreateLobby from "@/hooks/game/useCreateLobby";
import useLobby from "@/hooks/game/useLobby";

import CreateLobbyView from "./CreateLobby";
import ActiveLobby from "./ActiveLobby";
import { Gamepad2, Loader2 } from "lucide-react";

export default function Lobby() {
  const { data: lobbyData, isLoading } = useLobby();
  const { mutate: createLobby, isPending } = useCreateLobby();

  const handleCreateLobby = (e: React.FormEvent) => {
    e.preventDefault();
    createLobby();
  };

  const activePin = lobbyData?.joinCode;

  return (
    <div className="w-full max-w-xl mx-auto bg-wood-surface border-4 border-brutal-dark rounded-3xl shadow-[8px_8px_0_var(--color-wood-section-shadow)] overflow-hidden font-sans selection:bg-brutal-yellow selection:text-brutal-dark transition-colors duration-300">
      <div className="p-6 md:p-8 flex flex-col">
        <div className="pb-5 mb-8 flex items-center gap-4">
          <div className="bg-brutal-yellow p-2 border-2 border-brutal-dark rounded-xl shadow-[3px_3px_0_var(--color-wood-section-shadow)] -rotate-3">
            <Gamepad2
              size={32}
              strokeWidth={2.5}
              className="text-brutal-dark"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-wood-text-secondary uppercase">
            თამაშის მართვა
          </h3>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2
              size={48}
              strokeWidth={3}
              className="text-brutal-blue animate-spin"
            />
            <span className="text-lg font-black uppercase text-brutal-dark tracking-widest animate-pulse">
              მონაცემები იტვირთება...
            </span>
          </div>
        ) : activePin ? (
          <ActiveLobby activePin={activePin} />
        ) : (
          <CreateLobbyView onCreate={handleCreateLobby} isPending={isPending} />
        )}
      </div>
    </div>
  );
}
