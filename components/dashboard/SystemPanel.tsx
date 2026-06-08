export default function SystemPanel(){
    return (
      <div>
        <div className="mb-8"></div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="border-2 border-wood-border p-4 rounded-xl bg-wood-border/5">
              <span className="text-[10px] text-wood-text-muted uppercase block">
                სულ კანდიდატი
              </span>
              <span className="text-2xl font-bold text-wood-text-primary block mt-1">
                124
              </span>
            </div>
            <div className="border-2 border-wood-border p-4 rounded-xl bg-wood-border/5">
              <span className="text-[10px] text-wood-text-muted uppercase block">
                აქტიური ტესტი
              </span>
              <span className="text-2xl font-bold text-amber-600 block mt-1">
                12
              </span>
            </div>
            <div className="border-2 border-wood-border p-4 rounded-xl bg-wood-border/5">
              <span className="text-[10px] text-wood-text-muted uppercase block">
                დასრულებული
              </span>
              <span className="text-2xl font-bold text-wood-text-secondary block mt-1">
                89
              </span>
            </div>
          </div>

          <div className="border-2 border-wood-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-wood-border pb-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-wood-text-secondary">
                კანდიდატების აქტივობა
              </h3>
              <button className="bg-wood-accent text-wood-base font-mono text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg border border-wood-accent hover:bg-transparent hover:text-wood-accent transition-colors">
                + ახალი ტესტის შექმნა
              </button>
            </div>

            <div className="divide-y divide-wood-border/40 font-mono text-xs">
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-wood-text-primary font-sans truncate">
                  tatin71905@bezill.com
                </span>
                <span className="text-[11px] bg-amber-950/20 text-amber-500 border border-amber-900/50 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                  მიმდინარეობს
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-wood-text-primary font-sans truncate">
                  giorgi.k@corporation.ge
                </span>
                <span className="text-[11px] bg-green-950/20 text-green-500 border border-green-900/50 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                  დასრულებული
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}