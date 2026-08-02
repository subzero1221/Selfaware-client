import Image from "next/image";

interface QuestionImagePreviewProps {
  imageUrl?: string | null;
}

export default function QuestionImagePreview({
  imageUrl,
}: QuestionImagePreviewProps) {
  console.log("QuestionImagePreview imageUrl:", imageUrl);
  if (!imageUrl) return null;

  return (
    <div className="relative bg-white border-4 border-brutal-dark rounded-2xl overflow-hidden shadow-[4px_4px_0_0_var(--color-brutal-dark)] w-fit group mb-4">
      <Image
        src={imageUrl}
        alt="Question Attachment"
        className="max-h-64 w-auto object-cover"
        width={500}
        height={300}
      />
      <div className="absolute top-2 left-2 bg-brutal-yellow text-brutal-dark font-black text-xs px-3 py-1 rounded-lg border-2 border-brutal-dark uppercase tracking-widest shadow-[2px_2px_0_0_var(--color-brutal-dark)] -rotate-2">
        მიმაგრებული ფაილი
      </div>
    </div>
  );
}
