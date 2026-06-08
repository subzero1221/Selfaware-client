"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient, tryRefresh } from "@/lib/apiClient";
import {
  SigninDto,
  SignupDto,
  AuthResponseDto,
  ConfirmEmailDto,
  UserProfile,
} from "@/types/dtos/auth";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const refreshFailed =
    typeof window !== "undefined" &&
    sessionStorage.getItem("refreshFailed") === "true";

  const {
    data: user,
    isLoading: isUserLoading,
    error,
  } = useQuery<UserProfile | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await apiClient<ApiResponse<UserProfile>>("/user/me");
        return res.data;
      } catch {
        if (refreshFailed) return null;
        const refreshed = await tryRefresh();
        if (!refreshed) {
          window.location.href = "/auth/signin";
          return null;
        }

        const res = await apiClient<ApiResponse<UserProfile>>("/user/me");
        return res.data;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: SigninDto) =>
      apiClient<ApiResponse<AuthResponseDto>>("/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: SignupDto) =>
      apiClient<ApiResponse<AuthResponseDto>>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      router.push("/verify-email?email=" + variables.email);
    },
  });

  const confirmMutation = useMutation({
    mutationFn: (payload: ConfirmEmailDto) =>
      apiClient<ApiResponse<null>>("/auth/confirm-email", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Email confirmation error:", error);
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () =>
      apiClient<ApiResponse<null>>("/auth/signout", {
        method: "POST",
        body: JSON.stringify(""),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      localStorage.removeItem("QuizDraft");
      router.push("/");
    },
    onError: (error: any) => {
      console.error("signout error:", error);
    },
  });

  return {
    user,
    isUserLoading,
    error,
    join: loginMutation.mutate,
    isJoining: loginMutation.isPending,
    joinError: loginMutation.error?.message || null,
    register: registerMutation.mutate,
    isRegistring: registerMutation.isPending,
    registerError: registerMutation.error?.message || null,
    confirmEmail: confirmMutation.mutate,
    isConfirming: confirmMutation.isPending,
    confirmError: confirmMutation.error?.message || null,
    leave: leaveMutation.mutate,
    isLeaving: leaveMutation.isPending,
    leaveError: leaveMutation.error?.message || null,
  };
}
