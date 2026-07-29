import useLeaveLobby from "@/hooks/game/socket/useLeaveLobby";
import { VscClose } from "react-icons/vsc";

interface PlayerCardProps {
  player: any;
  playerId: string;
  isMe: boolean;
  joinCode: string;
  index: number;
}

export default function PlayerCard({
  player,
  playerId,
  isMe,
  joinCode,
  index = 0,
}: PlayerCardProps) {
  const { sendLeaveSignal } = useLeaveLobby(joinCode, playerId);

  const baseClasses =
    "group relative flex flex-col items-center justify-center px-4 py-6 rounded-2xl transition-all duration-300 border-4 border-amber-950 shadow-[4px_4px_0_0_rgba(67,20,7,1)] hover:-translate-y-2 hover:shadow-[4px_8px_0_0_rgba(67,20,7,1)] overflow-hidden";

  const stateClasses = player.isReady
    ? "bg-[#06D6A0]"
    : isMe
      ? "bg-[#FFD166]"
      : "bg-white";

  const rotationClass =
    index % 2 === 0 ? "rotate-1 hover:-rotate-1" : "-rotate-1 hover:rotate-1";

  return (
    <div className={`${baseClasses} ${stateClasses} ${rotationClass}`}>
      {isMe && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            sendLeaveSignal();
          }}
          className="absolute top-2 right-2 p-1.5 flex items-center justify-center rounded-xl bg-[#EF476F] border-2 border-amber-950 text-white hover:bg-red-600 transition-colors shadow-[2px_2px_0_0_rgba(67,20,7,1)] active:translate-y-[2px] active:shadow-none cursor-pointer"
          title="ლობის დატოვება"
        >
          <VscClose className="text-xl font-black" />
        </button>
      )}

      <span
        className={`text-lg font-black tracking-wide truncate max-w-[90%] uppercase ${
          player.isReady || isMe ? "text-amber-950" : "text-amber-950"
        }`}
      >
        {player.nickName}
      </span>

      <span
        className={`text-[12px] mt-3 px-3 py-1 rounded-xl uppercase tracking-wider font-bold border-2 border-amber-950 shadow-[2px_2px_0_0_rgba(67,20,7,1)] ${
          player.isReady
            ? "bg-white text-amber-950"
            : "bg-gray-100 text-amber-950"
        }`}
      >
        {player.isReady ? "მზადაა" : "ფიქრობს..."}
      </span>
    </div>
  );
}
