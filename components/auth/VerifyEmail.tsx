"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "your inbox";
  const [isResending, setIsResending] = useState(false);

  const handleResend = () => {
    setIsResending(true);

    setTimeout(() => {
      setIsResending(false);
      alert("A new scroll has been dispatched!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-wood-base flex items-center justify-center p-4 transition-colors duration-300">
  
      <div className="relative max-w-md w-full bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-300">
    
        <div className="absolute inset-0 border border-wood-border-focus/50 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none transition-colors duration-300"></div>

        <div className="relative p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 mb-6 rounded-full bg-red-800 border-4 border-red-950 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),_0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center transform -rotate-12 transition-colors duration-300">
            <svg
              className="w-10 h-10 text-red-200 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-serif font-bold text-wood-text-primary drop-shadow-md mb-2 tracking-wide transition-colors duration-300">
            დაადასტურე ელ.ფოსტა
          </h2>

          <p className="text-wood-text-secondary mb-6 leading-relaxed font-medium transition-colors duration-300">
            ჩვენ გამოვაგზავნეთ შეტყობინება მისამართზე <br />
           
            <span className="text-wood-accent font-bold bg-wood-base/50 px-2 py-1 rounded border border-wood-border block mt-2 transition-colors duration-300">
              {email}
            </span>
          </p>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-wood-border to-transparent mb-6 transition-colors duration-300"></div>

          <p className="text-sm text-wood-text-muted mb-6 transition-colors duration-300">
            If it eludes you, check your spam or junk folder. The messengers
            sometimes get lost.
          </p>

          <button
            onClick={handleResend}
            disabled={isResending}
            className={`
              w-full py-3 px-4 font-bold font-serif tracking-wider text-wood-text-primary
              bg-wood-surface border-2 border-wood-border-focus rounded shadow-lg
              hover:bg-wood-surface-hover hover:shadow-xl hover:border-wood-accent
              active:translate-y-1
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isResending ? "Forging new link..." : "Resend Verification"}
          </button>

          <Link
            href="/"
            className="mt-6 text-sm text-wood-text-muted hover:text-wood-accent transition-colors underline decoration-wood-accent/30 underline-offset-4"
          >
            Return to the main gates
          </Link>
        </div>
      </div>
    </div>
  );
}
