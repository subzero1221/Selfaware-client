import { AiOption } from "@/types/dtos/quiz";

interface OptionEditorProps {
  option: AiOption;
  currentQuestionId: string;
  handleOptionTextChange: (oIndex: number, value: string) => void;
  handleOptionRadioChange: (oIndex: number) => void;
  isEditing: boolean;
  globalIndex: number;
  oIndex: number;
}

export default function OptionEditor({
  option,
  currentQuestionId,
  handleOptionTextChange,
  handleOptionRadioChange,
  isEditing,
  globalIndex,
  oIndex,
}: OptionEditorProps) {
  const isCorrect = option.score === 1;

  return (
    <div key={currentQuestionId + oIndex} className="flex items-center gap-4">
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="radio"
          disabled={!isEditing}
          name={`live-correct-answer-${globalIndex}`}
          checked={isCorrect}
          onChange={() => handleOptionRadioChange(oIndex)}
          className="peer w-8 h-8 opacity-0 absolute cursor-pointer z-10 disabled:cursor-not-allowed"
        />
        <div
          className={`w-8 h-8 border-4 border-wood-border rounded-full shadow-[2px_2px_0_0_var(--color-wood-border)] transition-all ${
            isCorrect ? "bg-brutal-green" : "bg-white"
          } ${!isEditing && "opacity-70"}`}
        />
        {isCorrect && (
          <div className="absolute w-3 h-3 bg-white rounded-full pointer-events-none" />
        )}
      </div>

      <input
        type="text"
        value={option.text}
        disabled={!isEditing}
        placeholder={`პასუხი ${oIndex + 1}`}
        onChange={(e) => handleOptionTextChange(oIndex, e.target.value)}
        className={`w-full px-4 py-3 rounded-2xl font-bold text-base focus:outline-none transition-all border-4 shadow-[4px_4px_0_0_var(--color-wood-border)] disabled:shadow-[4px_4px_0_0_var(--color-wood-border)] disabled:opacity-80 disabled:cursor-not-allowed ${
          isCorrect
            ? "border-wood-border bg-brutal-green text-white placeholder:text-white/60"
            : "bg-white border-wood-border text-wood-text-options placeholder:text-wood-text-options/30"
        } ${
          isEditing
            ? "focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)]"
            : ""
        }`}
      />
    </div>
  );
}
