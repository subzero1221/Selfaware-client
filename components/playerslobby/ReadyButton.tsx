import useIsReady from "@/hooks/game/socket/useIsReady";

export default function ReadyButton({
  joinCode,
  playerId,
  isCurrentlyReady,
}: {
  joinCode: string;
  playerId: string;
  isCurrentlyReady: boolean;
}) {
  const { sendReadySignal, sendNotReadySignal } = useIsReady(
    joinCode,
    playerId,
  );

  return (
    <div className="w-full flex justify-center mb-6">
      {isCurrentlyReady ? (
        <button
          onClick={() => sendNotReadySignal()}
          className="px-8 py-4 rounded-full cursor-pointer font-bold text-lg transition-all shadow-lg active:scale-95 bg-wood-border/50 text-wood-text-primary hover:bg-wood-border/70 border border-wood-border"
        >
          მზადყოფნის გაუქმება
        </button>
      ) : (
        <button
          onClick={() => sendReadySignal()}
          className="px-8 py-4 rounded-full cursor-pointer font-bold text-lg transition-all shadow-lg active:scale-95 bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]"
        >
          მზად ვარ!
        </button>
      )}
    </div>
  );
}
