import Button from "@/components/ui/Button";
import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary";
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "დარწმუნებული ხართ? // Are you sure?",
  description = "ამ მოქმედების გაუქმება შეუძლებელია. // This action cannot be undone.",
  confirmText = "დასტური // Confirm",
  cancelText = "გაუქმება // Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getConfirmButtonStyles = () => {
    if (variant === "danger") {
      return "font-mono text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 border border-red-900/40 bg-red-950/20 px-4 py-2 rounded-sm shadow-sm active:scale-95 transition-transform";
    }
    return "font-serif text-sm px-4 py-2 shadow-md border-2 border-wood-accent text-wood-accent-text active:scale-95 transition-transform";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={isLoading ? undefined : onClose}
      />

      <div
        className={`relative max-w-md w-full bg-wood-surface border-[6px] rounded-sm p-6 md:p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-200 ${
          variant === "danger" ? "border-red-900/50" : "border-wood-border"
        }`}
      >
        <div className="absolute inset-0 border border-wood-border-focus/40 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] pointer-events-none"></div>

        <div className="flex flex-col gap-2 relative">
          <h2 className="text-base md:text-lg font-serif font-bold text-wood-text-primary tracking-wide flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                variant === "danger"
                  ? "bg-red-500 animate-pulse"
                  : "bg-amber-500"
              }`}
            ></span>
            {title}
          </h2>
          <p className="text-xs md:text-sm font-mono text-wood-text-secondary leading-relaxed bg-wood-base/40 p-3 rounded border border-wood-border/30 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)]">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-wood-border-focus/20 relative">
          <Button
            variant="secondary"
            type="button"
            size="sm"
            disabled={isLoading}
            onClick={onClose}
            className="font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm shadow-sm border border-wood-border hover:bg-wood-base transition-colors"
          >
            {cancelText}
          </Button>

          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            type="button"
            size="sm"
            disabled={isLoading}
            onClick={onConfirm}
            className={getConfirmButtonStyles()}
          >
            {isLoading ? "მიმდინარეობს... // Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
