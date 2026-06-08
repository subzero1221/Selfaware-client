"use client";
import useAiUpload from "@/hooks/Quizzes/useAiUpload";
import React, { useRef, useState } from "react";

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
      fileInputRef.current.value = "null";
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    mutate(formData);
  };

  return (
    <div className="relative max-w-xl w-full bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 border border-wood-border-focus/50 shadow-[inset_0_0_5px_rgba(0,0,0,0.6)] pointer-events-none transition-colors duration-300"></div>

      <div className="relative p-8 flex flex-col">
        {error && (
          <div className="bg-red-950/80 border-2 border-red-900 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] text-red-300 p-4 rounded-sm text-sm font-mono mb-6 uppercase tracking-wide flex items-start gap-2">
            <span className="text-red-500 font-bold">⚠️</span>
            <span>ხარვეზი // {error.message}</span>
          </div>
        )}
        <form onSubmit={handleAiSubmit} className="space-y-5">
          <div className="border-b-2 border-wood-border-focus/40 pb-4 mb-6 relative">
            <h3 className="font-serif text-xl font-bold tracking-wide text-wood-text-primary drop-shadow-md flex items-center gap-3">
              <span className="text-2xl drop-shadow-lg">🤖</span>
              AI ტესტის გენერაცია (PDF / Word)
            </h3>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wood-border-focus to-transparent"></div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
              ინსტრუქცია AI-სთვის (სურვილისამებრ)
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="მაგ: შექმენი 10 რთული კითხვა მხოლოდ მე-3 თავიდან..."
              rows={2}
              className="bg-wood-base border-2 border-wood-border px-4 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all placeholder:text-wood-text-muted/50 resize-none"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
              აირჩიეთ სასწავლო მასალა
            </label>
            <div className="bg-wood-base/50 p-2 border border-wood-border/50 rounded shadow-inner">
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx"
                required
                className="w-full font-mono text-xs text-wood-text-muted 
              file:mr-4 file:py-2.5 file:px-5 file:rounded file:border-2 file:border-wood-border-focus 
              file:text-xs file:font-serif file:font-bold file:tracking-wider file:uppercase 
              file:bg-wood-surface file:text-wood-text-primary file:cursor-pointer file:shadow-md 
              hover:file:bg-wood-surface-hover hover:file:border-wood-accent hover:file:text-wood-accent 
              file:transition-all cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`
          w-full mt-6 py-3.5 px-4 font-bold font-serif tracking-wider text-wood-text-primary uppercase
          bg-wood-surface border-2 border-wood-border-focus rounded shadow-lg
          hover:bg-wood-surface-hover hover:shadow-xl hover:border-wood-accent hover:text-wood-accent
          active:translate-y-1
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        `}
          >
            {isPending ? "AI კითხულობს დოკუმენტს..." : "გენერაცია ↵"}
          </button>
        </form>
      </div>
    </div>
  );
}
