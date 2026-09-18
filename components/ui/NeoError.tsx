"use client";

interface NeoErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export default function NeoError({
  title = "შეცდომა!",
  message = "რაღაც არასწორად მოხდა.",
  onRetry,
  retryText = "თავიდან სცადეთ",
}: NeoErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8 w-full h-full min-h-[40vh]">

      <div className="relative w-20 h-20 animate-[bounce_2s_infinite]">
        <div className="absolute inset-0 bg-wood-border rounded-xl translate-x-2 translate-y-2" />
        <div className="absolute inset-0 bg-brutal-red border-4 border-wood-border rounded-xl flex items-center justify-center -rotate-6">
          <div className="relative w-10 h-10">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-wood-border -translate-y-1/2 rotate-45" />
            <div className="absolute top-1/2 left-0 w-full h-2 bg-wood-border -translate-y-1/2 -rotate-45" />
          </div>
        </div>
      </div>

      <div className="relative group max-w-md text-center mt-4">

        <div className="absolute inset-0 bg-wood-border rounded-2xl translate-x-3 translate-y-3" />


        <div className="relative bg-wood-surface border-4 border-wood-border px-8 py-6 rounded-2xl flex flex-col gap-2">
          <span className="font-black text-brutal-red uppercase tracking-wider text-2xl">
            {title}
          </span>
          <p className="font-bold text-wood-text-primary text-lg">{message}</p>
        </div>
      </div>


      {onRetry && (
        <button
          onClick={onRetry}
          className="relative group cursor-pointer mt-8 focus:outline-none"
        >

          <div className="absolute inset-0 bg-wood-border rounded-xl translate-x-2 translate-y-2 transition-transform group-active:translate-x-0 group-active:translate-y-0" />

          <div className="relative bg-brutal-blue border-4 border-wood-border px-8 py-3 rounded-xl transition-transform group-active:translate-x-2 group-active:translate-y-2 hover:-translate-y-1 hover:-translate-x-1">
            <span className="font-black text-wood-text-primary uppercase tracking-wider text-lg">
              {retryText}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
