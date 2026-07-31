"use client";

import Link from "next/link";
import { MapPinOff, Home } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-amber-950 flex flex-col font-sans selection:bg-[#FFD166] selection:text-amber-950 overflow-hidden items-center justify-center p-6">
      <main className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EF476F] border-4 border-amber-950 text-white text-sm md:text-base font-black shadow-[4px_4px_0_0_rgba(67,20,7,1)] mb-8 -rotate-2 hover:rotate-1 transition-transform origin-center w-fit">
          <MapPinOff size={20} strokeWidth={4} className="animate-bounce" />
          <span className="uppercase tracking-wider">404 შეცდომა</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.15] mb-6 select-none drop-shadow-[0_4px_0_rgba(67,20,7,1)] md:drop-shadow-[0_6px_0_rgba(67,20,7,1)]">
          გვერდი ვერ <br className="hidden md:block" />
          <span className="text-[#FFD166] block mt-2 drop-shadow-[0_4px_0_rgba(67,20,7,1)] md:drop-shadow-[0_6px_0_rgba(67,20,7,1)]">
            მოიძებნა!
          </span>
        </h1>

        <p className="text-white text-lg md:text-2xl max-w-lg leading-relaxed mb-12 select-none font-bold drop-shadow-[0_2px_0_rgba(67,20,7,1)]">
          ეს მისამართი არ არსებობს. გადაამოწმეთ ლინკი და სცადეთ თავიდან.
        </p>

        <Link
          href="/"
          className="pointer-events-auto bg-[#06D6A0] hover:bg-[#06D6A0]/90 text-amber-950 border-4 border-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] px-10 py-5 rounded-[32px] font-black text-xl tracking-wide text-center transition-all flex items-center justify-center gap-3 shrink-0 rotate-1 hover:rotate-0 shadow-[4px_8px_0_0_rgba(67,20,7,1)] hover:shadow-[4px_6px_0_0_rgba(67,20,7,1)]"
        >
          <Home
            size={24}
            strokeWidth={3}
            className="group-hover:scale-110 transition-transform"
          />
          <span>მთავარზე დაბრუნება</span>
        </Link>
      </main>
    </div>
  );
}
