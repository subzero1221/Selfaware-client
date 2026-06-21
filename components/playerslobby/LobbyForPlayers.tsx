"use client";

import useLobbyForPlayers from "@/hooks/game/useLobbyForPlayers";


export default function PlayerLobbyPage({ joinCode }: { joinCode: string }) {
  const currentPlayerId =
    typeof window !== "undefined" ? localStorage.getItem("playerToken") : null;

  const { data: lobby, isLoading } = useLobbyForPlayers(
    joinCode,
    currentPlayerId as string,
  );

  if (isLoading || !lobby) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center text-wood-text-muted font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-wood-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase text-sm">
            იტვირთება ოთახი...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wood-base text-wood-text-primary p-6 md:p-12 font-sans flex flex-col items-center max-w-5xl mx-auto w-full">
      <header className="relative w-full overflow-hidden flex flex-col items-center bg-wood-surface/80 backdrop-blur-md border border-wood-border/60 p-8 rounded-[2rem] mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-center">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-16 h-16 bg-green-500/20 border-2 border-green-400/50 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <svg
            className="w-8 h-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-wood-text-secondary tracking-wide mb-2">
          შენ თამაშში ხარ!
        </h1>

        <div className="flex items-center gap-3 mt-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wood-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-wood-accent"></span>
          </span>
          <p className="text-sm font-semibold text-wood-text-secondary animate-pulse tracking-wide uppercase">
            ველოდებით მოთამაშეებს...
          </p>
        </div>
      </header>

      <section className="w-full bg-gradient-to-b from-wood-surface/90 to-wood-surface/40 backdrop-blur-sm border border-wood-border/60 rounded-[2rem] p-6 sm:p-8 flex flex-col shadow-lg min-h-[400px]">
        <div className="flex justify-between items-end border-b border-wood-border/40 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-wood-accent tracking-wide">
            მოთამაშეები ოთახში
          </h2>
          <span className="text-xs text-wood-text-muted bg-wood-base px-3 py-1 rounded-full border border-wood-border/50">
            სულ: {lobby.players.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pr-2 content-start custom-scrollbar">
          {lobby.players.map((player) => {
            const isMe = player.id === currentPlayerId;

            return (
              <div
                key={player.id}
                className={`group relative flex flex-col items-center justify-center px-4 py-4 rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isMe
                    ? "bg-wood-accent/10 border-wood-accent shadow-[0_0_15px_rgba(var(--wood-accent-rgb),0.2)] scale-[1.02]"
                    : "bg-wood-base border-wood-border/50 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:border-wood-accent/30"
                }`}
              >
                <span
                  className={`text-sm font-semibold tracking-wide truncate max-w-[90%] transition-colors mt-1 ${
                    isMe
                      ? "text-wood-accent"
                      : "text-wood-text-secondary group-hover:text-wood-accent"
                  }`}
                >
                  {player.nickName}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
