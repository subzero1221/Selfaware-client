export default function PlayerCard({ player, isMe }: { player: any; isMe: boolean }) {
  const baseClasses =
    "group relative flex flex-col items-center justify-center px-4 py-4 rounded-2xl transition-all duration-300 overflow-hidden border";

  const stateClasses = player.isReady
    ? "bg-green-500/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)] scale-[1.02]"
    : isMe
      ? "bg-wood-accent/10 border-wood-accent shadow-[0_0_15px_rgba(var(--wood-accent-rgb),0.2)]"
      : "bg-wood-base border-wood-border/50 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:border-wood-accent/30";

  return (
    <div className={`${baseClasses} ${stateClasses}`}>
      <span
        className={`text-sm font-semibold tracking-wide truncate max-w-[90%] transition-colors mt-1 ${
          player.isReady
            ? "text-green-400"
            : isMe
              ? "text-wood-accent"
              : "text-wood-text-secondary group-hover:text-wood-accent"
        }`}
      >
        {player.nickName}
      </span>

      <span
        className={`text-[10px] mt-2 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
          player.isReady
            ? "bg-green-500/20 text-green-400"
            : "bg-wood-border/30 text-wood-text-muted"
        }`}
      >
        {player.isReady ? "მზადაა" : "ფიქრობს..."}
      </span>
    </div>
  );
}
