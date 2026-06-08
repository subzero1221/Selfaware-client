"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { VscSignOut } from "react-icons/vsc";


export default function Header() {
  const { user, leave, isLeaving, leaveError } = useAuth();


  return (
    <nav className="w-full bg-wood-surface border-b-[6px] border-wood-border h-20 flex items-center justify-between px-6 shadow-md transition-colors duration-300">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="font-serif font-bold text-lg tracking-wider uppercase text-wood-accent drop-shadow-sm hover:text-wood-text-primary transition-colors"
        >
          Selfaware <span className="text-wood-text-muted"></span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />

        <div className="hidden sm:flex items-center space-between-3 gap-8">
          <span className="text-xs font-serif text-wood-text-muted uppercase tracking-widest">
            ორგანიზატორი ხართ?
          </span>

          {user ? (
            <div>
              <Link
                href="/dashboard"
                className="
          bg-wood-base border-2 border-wood-border-focus text-wood-text-primary 
          px-5 py-2.5 rounded-sm text-xs font-bold font-serif uppercase tracking-widest"
              >
                სისტემა
              </Link>
              <button
                onClick={() => {
                  leave();
                }}
                className="
         cursor-pointer  hover:text-red-500 hover:border-wood-accent 
          px-5 py-2.5 rounded-sm text-xs font-bold font-serif uppercase tracking-widest"
          title={"სისტემიდან გამოსვლა"}
              >
                <VscSignOut className="inline mr-2" />
                გამოსვლა
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="
          bg-wood-base border-2 border-wood-border-focus text-wood-text-primary 
          px-5 py-2.5 rounded-sm text-sm font-bold font-serif uppercase tracking-widest 
          shadow-lg hover:bg-wood-accent hover:text-wood-base hover:border-wood-accent 
          active:translate-y-0.5 transition-all duration-200
        "
            >
              პანელში შესვლა →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
