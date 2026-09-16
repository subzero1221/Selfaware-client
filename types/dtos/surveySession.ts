import { AiOption } from "./quiz";

export interface SurveySessionDto {
  Id: string;
  surveyId: string;
  anonymousToken: string;
  startedAt: string;
  isCompleted: boolean;
  nickName?: string;
  userId?: string;
  completedAt?: string;
}

export interface StartSurveySessionDto {
  shareCode: string;
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

export function calculatePercentsPerOption(
  options: AiOption[],
  optionId: string,
) {
  const totalVotes = options.reduce(
    (sum, option) => sum + (option.voteCount || 0),
    0,
  );
  if (totalVotes === 0) {
    return 0;
  }

  const selectedOption = options.find((option) => option.id === optionId);
  if (!selectedOption) {
    return 0;
  }

  const percentage = ((selectedOption.voteCount || 0) / totalVotes) * 100;
  return Math.round(percentage);
}
