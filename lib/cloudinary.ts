import { UploadSignatureData } from "@/types/dtos/quiz";

export interface CloudinaryUploadResult {
  imageUrl: string;
  publicId: string;
}

export async function uploadToCloudinary(
  file: File,
  auth: UploadSignatureData,
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  console.log("Cloudinary Cloud Name:", cloudName);

  if (!cloudName) {
    throw new Error("Missing Cloudinary environment variables in .env.local");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", auth.apiKey);
  formData.append("timestamp", auth.timestamp);
  formData.append("signature", auth.signature);
  formData.append("folder", auth.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || "Failed to upload image to Cloudinary.",
    );
  }

  const data = await response.json();

  return {
    imageUrl: data.secure_url,
    publicId: data.public_id,
  };
}
