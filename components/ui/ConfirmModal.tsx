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
  title = "დარწმუნებული ხართ?",
  description = "ამ მოქმედების გაუქმება შეუძლებელია.",
  confirmText = "დასტური",
  cancelText = "გაუქმება",
  variant = "danger",
  isLoading = false,
}: ConfirmationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;


  const variantStyles = {
    danger: "bg-[#EF476F] hover:bg-[#D93655]", 
    warning: "bg-[#FFD166] hover:bg-[#E5BC5C]", 
    primary: "bg-[#06D6A0] hover:bg-[#05C291]", 
  };

  const currentVariantBg = variantStyles[variant] || variantStyles.danger;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
     
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={isLoading ? undefined : onClose}
      />

  
      <div className="relative w-full max-w-md bg-white border-4 border-amber-950 rounded-3xl p-6 md:p-8 flex flex-col shadow-[8px_8px_0_0_rgba(67,20,7,1)] overflow-hidden animate-in zoom-in-95 duration-200">
      
        <h2
          id="confirm-modal-title"
          className="text-xl font-black text-amber-950 mb-4 border-b-4 border-amber-950 pb-4 tracking-wide uppercase"
        >
          {title}
        </h2>

        <p
          id="confirm-modal-description"
          className="text-sm font-bold text-amber-950/80 mb-8 leading-relaxed"
        >
          {description}
        </p>

       
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-auto">
    
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center border-4 border-amber-950 shadow-[4px_6px_0_0_rgba(67,20,7,1)] bg-white hover:bg-gray-100 text-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

       
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`w-full sm:w-auto py-3.5 px-6 rounded-2xl font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center border-4 border-amber-950 shadow-[4px_6px_0_0_rgba(67,20,7,1)] text-amber-950 border-b-[8px] active:border-b-4 active:translate-y-[4px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${currentVariantBg}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                <span>მიმდინარეობს...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
