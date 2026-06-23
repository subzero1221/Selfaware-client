import Link from "next/link";
import JoinGameForm from "./dashboard/game/JoinGameForm";
import Footer from "./ui/Footer";



export default function LandingPage() {
  return (
    <div className="min-h-screen bg-wood-base w-full text-wood-text-primary flex flex-col font-sans selection:bg-violet-500/30 selection:text-white">
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 flex flex-col justify-center py-20 md:py-32">
        <h1 className="text-4xl md:text-3xl font-bold tracking-tight text-wood-accent leading-[1.15] max-w-4xl mb-6">
          მართე გუნდის ძლიერი მხარეები <br className="hidden md:block" />
          <span className="text-wood-accent bg-clip-text text-transparent">
            ინტერაქტიული ქვიზებით.
          </span>
        </h1>

        <p className="text-wood-text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          შექმენი დინამიური, დროში შეზღუდული ფსიქოლოგიური და აკადემიური ტესტები.
          გააზიარე ბმული წამებში, რეგისტრაციის ბარიერის გარეშე. კორპორატიული
          Kahoot-ის ალტერნატივა.
        </p>

    
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-24">
          <Link
            href="/dashboard"
            className="bg-white text-wood-accent px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-center hover:bg-gray-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] flex items-center justify-center h-[52px]"
          >
            დაიწყე უფასოდ
          </Link>

        
          <JoinGameForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-wood-border pt-12">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-wood-accent">
              სწრაფი წვდომა
            </h3>
            <p className="text-sm text-wood-text-muted leading-relaxed">
              თანამშრომლებს არ სჭირდებათ პაროლების შექმნა. სახელი, ელ-ფოსტა და
              ისინი უკვე თამაშში არიან.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-wood-accent">
              ლაივ ლიდერბორდი
            </h3>
            <p className="text-sm text-wood-text-muted leading-relaxed">
              აკონტროლე შედეგები რეალურ დროში. მიიღე სრული სტატისტიკა თითოეულ
              გუნდზე.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-wood-accent">
              დროის ლიმიტები
            </h3>
            <p className="text-sm text-wood-text-muted leading-relaxed">
              ოპტიმიზირებული ტაიმერები, რომლებიც უზრუნველყოფენ ტესტირების
              სამართლიანობას.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
