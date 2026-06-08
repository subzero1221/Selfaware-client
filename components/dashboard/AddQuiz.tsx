"use client";
import BulkQuizUpload from "./BulkQuizUpload";
import AiQuizUpload from "./AiQuizUpload";


export default function QuizUploadManager() {
 

  return (
    <div className="w-full max-w-full mx-auto p-4 md:p-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif font-bold text-wood-text-primary drop-shadow-md">
          ტესტების მართვის პანელი
        </h2>
        <p className="text-wood-text-secondary mt-2 font-mono text-sm">
          აირჩიეთ ატვირთვის სასურველი მეთოდი
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <BulkQuizUpload />

        <AiQuizUpload />
      </div>
    </div>
  );
}
