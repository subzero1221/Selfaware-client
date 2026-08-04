"use client";

import BulkQuizUpload from "./BulkQuizUpload";
import AiQuizUpload from "./AiQuizUpload";
import {FilePlus} from "lucide-react";

export default function QuizUploadManager() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center space-y-4 flex flex-col items-center">
        <h2 className="inline-block  bg-brutal-yellow text-brutal-dark border-4 border-brutal-dark px-6 py-3 rounded-2xl font-black text-2xl md:text-4xl uppercase tracking-wider shadow-[6px_6px_0_0_var(--color-wood-section-shadow)] -rotate-1">
          <div className="flex items-center justify-center gap-3">
            {" "}
            ტესტების მართვის პანელი{" "}
            <FilePlus size={32} strokeWidth={3} className="text-brutal-dark" />
          </div>
        </h2>
        <p className="bg-wood-surface text-wood-text-primary font-black text-xs md:text-sm uppercase tracking-widest border-2 border-brutal-dark px-4 py-1.5 rounded-xl shadow-[3px_3px_0_0_var(--color-wood-section-shadow)] rotate-1 w-fit">
          აირჩიეთ ატვირთვის სასურველი მეთოდი
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">
        {/* <BulkQuizUpload /> */}
        <AiQuizUpload />
      </div>
    </div>
  );
}
