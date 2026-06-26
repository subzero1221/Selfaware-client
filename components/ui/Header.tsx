"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { VscSignOut } from "react-icons/vsc";
import dynamic from "next/dynamic";

const LobbyHeaderButton = dynamic(
  () => import("../playerslobby/LobbyHeaderButton"),
  {
    ssr: false,
  },
);

export default function Header() {
  const { user, leave, isLeaving, leaveError } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-wood-surface border-b-[6px] border-wood-border h-20 flex items-center justify-between px-6 lg:px-10 shadow-lg font-sans">
      <div className="flex items-center gap-2">
        <Link href="/" className="group flex items-center">
          <span className="font-black text-2xl tracking-wide uppercase text-wood-accent drop-shadow-sm group-hover:text-wood-text-primary transition-colors">
            Selfaware
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <LobbyHeaderButton />

        <ThemeToggle />

        <div className="hidden sm:block w-1 h-8 bg-wood-border rounded-full"></div>

        <div className="hidden sm:flex items-center gap-4">
          <span className="text-xs font-bold text-wood-text-muted uppercase tracking-widest">
            ორგანიზატორი ხართ?
          </span>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-5 py-2.5 bg-wood-base border-2 border-wood-border text-wood-text-primary rounded-md font-bold text-sm uppercase tracking-wide hover:border-wood-accent hover:text-wood-accent transition-colors"
              >
                სისტემა
              </Link>

              <button
                onClick={() => leave()}
                disabled={isLeaving}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-transparent text-wood-text-secondary hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-md font-bold text-sm uppercase tracking-wide transition-all"
                title="სისტემიდან გამოსვლა"
              >
                <VscSignOut className="text-xl" />
                <span>გამოსვლა</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="group flex items-center gap-2 px-6 py-2.5 bg-wood-text-primary text-wood-primary rounded-md font-bold text-sm uppercase tracking-widest transition-all shadow-[0_4px_0_var(--tw-shadow-color)] shadow-wood-border hover:translate-y-[2px] hover:shadow-[0_2px_0_var(--tw-shadow-color)]"
            >
              შესვლა
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
