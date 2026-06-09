export interface QuizUploadedResponse {
  id: string;
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
  quizType: string;
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

export interface QuizUpdateFieldDto {
  field: "title" | "description" | "timeInMinutes";
  value: string | number;
}
