export default function Card() {
  return (
    <div className="bg-wood-base min-h-screen p-8 flex items-center justify-center">
    
      <div className="bg-wood-surface border border-wood-border max-w-md w-full p-6 rounded-2xl transition-all hover:bg-wood-surface-hover hover:border-wood-border-focus group">
    
        <span className="text-[10px] font-mono tracking-wider text-wood-text-muted uppercase block mb-2">
          ქვიზის მენეჯერი
        </span>

     
        <h3 className="text-lg font-bold text-wood-text-primary mb-3">
          ახალი ტესტის შექმნა
        </h3>

        <p className="text-sm text-wood-text-secondary leading-relaxed mb-6">
          შეიყვანეთ ქვიზის დასახელება და დროის ლიმიტები. ცვლილებები ავტომატურად
          შეინახება ბაზაში.
        </p>

        
        <button className="w-full bg-wood-accent text-wood-base font-semibold py-3 rounded-xl text-sm transition-all shadow-[0_4px_20px_var(--color-wood-accent-glow)] group-hover:scale-[1.01] active:scale-[0.99]">
          გაგრძელება
        </button>
      </div>
    </div>
  );
}
