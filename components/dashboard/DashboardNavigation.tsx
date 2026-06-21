import { UserProfile } from "@/types/dtos/auth";
import { activeTab } from "@/types/dtos/dashboard";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdAssignmentAdd, MdVideogameAsset } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdPsychologyAlt } from "react-icons/md";



export default function DashboardNavigation({
  user,
  activeTab,
  setActiveTab,
}: {
  user: UserProfile;
  activeTab: activeTab;
  setActiveTab: (tab: activeTab) => void;
}) {


  return (
    <aside className="w-full md:w-72 bg-wood-surface border-b md:border-b-0 md:border-r-[6px] border-wood-border p-6 flex flex-col justify-between shrink-0 transition-colors duration-300">
      <div className="space-y-8">
        <div className="p-4 bg-wood-base/40 border border-wood-border rounded-sm shadow-inner">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-wood-accent text-wood-base font-serif font-bold text-lg grid place-items-center uppercase shadow-md">
              {user?.email?.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-wood-text-primary truncate font-serif">
                {user?.displayName || "User"}
              </p>
              <p className="text-[10px] text-wood-text-muted uppercase tracking-widest truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-2 font-serif text-sm uppercase tracking-wider">
          {[
            { id: "overview", label: "სისტემა", icon: IoStatsChartSharp },
            {
              id: "myQuizzes",
              label: "ჩემი კითხვარები",
              icon: MdPsychologyAlt,
            },
            {
              id: "addQuiz",
              label: "კითხვარის დამატება",
              icon: MdAssignmentAdd,
            },
            {
              id: "game",
              label: "თამაში",
              icon: MdVideogameAsset,
            },
            {
              id: "settings",
              label: "პროფილის მართვა",
              icon: RiUserSettingsFill,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as activeTab)}
              className={`w-full cursor-pointer text-left px-4 py-3 rounded-sm transition-all duration-200 border-l-4 ${
                activeTab === item.id
                  ? "bg-wood-base text-wood-accent border-wood-accent shadow-md"
                  : "text-wood-text-secondary border-transparent hover:bg-wood-base/50 hover:text-wood-text-primary"
              }`}
            >
              <item.icon className="inline mr-3 text-lg" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-wood-border/30 flex justify-center">
        <div className="w-12 h-1 bg-wood-border rounded-full shadow-[0_1px_0_rgba(255,255,255,0.05)]"></div>
      </div>
    </aside>
  );
}
