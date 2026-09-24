"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import NeoErrorMessage from "@/components/ui/NeoErrorMessage";
import { Mail, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, isRegistring, registerError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);

    register(
      { email, password, passwordConfirm },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
      },
    );
  };

  if (isSubmitted && !registerError) {
    return (
      <div className="w-full max-w-md mx-auto bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-8 md:p-10 shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] transform transition-transform hover:-translate-y-1 text-center -rotate-1">
        <div className="inline-flex items-center justify-center bg-[#06D6A0] border-4 border-wood-border text-amber-950 p-4 rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-3 mb-6">
          <CheckCircle2 size={40} strokeWidth={3} />
        </div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-wood-text-primary mb-4 drop-shadow-[0_2px_0_var(--color-wood-shadow)]">
          შეტყობინება გაიგზავნა
        </h1>
        <div className="bg-white/50 border-4 border-wood-border p-4 rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] mb-8 rotate-1">
          <p className="font-bold text-sm md:text-base text-wood-text-primary leading-relaxed">
            რეგისტრაციის დასასრულებლად გთხოვთ შეამოწმოთ მითითებული ელ-ფოსტა და
            მიჰყვეთ აქტივაციის ბმულს.
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all border-4 border-wood-border bg-[#FFD166] text-amber-950 shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)]"
        >
          ← ავტორიზაციაზე დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto select-none">
      {registerError && (
        <div className="mb-6">
          <NeoErrorMessage message={registerError} />
        </div>
      )}

      <div className="bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-6 md:p-10 shadow-[8px_12px_0_0_var(--color-wood-section-shadow)]">
        <header className="text-center mb-8 relative">
          <div className="inline-block bg-[#EF476F] border-4 border-wood-border text-white px-6 py-2 rounded-xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-2 mb-2">
            <h1 className="text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">
              რეგისტრაცია
            </h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                size={24}
                className="text-wood-text-primary/50 group-focus-within:text-[#118AB2] transition-colors"
                strokeWidth={3}
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ელ-ფოსტა"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border-4 border-wood-border rounded-2xl text-lg font-bold placeholder:text-wood-text-primary/40 focus:outline-none focus:bg-slate-200 focus:border-[#118AB2] focus:ring-0 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <KeyRound
                size={24}
                className="text-wood-text-primary/50 group-focus-within:text-[#118AB2] transition-colors"
                strokeWidth={3}
              />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="პაროლი"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border-4 border-wood-border rounded-2xl text-lg font-bold placeholder:text-wood-text-primary/40 focus:outline-none focus:bg-slate-200 focus:border-[#118AB2] focus:ring-0 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <KeyRound
                size={24}
                className="text-wood-text-primary/50 group-focus-within:text-[#118AB2] transition-colors"
                strokeWidth={3}
              />
            </div>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="გაიმეორეთ პაროლი"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border-4 border-wood-border rounded-2xl text-lg font-bold placeholder:text-wood-text-primary/40 focus:outline-none focus:bg-slate-200 focus:border-[#118AB2] focus:ring-0 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isRegistring}
            className={`
              mt-2 flex items-center cursor-pointer justify-center gap-3 w-full py-4 rounded-2xl font-black text-xl uppercase tracking-wider transition-all
              border-4 border-wood-border shadow-[4px_6px_0_0_var(--color-wood-section-shadow)]
              ${
                isRegistring
                  ? "bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed"
                  : "bg-[#06D6A0] text-amber-950 hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1"
              }
            `}
          >
            {isRegistring ? "მუშავდება..." : "რეგისტრაცია"}
            {!isRegistring && <ArrowRight size={24} strokeWidth={4} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-4 border-wood-border border-dashed flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-bold">
          <span className="text-wood-text-primary/70 uppercase tracking-widest">
            გაქვთ ანგარიში?
          </span>
          <Link
            href="/auth/signin"
            className="inline-flex items-center px-4 py-2 bg-[#118AB2] border-2 border-wood-border rounded-xl text-white shadow-[2px_2px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-wood-section-shadow)] active:translate-y-[1px] active:shadow-[1px_1px_0_0_var(--color-wood-section-shadow)] transition-all uppercase tracking-wider -rotate-1"
          >
            შესვლა
          </Link>
        </div>
      </div>
    </div>
  );
}
