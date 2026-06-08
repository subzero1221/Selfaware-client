export interface SignupDto {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface SigninDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  data: T;
  message: string;
}

export interface ConfirmEmailDto {
  userId: string;
  code: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  bio: string;
  createdAt: string;
  updatedAt: string | null;
}