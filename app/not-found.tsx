"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-wood-base text-wood-text-primary flex flex-col justify-between p-6 font-sans selection:bg-wood-accent/20">
      <main className="max-w-md w-full mx-auto text-center my-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
          გვერდი ვერ მოიძებნა
        </h1>

        <p className="text-wood-text-secondary text-sm md:text-base leading-relaxed mb-10 max-w-sm">
          ეს მისამართი არ არსებობს.
          გადაამოწმეთ ლინკი და სცადეთ თავიდან.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-wood-accent text-wood-base font-bold px-8 py-3.5 rounded-xl text-sm tracking-wide transition-all duration-200 hover:opacity-95 shadow-[0_4px_20px_var(--color-wood-accent-glow)] active:scale-[0.98]"
        >
          მთავარ გვერდზე დაბრუნება
        </Link>
      </main>
    </div>
  );
}
