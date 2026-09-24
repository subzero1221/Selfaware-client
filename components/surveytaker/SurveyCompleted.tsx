"use client";

import { useState } from "react";
import { Check, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import SurveySessionResult from "./SurveySessionResult";

interface SurveyCompletedProps {
  surveySessionId: string;
  nickName?: string | undefined;
  onDone?: (nickname?: string) => void;
}

export default function SurveyCompleted({
  surveySessionId,
  nickName,
  onDone,
}: SurveyCompletedProps) {
  const [nickname, setNickname] = useState(nickName);
  const [showResult, setShowResult] = useState<boolean>(false);

  const router = useRouter();

  const handleDone = () => {
    console.log("Saving nickname:", nickname, "for session:", surveySessionId);
    if (onDone) onDone(nickname);
    router.push("/");
  };

  const noNickName = nickName == "" || !nickName;
  console.log("nickname:", nickName);

  if (showResult) {
    return <SurveySessionResult surveySessionId={surveySessionId} onDone={handleDone} />;
  }

  return (
    <main className="flex-grow flex flex-col justify-center items-center p-4 w-full animate-fade-in">
      <div className="w-full max-w-2xl bg-wood-surface border-4 border-wood-border rounded-[2.5rem] p-8 md:p-12 text-center shadow-[8px_12px_0_0_var(--color-wood-section-shadow)] transform transition-transform hover:-translate-y-1 rotate-1 mb-10">
        <div className="flex justify-center mb-6"></div>
        <h2 className="text-3xl md:text-5xl font-black tracking-wide text-wood-text-primary drop-shadow-[0_4px_0_var(--color-wood-shadow)] leading-relaxed">
          გამოკითხვა დასრულდა!
        </h2>
        <p className="mt-4 text-xl md:text-2xl font-bold text-wood-text-primary/80">
          მადლობა მონაწილეობისთვის
        </p>
      </div>
      {noNickName ? (
        <div className="w-full max-w-md flex flex-col gap-3 -rotate-1 mb-12">
          <label className="font-black text-xl text-wood-text-primary ml-2 drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">
            შეიყვანეთ ნიკნეიმი (არასავალდებულო)
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder=""
            className="w-full px-6 py-4 bg-wood-surface border-4 border-wood-border border-b-[8px] rounded-2xl font-bold text-xl text-wood-text-primary shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] focus:outline-none focus:translate-y-1 focus:border-b-4 focus:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] transition-all placeholder:text-gray-400"
          />
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center pb-6">
        <button
          onClick={() => setShowResult(true)}
          className="flex-1 flex cursor-pointer items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#118AB2] text-white border-4 border-wood-border font-black text-xl md:text-2xl uppercase tracking-wider shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-2 transition-all"
        >
          <Eye size={28} strokeWidth={3} />
          ჩემი პასუხები
        </button>

        <button
          onClick={handleDone}
          className="flex-1 flex cursor-pointer items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#06D6A0] text-amber-950 border-4 border-wood-border font-black text-xl md:text-2xl uppercase tracking-wider shadow-[4px_6px_0_0_var(--color-wood-section-shadow)] hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-wood-section-shadow)] active:translate-y-[2px] active:shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1 transition-all"
        >
          <Check size={28} strokeWidth={4} />
          დასრულება
        </button>
      </div>
    </main>
  );
}
