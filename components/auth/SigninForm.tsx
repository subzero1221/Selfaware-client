"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { resetRefreshState } from "@/lib/apiClient";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { join, isJoining, joinError } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    join({ email, password });
    resetRefreshState();
  };

  return (
    <div className="w-full  p-3">
      {joinError && (
        <div className="bg-red-950/40 border-2 border-red-900 text-red-400 p-3 rounded-xl text-xs font-mono mb-4 uppercase tracking-wide">
          ხარვეზი // {joinError}
        </div>
      )}
      <div className="border-b-2 border-wood-border pb-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-wide text-wood-text-primary">
          სისტემაში შესვლა
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-wood-text-secondary">
            ელ-ფოსტა
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@selfaware.ge"
            required
            className="w-full bg-wood-base border-2 border-wood-border px-4 py-3 rounded-xl text-sm font-mono text-wood-text-primary placeholder:text-wood-text-muted/50 focus:outline-none focus:border-wood-accent transition-all duration-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-wood-text-secondary">
              პაროლი
            </label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-wood-base border-2 border-wood-border px-4 py-3 rounded-xl text-sm font-mono text-wood-text-primary placeholder:text-wood-text-muted/50 focus:outline-none focus:border-wood-accent transition-all duration-100"
          />
        </div>

        <button
          type="submit"
          disabled={isJoining}
          className="w-full bg-wood-accent text-wood-base font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wide border-2 border-wood-accent hover:bg-transparent hover:text-wood-accent transition-all duration-150 active:translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {isJoining ? (
            <span className="font-mono text-xs animate-pulse">კავშირი...</span>
          ) : (
            <span>პანელში შესვლა ↵</span>
          )}
        </button>
      </form>

      <div className="mt-8 pt-4 border-t-2 border-wood-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <span className="text-wood-text-muted font-mono text-[11px]">
          არ გაქვთ ადმინ ანგარიში?
        </span>
        <Link
          href="/auth/signup"
          className="font-semibold text-wood-text-secondary hover:text-wood-accent transition-colors font-mono uppercase text-[11px] tracking-wider"
        >
          რეგისტრაცია
        </Link>
      </div>
    </div>
  );
}
