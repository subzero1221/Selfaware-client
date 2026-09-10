"use client";

interface NeoLoaderProps {
  text?: string;
}

export default function Loading({ text = "იტვირთება..." }: NeoLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 w-full h-full min-h-[40vh]">
      <div className="relative w-16 h-16 animate-spin">
        <div className="absolute inset-0 bg-brutal-blue border-4 border-wood-border rounded-xl shadow-[4px_4px_0_0_var(--color-wood-border)] -rotate-6" />
        <div className="absolute inset-2 bg-brutal-red border-4 border-wood-border rounded-lg rotate-12" />
        <div className="absolute inset-4 bg-wood-accent border-4 border-wood-border rounded-md -rotate-12" />
      </div>

      <div className="relative group cursor-wait mt-4">
        <div className="absolute inset-0 bg-wood-border rounded-2xl translate-x-2 translate-y-2" />

        <div className="relative bg-wood-surface border-4 border-wood-border px-6 py-3 rounded-2xl animate-pulse">
          <span className="font-black text-wood-text-primary uppercase tracking-wider text-lg">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
