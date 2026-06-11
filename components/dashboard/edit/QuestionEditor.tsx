import Button from "@/components/ui/Button";
import { QuestionDto } from "@/types/dtos/quiz";
import { useState } from "react";
import OptionEditor from "./OptionEditor";
import useEditQuestion from "@/hooks/Quizzes/useEditQuestion";

interface QuestionEditorProps {
  question: QuestionDto;
  quizId: string;

  globalIndex: number;
}

export default function QuestionEditor({
  question,
  quizId,
  globalIndex,
}: QuestionEditorProps) {
  const {
    mutate: editQuestion,
    isPending: editingQuestion,
    error,
  } = useEditQuestion(quizId, question.id);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionDto>(question);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleEditMode = () => {
    setEditingId((prev) => (prev == question.id ? null : question.id));
    setCurrentQuestion(question);
  };

  const isEditing = editingId === question.id;

  const handleQuestionTextChange = (value: string) => {
    setCurrentQuestion((question) => ({ ...question, text: value }));
  };

  const handleOptionTextChange = (oIndex: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) =>
        idx === oIndex ? { ...opt, text: value } : opt,
      ),
    }));
  };

  const handleOptionRadioChange = (oIndex: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) =>
        idx === oIndex ? { ...opt, score: 1 } : { ...opt, score: 0 },
      ),
    }));
  };

  const handleQuestionSave = () => {
    editQuestion(currentQuestion);
    console.log("updating question:", currentQuestion);
    setEditingId((prev) => (prev = null));
  };

  return (
    <div
      key={question.id}
      className={`relative bg-wood-surface border-[6px] rounded-sm shadow-[0_3px_6px_rgba(0,0,0,0.8)] p-6 md:p-8 overflow-hidden transition-all duration-300 space-y-6 ${
        isEditing
          ? "border-wood-accent/70 shadow-[0_0_15px_rgba(214,142,57,0.2)]"
          : "border-wood-border"
      }`}
    >
      <div className="absolute inset-0 border border-wood-border-focus/40 shadow-[inset_0_0_6px_rgba(0,0,0,0.5)] pointer-events-none"></div>

      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Button
          variant={isEditing ? "secondary" : "primary"}
          type="button"
          size="sm"
          onClick={() => toggleEditMode()}
          className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm"
        >
          {isEditing ? "გაუქმება // Cancel" : "შეცვლა // Edit"}
        </Button>

        <Button
          variant="danger"
          type="button"
          size="sm"
          // onClick={() => onDeleteQuestion(q.id)}
          className="font-mono text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 border border-red-900/40 bg-red-950/20 px-2 py-1 rounded-sm shadow-sm"
        >
          წაშლა
        </Button>
      </div>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${isEditing ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`}
          ></span>
          კითხვა // Question {globalIndex + 1}
        </label>
        <input
          type="text"
          value={currentQuestion.text}
          disabled={!isEditing}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          className="w-full bg-wood-base border-2 border-wood-border px-4 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-wood-border-focus/20 relative">
        <p className="text-xs font-serif font-semibold text-wood-text-muted uppercase tracking-wider">
          სავარაუდო პასუხები:
        </p>

        {currentQuestion.options.map((opt, oIndex) => {
          return (
            <OptionEditor
              key={opt.id}
              handleOptionTextChange={handleOptionTextChange}
              handleOptionRadioChange={handleOptionRadioChange}
              globalIndex={globalIndex}
              currentQuestionId={question.id}
              oIndex={oIndex}
              option={opt}
              isEditing={isEditing}
            />
          );
        })}
      </div>

      {isEditing && (
        <div className="flex justify-end pt-4 border-t border-wood-border-focus/20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Button
            type="button"
            size="md"
            onClick={() => handleQuestionSave()}
            className="font-serif text-sm px-6 py-2 shadow-md transition-transform active:scale-95 border-2 border-wood-accent text-wood-accent-text"
          >
            ცვლილებების შენახვა // Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
