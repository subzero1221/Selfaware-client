export interface GameDto {
  id: string;
  quizId: string;
  currentQuestionIndex: number;
  players: GamePlayerDto[];
  state: SessionState;
  currentQuestion?: ActiveQuestionDto | null;
  totalQuestions?: number | null;
  timeLimitSeconds?: number | null;
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
  playerId: string;
  nickName: string;
  joinedAt: string;
  isReady: boolean;
  state: PlayerState;
  score: number;
  streak: number;
}

export enum SessionState {
  Answering = 0,
  ShowingLeaderBoard = 1,
  Finished = 2,
}

export enum PlayerState {
  Answering = 0,
  Answered = 1,
  Disconnected = 2,
}
