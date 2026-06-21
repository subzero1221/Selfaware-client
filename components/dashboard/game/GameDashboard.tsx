"use client";

import useCreateLobby from "@/hooks/game/useCreateLobby";
import useLobby from "@/hooks/game/useLobby";

import CreateLobbyView from "./CreateLobby";
import ActiveLobby from "./ActiveLobby";

export default function Lobby() {
  const { data: lobbyData, isLoading } = useLobby();
  const { mutate: createLobby, isPending } = useCreateLobby();

  const handleCreateLobby = (e: React.FormEvent) => {
    e.preventDefault();
    createLobby();
  };
  console.log(lobbyData)
  const activePin = lobbyData?.joinCode;

  return (
    <div className="relative max-w-xl w-full bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 border border-wood-border-focus/50 shadow-[inset_0_0_5px_rgba(0,0,0,0.6)] pointer-events-none transition-colors duration-300"></div>

      <div className="relative p-8 flex flex-col">
        <div className="border-b-2 border-wood-border-focus/40 pb-4 mb-6 relative">
          <h3 className="font-serif text-xl font-bold tracking-wide text-wood-text-primary drop-shadow-md flex items-center gap-3">
            <span className="text-2xl drop-shadow-lg">🎮</span>
            თამაშის მართვა (Lobby)
          </h3>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wood-border-focus to-transparent"></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <span className="text-sm font-serif italic text-wood-text-muted/70 animate-pulse">
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
