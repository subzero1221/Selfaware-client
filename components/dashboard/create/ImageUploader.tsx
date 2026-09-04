"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import useUploadSignature from "@/hooks/Quizzes/useUploadSignature";

interface ImageUploaderProps {
  imageUrl?: string;
  onImageSelect: (data: {
    imageUrl: string | null;
    publicId: string | null;
  }) => void;
}

//ეს წავა უკვე შექნილი ქუიზისთვის სურათის დამატებვშოც, არ დაგავიწყდეს კლეო//
export default function ImageUploader({
  imageUrl,
  onImageSelect,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: uploadSignatureData, isLoading: isSignatureLoading } =
    useUploadSignature();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);

    const auth = uploadSignatureData;
    if (!auth) {
      setErrorMessage(
        "სერვერთან დაკავშირება ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.",
      );
      setIsUploading(false);
      return;
    }

    console.log("Uploading file to Cloudinary:", file, "with auth:", auth);

    try {
      const result = await uploadToCloudinary(file, auth);
      onImageSelect({
        imageUrl: result.imageUrl,
        publicId: result.publicId,
      });
    } catch (err: any) {
      console.error("Cloudinary Upload Error:", err);
      setErrorMessage(err.message || "სურათის ატვირთვა ვერ მოხერხდა");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onImageSelect({ imageUrl: null, publicId: null });
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 mb-2">
      <label className="text-sm font-black text-wood-text-primary uppercase tracking-wide">
        სურათის დამატება (არასავალდებულო)
      </label>

      {imageUrl ? (
        <div className="relative border-4 border-brutal-dark rounded-2xl overflow-hidden shadow-[4px_4px_0_0_var(--color-brutal-dark)] w-fit group">
          <Image
            src={imageUrl}
            alt="Question Attachment Preview"
            className="max-h-48 w-auto object-cover"
            width={300}
            height={200}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute cursor-pointer top-2 right-2 bg-brutal-red text-white border-2 border-brutal-dark px-3 py-1 rounded-xl font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0_0_var(--color-brutal-dark)] opacity-90 hover:opacity-100"
          >
            ✕ წაშლა
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-fit cursor-pointer bg-brutal-yellow border-4 border-brutal-dark px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider text-brutal-dark shadow-[4px_4px_0_0_var(--color-brutal-dark)] hover:-translate-y-1 hover:shadow-[4px_8px_0_0_var(--color-brutal-dark)] active:translate-y-[2px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] disabled:opacity-50 disabled:pointer-events-none transition-all rotate-1 hover:rotate-0"
          >
            {isUploading ? "იტვირთება..." : "+ ატვირთე სურათი"}
          </button>

          {isUploading && (
            <div className="w-6 h-6 border-4 border-brutal-dark border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}

      {errorMessage && (
        <p className="text-xs font-bold text-brutal-red uppercase tracking-wider mt-1">
          ⚠️ {errorMessage}
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
