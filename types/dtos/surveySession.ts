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
