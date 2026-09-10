"use client";
import Button from "@/components/ui/Button";
import { QuestionDto } from "@/types/dtos/quiz";
import { useState } from "react";
import OptionEditor from "./OptionEditor";
import QuestionImagePreview from "./QuestionImagePreview";
import useEditQuestion from "@/hooks/Quizzes/useEditQuestion";
import useDeleteQuestion from "@/hooks/Quizzes/useDeleteQuestion";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ImageUploader from "@/components/dashboard/edit/ImageUploader";

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
  const { mutate: editQuestion, isPending: editingQuestion } = useEditQuestion(
    quizId,
    question.id,
  );

  const { mutate: deleteQuestion, isPending: deletingQuestion } =
    useDeleteQuestion(quizId, question.id);

  const [currentQuestion, setCurrentQuestion] = useState(question);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toggleEditMode = () => {
    setEditingId((prev) => (prev == question.id ? null : question.id));
    setCurrentQuestion(question);
  };

  const isEditing = editingId === question.id;

  const handleQuestionTextChange = (value: string) => {
    setCurrentQuestion((prev) => ({ ...prev, text: value }));
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

  const handleImageChange = (data: {
    imageUrl: string | null;
    publicId: string | null;
  }) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      imageUrl: data.imageUrl || undefined,
      imagePublicId: data.publicId || undefined,
    }));
  };

  const handleQuestionSave = () => {
    editQuestion(currentQuestion);

    setEditingId(null);
  };

  const handleDelete = () => {
    deleteQuestion(undefined, {
      onSuccess: () => {
        setDeleteModal(false);
      },
    });
  };

  return (
    <div
      className={`relative bg-wood-surface border-4 border-wood-border rounded-3xl p-6 md:p-8 transition-all duration-300 space-y-6 ${
        isEditing
          ? "shadow-[6px_12px_0_0_var(--color-wood-border)] -translate-y-2 ring-4 ring-wood-border/20"
          : "shadow-[6px_8px_0_0_var(--color-wood-border)] hover:-translate-y-2 hover:shadow-[6px_12px_0_0_var(--color-wood-border)]"
      } group`}
    >
      <button
        onClick={() => setDeleteModal(true)}
        className="absolute cursor-pointer -top-4 -right-2 md:-right-4 bg-brutal-red text-white border-4 border-brutal-dark px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-brutal-dark)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-brutal-dark)] hover:scale-105 transition-all z-10 rotate-3 hover:rotate-0"
      >
        ✕ წაშლა
      </button>

      <button
        onClick={toggleEditMode}
        className={`absolute cursor-pointer -top-4 right-28 md:right-32 border-4 border-wood-border px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] active:translate-y-[4px] active:shadow-[0px_0px_0_0_var(--color-wood-border)] hover:scale-105 transition-all z-10 -rotate-2 hover:rotate-0 ${
          isEditing
            ? "bg-white text-wood-text-options"
            : "bg-wood-accent text-white"
        }`}
      >
        {isEditing ? "✕ გაუქმება" : "✎ შეცვლა"}
      </button>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm md:text-base font-black text-wood-text-primary uppercase tracking-wide bg-brutal-blue text-white w-fit px-3 py-1 rounded-lg border-2 border-wood-border -rotate-1 mb-2">
          კითხვა {globalIndex + 1}
        </label>

        <QuestionImagePreview imageUrl={currentQuestion.imageUrl} />

        {isEditing && (
          <ImageUploader
            onImageSelect={handleImageChange}
            imageUrl={currentQuestion.imageUrl}
          />
        )}

        <input
          type="text"
          value={currentQuestion.text}
          disabled={!isEditing}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          placeholder="ჩაწერეთ კითხვა აქ..."
          className="w-full bg-gray-50 border-4 border-wood-border px-4 py-3 rounded-2xl font-black text-lg text-wood-text-options shadow-[4px_4px_0_0_var(--color-wood-border)] focus:outline-none focus:translate-y-[4px] focus:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all placeholder:text-wood-text-options/30 disabled:opacity-80 disabled:cursor-not-allowed"
        />
      </div>

      <div className="h-0.5 bg-wood-border w-full my-4" />

      <div className="space-y-4 pt-4 relative">
        <p className="text-sm font-bold text-wood-text-primary uppercase tracking-wider mb-4">
          სავარაუდო პასუხები (მონიშნეთ სწორი):
        </p>

        {currentQuestion?.options?.map((opt, oIndex) => (
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
        ))}
      </div>

      {isEditing && (
        <div className="flex justify-end pt-4">
          <Button
            type="button"
            size="md"
            onClick={handleQuestionSave}
            disabled={editingQuestion}
            className="bg-wood-accent text-white border-4 border-wood-border px-8 py-3 rounded-2xl font-black text-base uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-wood-border)] hover:translate-y-[4px] hover:shadow-[0px_0px_0_0_var(--color-wood-border)] transition-all"
          >
            {editingQuestion ? "ინახება..." : "✓ შენახვა"}
          </Button>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        isLoading={deletingQuestion}
        onConfirm={handleDelete}
        title="წაშლა"
        description="დარწმუნებული ხართ რომ გსურთ ამ კითხვის სამუდამოდ წაშლა?"
        confirmText="წაშლა"
        variant="danger"
      />
    </div>
  );
}
