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
    <div className="w-full flex justify-center mb-10">
      {isCurrentlyReady ? (
        <button
          onClick={() => sendNotReadySignal()}
          className="bg-[#EF476F] cursor-pointer hover:bg-[#D83A5D] text-white border-4 border-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] px-10 py-5 rounded-[32px] font-black text-xl tracking-wide text-center transition-all flex items-center justify-center gap-3 shrink-0 -rotate-1 hover:rotate-0 shadow-[4px_8px_0_0_rgba(67,20,7,1)] hover:shadow-[4px_6px_0_0_rgba(67,20,7,1)] uppercase"
        >
          მზადყოფნის გაუქმება
        </button>
      ) : (
        <button
          onClick={() => sendReadySignal()}
          className="bg-[#06D6A0] cursor-pointer hover:bg-[#05C291] text-amber-950 border-4 border-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] px-10 py-5 rounded-[32px] font-black text-xl tracking-wide text-center transition-all flex items-center justify-center gap-3 shrink-0 rotate-1 hover:rotate-0 shadow-[4px_8px_0_0_rgba(67,20,7,1)] hover:shadow-[4px_6px_0_0_rgba(67,20,7,1)] uppercase"
        >
          მზად ვარ!
        </button>
      )}
    </div>
  );
}
