"use client";

import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface GameQuestionImageProps {
  imageUrl?: string | null;
  alt?: string;
}

export default function GameQuestionImage({
  imageUrl,
  alt = "კითხვის სურათი",
}: GameQuestionImageProps) {
  if (!imageUrl) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 md:mb-10 relative z-10 flex justify-center">
      <div className="relative group w-full px-4 md:px-12">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#FFD166] border-4 border-wood-border shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-2 z-20"></div>

        <div className="bg-white border-4 border-wood-border p-3 md:p-5 pb-6 md:pb-8 rounded-3xl shadow-[8px_10px_0_0_var(--color-wood-section-shadow)] transform transition-transform duration-300 hover:-translate-y-2 hover:-rotate-1 -rotate-1">
          <div className="relative rounded-2xl overflow-hidden border-4 border-wood-border bg-wood-base/50 flex items-center justify-center min-h-[200px] md:min-h-[300px] max-h-[400px]">
            <Image
              src={imageUrl}
              alt={alt}
              className="w-full h-full max-h-[400px] object-contain z-10"
              width={800}
              height={400}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />

            <div className="hidden absolute inset-0 flex-col items-center justify-center text-wood-border gap-3 bg-wood-surface z-0">
              <ImageIcon size={48} strokeWidth={2} className="animate-pulse" />
              <span className="font-black uppercase tracking-widest text-sm md:text-base border-2 border-wood-border px-3 py-1 bg-white text-wood-surface rounded-xl rotate-2">
                სურათი ვერ ჩაიტვირთა
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
