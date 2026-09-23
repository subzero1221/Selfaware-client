import { ActiveSurveyDto } from "./survey";

export interface SurveySessionDto {
  id: string;
  surveyId: string;
  survey: ActiveSurveyDto;
  anonymousToken: string;
  startedAt: string;
  isCompleted: boolean;
  nickname?: string;
  userId?: string;
  completedAt?: string;
}

export interface StartSurveySessionDto {
  surveyId: string;
  nickName?: string;
}

export interface SubmitSurveyAnswerDto {
  surveySessionId: string;
  questionId: string;
  optionId?: string | null;
  userId?: string;
}

export interface UserAnswerDto {
  questionId: string;
  optionId: string;
  submitedAt: string;
  userId?: string;
}

export interface OptionResultDto {
  id: string;
  text: string;
  voteCount: number;
  imageUrl?: string;
  imagePublicId?: string;
}

export interface QuestionResultDto {
  id: string;
  text: string;
  order: number;
  totalVotes: number;
  options: OptionResultDto;
  imageUrl?: string;
  imagePublicId?: string;
}

export interface NextQuestionResponseDto {
  question?: QuestionResultDto;
  isCompleted: boolean;
}

export interface UserAnswerDto {
  Id: string;
  surveySessionId: string;
  questionId: string;
  optionId: string;
  submittedAt: string;
}

export interface SurveySessionResultDto {
  questions: QuestionResultDto[];
  userAnswers: UserAnswerDto[];
}

export function calculatePercent(total: number, current: number) {
  if (current === 0) return 0;
  return Math.round((current / total) * 100 * 10) / 10;
}
