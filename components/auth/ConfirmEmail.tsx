'use client';

import {useAuth} from "@/hooks/useAuth";




interface ConfirmEmailContentProps {
  userId: string;
  code: string;
}

export default function ConfirmEmailContent({ userId, code }: ConfirmEmailContentProps) {
  const {confirmEmail, isConfirming, confirmError} = useAuth();


  const handleActivation = () => {
    if (!userId || !code) return;
    console.log("USER id:", userId);
    confirmEmail({ userId, code });
  };

  const isMissingParams = !userId || !code;

  return (
    <div className="min-h-screen bg-wood-base text-wood-text-primary grid place-items-center p-4 transition-colors duration-300 selection:bg-wood-accent selection:text-wood-base">
      <div className="relative w-full max-w-md bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden text-center transition-colors duration-300">
        <div className="absolute inset-0 border border-wood-border-focus/50 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none transition-colors duration-300"></div>

        <div className="relative p-8">
          <div className="h-1 w-20 bg-wood-border-focus mx-auto mb-6 rounded-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />

          <h1 className="font-serif text-2xl font-bold tracking-wide text-wood-text-primary drop-shadow-md uppercase mb-2">
            ანგარიშის გააქტიურება
          </h1>
          <p className="font-sans text-sm text-wood-text-secondary max-w-xs mx-auto mb-8 leading-relaxed">
            სისტემაში შესასვლელად და ტესტირების პლატფორმაზე წვდომისთვის გთხოვთ
            დაადასტუროთ თქვენი ელ-ფოსტა.
          </p>

          {isMissingParams ? (
            <div className="bg-red-950/80 border-2 border-red-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] rounded-sm p-4 text-left font-mono text-sm text-red-300 mb-6">
              <span className="font-bold block uppercase mb-1 text-red-500">
                ✕ ხარვეზი:
              </span>
              აქტივაციის ბმული არასრულია. გთხოვთ გადაამოწმოთ ელ-ფოსტაზე მოსული
              შეტყობინება.
            </div>
          ) : (
            <div className="space-y-5">
              {confirmError && (
                <div className="bg-red-950/80 border-2 border-red-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] rounded-sm p-4 text-left font-mono text-sm text-red-300">
                  <span className="font-bold text-red-500 pr-2">✕</span>
                  {confirmError || "აქტივაცია ვერ განხორციელდა."}
                </div>
              )}

              <button
                type="button"
                onClick={handleActivation}
                disabled={isConfirming}
                className="w-full py-3.5 px-4 cursor-pointer font-bold font-serif tracking-wider text-wood-text-primary uppercase bg-wood-surface border-2 border-wood-border-focus rounded shadow-lg hover:bg-wood-surface-hover hover:shadow-xl hover:border-wood-accent hover:text-wood-accent active:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConfirming ? "მუშავდება..." : "აქტივაციის დასრულება ↵"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}