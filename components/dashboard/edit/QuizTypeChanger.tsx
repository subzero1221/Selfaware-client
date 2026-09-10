import { QuizType } from "@/types/enums/quizEnums";

interface QuizTypeProps {
  setQuizType: (type: QuizType) => void;
  quizType: QuizType;
}

export default function QuizTypeChanger({
  setQuizType,
  quizType,
}: QuizTypeProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-wood-text-primary uppercase tracking-wider ml-1">
        ტიპი
      </label>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-1 gap-3">
          <button
            type="button"
            onClick={() => setQuizType(0)}
            className={`flex-1 border-4 cursor-pointer border-wood-border rounded-2xl font-black text-sm md:text-base uppercase tracking-wider transition-all py-3 px-4 ${
              quizType === QuizType.Knowledge
                ? "bg-brutal-green text-brutal-dark translate-y-[4px] shadow-[0px_0px_0_0_var(--color-wood-border)]"
                : "bg-gray-50 text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-wood-border)]"
            }`}
          >
            Knowledge
          </button>
          <button
            type="button"
            onClick={() => setQuizType(1)}
            className={`flex-1 border-4 cursor-pointer border-wood-border rounded-2xl font-black text-sm md:text-base uppercase tracking-wider transition-all py-3 px-4 ${
              quizType === QuizType.Survey
                ? "bg-brutal-green text-brutal-dark translate-y-[4px] shadow-[0px_0px_0_0_var(--color-wood-border)]"
                : "bg-gray-50 text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-wood-border)]"
            }`}
          >
            Survey
          </button>
        </div>
      </div>
    </div>
  );
}
