"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { VscSignOut } from "react-icons/vsc";
import dynamic from "next/dynamic";
import Logo3D from "./Logo3D";

const LobbyHeaderButton = dynamic(
  () => import("../playerslobby/LobbyHeaderButton"),
  {
    ssr: false,
  },
);

export default function Header() {
  const { user, leave, isLeaving, leaveError } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-wood-surface border-b-[6px] border-wood-border h-24 flex items-center justify-between px-6 lg:px-10 shadow-[0_8px_0_0_var(--tw-shadow-color)] shadow-wood-border/10 font-sans transition-all">
      <div className="flex items-center gap-2">
        <Link href="/" className="group flex items-center">
          <span className="font-black text-3xl md:text-4xl tracking-tight uppercase text-wood-accent drop-shadow-sm group-hover:scale-105 group-hover:-rotate-2 transition-transform origin-left">
            Selfaware
          </span>
          <Logo3D />
        </Link>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <LobbyHeaderButton />

        <ThemeToggle />

        <div className="hidden sm:block w-1.5 h-10 bg-wood-border/30 rounded-full rotate-3"></div>

        <div className="hidden sm:flex items-center gap-5">
          <span className="text-xs md:text-sm font-black text-wood-text-muted uppercase tracking-widest hidden lg:block">
            ორგანიზატორი ხართ?
          </span>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-wood-base hover:bg-wood-surface text-wood-text-primary border-4 border-wood-border border-b-[6px] active:border-b-4 active:translate-y-[2px] rounded-2xl font-black text-sm uppercase tracking-wide transition-all shadow-[2px_4px_0_0_var(--tw-shadow-color)] hover:shadow-[2px_6px_0_0_var(--tw-shadow-color)] shadow-wood-border rotate-1 hover:rotate-0"
              >
                სისტემა
              </Link>

              <button
                onClick={() => leave()}
                disabled={isLeaving}
                className="flex items-center cursor-pointer gap-2 px-5 py-3 bg-wood-surface hover:bg-red-50 text-wood-text-secondary hover:text-red-500 hover:border-red-200 border-4 border-wood-border border-b-[6px] active:border-b-4 active:translate-y-[2px] rounded-2xl font-black text-sm uppercase tracking-wide transition-all shadow-[2px_4px_0_0_var(--tw-shadow-color)] hover:shadow-[2px_6px_0_0_var(--tw-shadow-color)] shadow-wood-border -rotate-1 hover:rotate-0 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="სისტემიდან გამოსვლა"
              >
                <VscSignOut className="text-xl group-hover:scale-110 transition-transform" />
                <span className="hidden xl:block">გამოსვლა</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="group flex items-center gap-2 px-8 py-3.5 bg-wood-text-primary hover:opacity-90 text-wood-primary border-4 border-wood-border border-b-[8px] active:border-b-4 active:translate-y-[4px] rounded-2xl font-black text-sm md:text-base uppercase tracking-widest transition-all shadow-[4px_6px_0_0_var(--tw-shadow-color)] hover:shadow-[4px_8px_0_0_var(--tw-shadow-color)] shadow-wood-border rotate-1 hover:rotate-0"
            >
              შესვლა
              <span className="group-hover:translate-x-1 group-hover:scale-110 transition-all text-lg leading-none font-bold">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
