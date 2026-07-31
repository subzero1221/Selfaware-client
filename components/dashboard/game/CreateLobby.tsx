"use client";

import { Zap, Loader2, Info } from "lucide-react";

interface CreateLobbyViewProps {
  onCreate: (e: React.FormEvent) => void;
  isPending: boolean;
}

export default function CreateLobbyView({
  onCreate,
  isPending,
}: CreateLobbyViewProps) {
  return (
    <form
      onSubmit={onCreate}
      className="flex flex-col gap-6 pt-2 font-sans w-full max-w-md mx-auto"
    >
      <div className="relative bg-brutal-red border-4 border-brutal-dark rounded-2xl p-5 shadow-[4px_4px_0_var(--color-wood-section-shadow)] -rotate-1 transition-colors">
        <div className="absolute -top-3 -left-3 bg-brutal-blue border-2 border-brutal-dark rounded-full p-1.5 shadow-[2px_2px_0_var(--color-wood-section-shadow)] rotate-[-10deg]">
          <Info size={20} strokeWidth={3} className="text-wood-base" />
        </div>
        <p className="text-sm sm:text-base font-bold text-wood-text-primary text-center leading-relaxed mt-2">
          შექმენით ახალი ოთახი და გაუზიარეთ{" "}
          <span className="inline-block bg-brutal-yellow font-black px-2 py-0.5 rounded-lg border-2 border-brutal-dark shadow-[2px_2px_0_var(--color-wood-section-shadow)] mx-1 rotate-1">
            PIN კოდი
          </span>{" "}
          მოთამაშეებს. ტესტის არჩევას შეძლებთ ოთახის შექმნის შემდეგ.
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`
          group relative flex items-center justify-center gap-3 w-full py-4 px-6
          font-sans font-black text-lg sm:text-xl tracking-wider text-brutal-dark uppercase
          bg-brutal-green border-4 border-brutal-dark rounded-2xl
          transition-all duration-200
          ${
            isPending
              ? "opacity-70 cursor-not-allowed translate-y-[4px] shadow-[0px_0px_0_var(--color-brutal-dark)]"
              : "shadow-[6px_6px_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-brutal-green)] active:translate-y-[6px] active:shadow-[0px_0px_0_var(--color-brutal-green)] cursor-pointer"
          }
        `}
      >
        {isPending ? (
          <>
            <Loader2
              size={24}
              strokeWidth={3}
              className="animate-spin text-brutal-dark"
            />
            <span>ოთახი იქმნება...</span>
          </>
        ) : (
          <>
            <span>ახალი ოთახის შექმნა</span>
            <Zap
              size={24}
              strokeWidth={3}
              className="text-brutal-dark fill-brutal-dark group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200"
            />
          </>
        )}
      </button>
    </form>
  );
}
