"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import JoinGameForm from "./dashboard/game/JoinGameForm";
import Footer from "./ui/Footer";
import { Target, Sparkles, Zap, Trophy, Timer } from "lucide-react";

const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-wood-base flex items-center justify-center z-0">
      <div className="w-12 h-12 rounded-full border-4 border-wood-border border-t-wood-accent animate-spin opacity-50" />
    </div>
  ),
});

export default function LandingPage() {
  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-amber-950 flex flex-col font-sans selection:bg-[#FFD166] selection:text-amber-950 overflow-hidden">
      <HeroCanvas />

      <main className="relative z-10 pointer-events-none flex-1 max-w-6xl w-full mx-auto px-6 flex flex-col justify-center py-16 md:py-28">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EF476F] border-4 border-amber-950 text-white text-sm md:text-base font-black shadow-[4px_4px_0_0_rgba(67,20,7,1)] mb-10 -rotate-2 hover:rotate-1 transition-transform origin-left w-fit">
          <Target size={20} strokeWidth={4} className="animate-bounce" />
          <span className="uppercase tracking-wider">
            ინტერაქტიული ქვიზ-პლატფორმა
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.15] max-w-4xl mb-8 select-none drop-shadow-[0_4px_0_rgba(67,20,7,1)] md:drop-shadow-[0_6px_0_rgba(67,20,7,1)]">
          მართე გუნდის ძლიერი მხარეები <br className="hidden md:block" />
          <span className="text-[#FFD166] block mt-2 drop-shadow-[0_4px_0_rgba(67,20,7,1)] md:drop-shadow-[0_6px_0_rgba(67,20,7,1)]">
            ინტერაქტიული ქვიზებით!
          </span>
        </h1>

        <p className="text-white text-lg md:text-2xl max-w-2xl leading-relaxed mb-12 select-none font-bold drop-shadow-[0_2px_0_rgba(67,20,7,1)]">
          შექმენი დინამიური, დროში შეზღუდული ფსიქოლოგიური და აკადემიური ტესტები.
          გააზიარე ბმული წამებში, რეგისტრაციის ბარიერის გარეშე. კორპორატიული
          Kahoot-ის ალტერნატივა.
        </p>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 mb-24">
          <Link
            href="/dashboard"
            className="pointer-events-auto bg-[#FFD166] hover:bg-[#FFC436] text-amber-950 border-4 border-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] px-10 py-5 rounded-[32px] font-black text-xl tracking-wide text-center transition-all flex items-center justify-center gap-3 shrink-0 rotate-1 hover:rotate-0 shadow-[4px_8px_0_0_rgba(67,20,7,1)] hover:shadow-[4px_6px_0_0_rgba(67,20,7,1)]"
          >
            <span>დაიწყე უფასოდ</span>
            <Sparkles size={24} strokeWidth={3} />
          </Link>

          <JoinGameForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="pointer-events-auto group bg-[#FFD166] border-4 border-amber-950 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-3 hover:-rotate-2 shadow-[4px_8px_0_0_rgba(67,20,7,1)] rotate-1">
            <div className="w-16 h-16 rounded-2xl bg-white border-4 border-amber-950 flex items-center justify-center text-amber-950 mb-6 shadow-[0_4px_0_0_rgba(67,20,7,1)] group-hover:scale-110 group-hover:-rotate-12 transition-transform">
              <Zap size={32} strokeWidth={3} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-black text-amber-950 mb-3 uppercase tracking-wide">
              სწრაფი წვდომა
            </h3>
            <p className="text-base md:text-lg font-bold text-amber-900 leading-relaxed">
              თანამშრომლებს არ სჭირდებათ პაროლების შექმნა. სახელი, ელ-ფოსტა და
              ისინი უკვე თამაშში არიან.
            </p>
          </div>

          <div className="pointer-events-auto group bg-[#06D6A0] border-4 border-amber-950 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-3 hover:rotate-2 shadow-[4px_8px_0_0_rgba(67,20,7,1)] -rotate-1 mt-0 md:mt-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-4 border-amber-950 flex items-center justify-center text-amber-950 mb-6 shadow-[0_4px_0_0_rgba(67,20,7,1)] group-hover:scale-110 group-hover:rotate-12 transition-transform">
              <Trophy size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-amber-950 mb-3 uppercase tracking-wide">
              ლაივ ლიდერბორდი
            </h3>
            <p className="text-base md:text-lg font-bold text-amber-950/80 leading-relaxed">
              აკონტროლე შედეგები რეალურ დროში. მიიღე სრული სტატისტიკა თითოეულ
              გუნდზე.
            </p>
          </div>

          <div className="pointer-events-auto group bg-[#EF476F] border-4 border-amber-950 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-3 hover:-rotate-2 shadow-[4px_8px_0_0_rgba(67,20,7,1)] rotate-2 mt-0 md:mt-8">
            <div className="w-16 h-16 rounded-2xl bg-white border-4 border-amber-950 flex items-center justify-center text-amber-950 mb-6 shadow-[0_4px_0_0_rgba(67,20,7,1)] group-hover:scale-110 group-hover:-rotate-12 transition-transform">
              <Timer size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-amber-950 mb-3 uppercase tracking-wide">
              დროის ლიმიტები
            </h3>
            <p className="text-base md:text-lg font-bold text-amber-950/80 leading-relaxed">
              ოპტიმიზირებული ტაიმერები, რომლებიც უზრუნველყოფენ ტესტირების
              სამართლიანობას.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
