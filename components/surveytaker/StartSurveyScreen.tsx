"use client";

import { useState } from "react";
import { Play, User, AtSign } from "lucide-react";
import useStartSurveySession from "@/hooks/surveySession/useStartSurveySession";
import { useRouter } from "next/navigation";
import NeoErrorMessage from "../ui/NeoErrorMessage";

interface SurveyStartScreenProps {
  surveyTitle: string;
  surveyId: string;
  shareCode: string;
  anonymous: boolean;
}

export default function StartSurveyScreen({
  surveyTitle,
  surveyId,
  shareCode,
  anonymous,
}: SurveyStartScreenProps) {
  const {
    mutateAsync: startSurveySession,
    isPending: isStartingSession,
    isError: startingError,
    error,
  } = useStartSurveySession();
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");


  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("questionOrder", "0");
    localStorage.setItem("questionCount", "1");
    const finalNickname = nickname.trim() === "" ? null : nickname.trim();

    const res = await startSurveySession({
      surveyId: surveyId,
      nickName: finalNickname || undefined,
      email,
    });

    router.push(`/survey/${shareCode}/session/${res.data.id}`);
  };

  console.log(startingError);

  return (
    <div className="dark select-none bg-wood-base relative min-h-screen w-full text-wood-text-primary flex flex-col font-sans overflow-hidden items-center justify-center p-4">
      {startingError && (
        <div className="w-full max-w-xl">
          <NeoErrorMessage message={error?.message || startingError} />
        </div>
      )}
      <div className="w-full max-w-xl bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-8 md:p-12 shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] transform transition-transform hover:-translate-y-1">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-[#EF476F] border-4 border-wood-border text-white p-4 rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2 mb-6">
            <Play size={40} strokeWidth={3} className="ml-1" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-wide text-wood-text-primary drop-shadow-[0_4px_0_var(--color-wood-shadow)] leading-tight">
            {surveyTitle}
          </h1>
          <p className="mt-4 text-wood-text-primary/80 font-bold uppercase tracking-widest text-sm">
            მზად ხართ დასაწყებად?
          </p>
        </header>

        <form onSubmit={handleStart} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User
                size={24}
                className="text-wood-text-primary/50 group-focus-within:text-[#118AB2] transition-colors"
              />
            </div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="შეიყვანეთ სახელი (სურვილისამებრ)"
              maxLength={20}
              className="w-full pl-12 pr-4 py-4 bg-white/50 border-4 border-wood-border rounded-2xl text-xl font-bold placeholder:text-wood-text-primary/40 focus:outline-none focus:bg-slate-400 focus:border-[#118AB2] focus:ring-0 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] transition-all"
            />
          </div>

          {!anonymous && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <AtSign
                  size={24}
                  className="text-wood-text-primary/50 group-focus-within:text-[#118AB2] transition-colors"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="შეიყვანეთ Email"
                maxLength={20}
                className="w-full pl-12 pr-4 py-4 bg-white/50 border-4 border-wood-border rounded-2xl text-xl font-bold placeholder:text-wood-text-primary/40 focus:outline-none focus:bg-slate-400 focus:border-[#118AB2] focus:ring-0 shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isStartingSession}
            className={`
              flex items-center cursor-pointer justify-center gap-3 w-full py-4 rounded-2xl font-black text-xl uppercase tracking-wider transition-all
              border-4 border-wood-border shadow-[4px_6px_0_0_var(--color-wood-section-shadow)]
              ${
                isStartingSession
                  ? "bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed"
                  : "bg-[#06D6A0] text-amber-950 hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1"
              }
            `}
          >
            {isStartingSession ? "იწყება..." : "დაწყება"}
            {!isStartingSession && <Play size={24} strokeWidth={4} />}
          </button>
        </form>
      </div>
    </div>
  );
}
