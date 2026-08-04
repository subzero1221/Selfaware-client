"use client";

import useAiUpload from "@/hooks/Quizzes/useAiUpload";
import React, { useRef, useState } from "react";
import { Bot, Play, CircleEllipsis } from "lucide-react";

export default function AiQuizUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [instructions, setInstructions] = useState("");

  const { mutate, isPending, error } = useAiUpload();

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) {
      return alert("გთხოვთ, აირჩიოთ დოკუმენტი AI-სთვის!");
    }

    const MAX_FILE_SIZE_MB = 1;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (fileInputRef.current?.files?.[0].size > MAX_FILE_SIZE_BYTES) {
      alert(
        `File is too large! Please upload a file smaller than ${MAX_FILE_SIZE_MB}MB.`,
      );
      fileInputRef.current.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    mutate(formData);
  };

  return (
    <div className="relative w-full max-w-xl bg-wood-surface border-4 border-brutal-dark rounded-3xl p-6 md:p-8 shadow-[6px_8px_0_0_var(--color-wood-section-shadow)] transition-all duration-300">
      {error && (
        <div className="bg-brutal-red text-white border-4 border-brutal-dark p-4 rounded-2xl font-black text-sm uppercase tracking-wide mb-6 shadow-[4px_4px_0_0_var(--color-brutal-dark)] flex items-center gap-3 rotate-1">
          <span className="text-xl bg-wood-surface text-brutal-dark w-7 h-7 rounded-lg border-2 border-brutal-dark flex items-center justify-center font-black">
            !
          </span>
          <span>ხარვეზი // {error.message}</span>
        </div>
      )}

      <form onSubmit={handleAiSubmit} className="space-y-6">
        <div className="border-b-4 border-wood-border pb-4">
          <div className="inline-flex items-center gap-3 bg-brutal-blue text-wood-text-primary border-4 border-brutal-dark px-4 py-2 rounded-xl font-black text-lg md:text-xl uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -rotate-1">
            <span className="text-2xl">
              <Bot />
            </span>
            <span>AI ტესტის გენერაცია</span>
          </div>
          <p className="text-xs font-black text-wood-text-primary uppercase tracking-wide mt-3 ml-1">
            (PDF / Word დოკუმენტები)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs md:text-sm font-black text-brutal-dark uppercase tracking-wide bg-brutal-yellow text-brutal-dark w-fit px-3 py-1 rounded-lg border-2 border-brutal-dark -rotate-1">
            ინსტრუქცია AI-სთვის (სურვილისამებრ)
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="მაგ: შექმენი 10 რთული კითხვა მხოლოდ მე-3 თავიდან..."
            rows={3}
            className="w-full bg-gray-50 border-4 border-brutal-dark px-4 py-3 rounded-2xl font-bold text-sm text-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)] focus:outline-none focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_var(--color-brutal-dark)] transition-all placeholder:text-brutal-dark/30 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs md:text-sm font-black text-brutal-dark uppercase tracking-wide bg-brutal-blue text-wood-text-primary w-fit px-3 py-1 rounded-lg border-2 border-brutal-dark rotate-1">
            აირჩიეთ სასწავლო მასალა
          </label>
          <div className="bg-gray-50 p-3 border-4 border-brutal-dark rounded-2xl shadow-[4px_4px_0_0_var(--color-brutal-dark)]">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              required
              className="w-full text-xs font-black text-brutal-dark cursor-pointer
                file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-brutal-dark 
                file:text-xs file:font-black file:uppercase file:tracking-wider 
                file:bg-brutal-yellow file:text-brutal-dark file:cursor-pointer file:shadow-[2px_2px_0_0_var(--color-brutal-dark)]
                hover:file:bg-brutal-green hover:file:translate-y-[-1px] 
                file:transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-4 py-4 px-6 bg-brutal-green text-brutal-dark border-4 border-brutal-dark rounded-2xl font-black text-base md:text-lg uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-green)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-brutal-green)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? (
            <CircleEllipsis />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Play />
              <span className="ml-2">გენერაცია</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
