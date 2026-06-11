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
    <div
      key={currentQuestionId + oIndex}
      className="flex items-center gap-3 w-full"
    >
      <input
        type="radio"
        disabled={!isEditing}
        name={`live-correct-answer-${globalIndex}`}
        checked={isCorrect}
        onChange={() => handleOptionRadioChange(oIndex)}
        className="w-5 h-5 accent-wood-accent cursor-pointer bg-wood-base border-2 border-wood-border focus:ring-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <input
        type="text"
        value={option.text}
        disabled={!isEditing}
        onChange={(e) => handleOptionTextChange(oIndex, e.target.value)}
        className={`w-full flex-1 px-4 py-2 rounded shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.5)] font-mono text-sm focus:outline-none transition-all border-2 ${
          isCorrect
            ? "border-green-700 bg-green-950/20 text-green-200 focus:border-green-500"
            : "bg-wood-base border-wood-border text-wood-text-primary focus:border-wood-accent focus:ring-1 focus:ring-wood-accent"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      />
    </div>
  );
}
