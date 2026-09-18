import { AiOption } from "./quiz";
import { ActiveSurveyDto } from "./survey";

export interface SurveySessionDto {
  id: string;
  surveyId: string;
  survey: ActiveSurveyDto;
  anonymousToken: string;
  startedAt: string;
  isCompleted: boolean;
  nickName?: string;
  userId?: string;
  completedAt?: string;
}

export interface StartSurveySessionDto {
  surveyId: string;
  nickName?: string;
}

export interface SubmitSurveyAnswerDto {
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
