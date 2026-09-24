import { AlertTriangle } from "lucide-react";

interface NeoErrorProps {
  message?: string | null;
  className?: string;
}

export default function NeoErrorMessage({
  message,
  className = "",
}: NeoErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-4 w-full bg-[#EF476F] border-4 border-wood-border text-white p-4 rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1 mb-6 transform transition-transform hover:rotate-0 hover:-translate-y-1 ${className}`}
    >
      <div className="bg-white text-[#EF476F] p-2 rounded-xl border-2 border-wood-border shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]">
        <AlertTriangle size={24} strokeWidth={3} />
      </div>
      <div className="flex flex-col">
        <span className="font-black uppercase tracking-widest text-xs opacity-90 drop-shadow-md">
          ხარვეზი
        </span>
        <span className="font-bold text-lg leading-tight drop-shadow-md">
          {message}
        </span>
      </div>
    </div>
  );
}
