import { QuizType, SettingsField } from "../enums/quizEnums";

export interface QuizUploadedResponse {
  quizId: string;
  title: string;
  description: string;
  slug: string;
  questionCount: number;
  quizType: string;
}

export interface QuizzesResponse {
  quizzes: QuizDetailResponse[];
}

export interface QuestionDto {
  id: string;
  text: string;
  questionType: string;
  imageUrl?: string;
  imagePublicId?: string;
  options: AiOption[];
}

export interface QuizDetailResponse {
  id: string;
  title: string;
  description: string;
  slug: string;
  timeInMinutes: number;
  questionCount: number;
  quizStatus: number;
  quizType: QuizType;
  questions: QuestionDto[];
}

export interface CreateQuizDto {
  title: string;
  description: string;
  timeLimitInMinutes: number;
  questions: QuestionDto[];
  questionCount: number;
}

export interface AiOption {
  id: string;
  text: string;
  score: number;
}

export interface AiQuestion {
  text: string;
  options: AiOption[];
}

export interface AiQuizResponse {
  quizId: string;
  questions: AiQuestion[];
}

////for quiz editing

export interface QuizEditSettingsDto {
  field: SettingsField;
  value?: string;
  quizType?: string;
}

export interface QuestionEditDto {
  text: string;
  options: AiOption[];
}

//cloudinary/media
export interface UploadSignatureData {
  signature: string;
  timestamp: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}
