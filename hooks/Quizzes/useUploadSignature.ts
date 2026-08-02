import { UploadSignatureData } from "@/types/dtos/quiz";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "./useQuiz";

export default function useUploadSignature() {
  return useQuery<UploadSignatureData>({
    queryKey: ["upload-signature"],
    queryFn: () =>
      apiClient<ApiResponse<UploadSignatureData>>(
        `/media/upload-signature?folder=question-image`,
      ).then((res) => res.data),
    retry: false,
    staleTime: 1000 * 60 * 15,
    gcTime: 15 * 60 * 1000,
  });
}
