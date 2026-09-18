import { QuizType } from "@/types/enums/quizEnums";

export interface ActiveSurveyDto {
  id: string;
  quiz: QuizForSurveyDto;
  shareCode: string;
  completedBy: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  lastActivatedAt: string;
}

export interface ActivateSurveyDto {
  quizId: string;
  DurationInDays: number;
  AllowAnonymous: boolean;
}

export interface QuizForSurveyDto {
  quizId: string;
  quizType: QuizType;
  quizStatus: string;
  questionCount: number;
  Description?: string;
  title?: string;
}

export type SurveysResponse = ActiveSurveyDto[];
