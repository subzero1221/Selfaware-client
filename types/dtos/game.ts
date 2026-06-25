export interface GameDto {
  id: string;
  quizId: string;
  currentQuestion: ActiveQuestionDto;
  currentQuestionIndex: number;
  players: GamePlayerDto[];
  state: SessionState;
  totalQuestions: number;
  timeLimitSeconds: number;
}

export interface ActiveQuestionDto {
  id: string;
  text: string;
  options: ActiveOptionDto[];
}

export interface ActiveOptionDto {
  id: string;
  text: string;
}

export interface GamePlayerDto {
  id: string;
  nickName: string;
  joinedAt: string;
  isReady: boolean;
}

export enum SessionState {
  Answering = 0,
  ShowingLeaderBoard = 1,
  Finished = 2,
}
