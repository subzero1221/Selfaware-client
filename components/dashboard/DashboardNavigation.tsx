"use client";

import { UserProfile } from "@/types/dtos/auth";
import { activeTab } from "@/types/dtos/dashboard";
import { BarChart2, Brain, FilePlus, Gamepad2, UserCog } from "lucide-react";

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
    <aside className="w-full md:w-72 bg-wood-surface border-b-[6px] md:border-b-0 md:border-r-[6px] border-wood-border p-6 flex flex-col justify-between shrink-0 transition-colors duration-300 z-10">
      <div className="space-y-8">
        <div className="p-4 bg-wood-base border-4 border-wood-border rounded-2xl shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] rotate-1 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-brutal-yellow border-4 border-wood-border text-brutal-dark font-black text-xl flex items-center justify-center uppercase shadow-[2px_2px_0_0_var(--color-wood-section-shadow)] -rotate-3">
              {user?.email?.charAt(0) || "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-wood-text-primary truncate uppercase tracking-wide drop-shadow-sm">
                {user?.displayName || "User"}
              </p>
              <p className="text-[10px] font-bold text-wood-text-muted uppercase tracking-widest truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-3 font-sans text-sm uppercase tracking-wider">
          {[
            {
              id: "overview",
              label: "სისტემა",
              icon: BarChart2,
              color: "bg-brutal-blue",
            },
            {
              id: "myQuizzes",
              label: "ჩემი კითხვარები",
              icon: Brain,
              color: "bg-brutal-yellow",
            },
            {
              id: "addQuiz",
              label: "კითხვარის დამატება",
              icon: FilePlus,
              color: "bg-brutal-green",
            },
            {
              id: "game",
              label: "თამაში",
              icon: Gamepad2,
              color: "bg-brutal-red",
            },
            {
              id: "settings",
              label: "პროფილის მართვა",
              icon: UserCog,
              color: "bg-wood-accent",
            },
          ].map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as activeTab)}
                className={`
                  group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left font-black transition-all duration-200 cursor-pointer
                  border-4 
                  ${
                    isActive
                      ? `${item.color} border-brutal-dark text-brutal-dark shadow-[4px_4px_0_0_var(--color-wood-section-shadow)] -translate-y-1 active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]`
                      : "bg-transparent border-transparent text-wood-text-secondary hover:bg-wood-surface-hover hover:border-wood-border hover:text-wood-text-primary hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-wood-section-shadow)]"
                  }
                `}
              >
                <item.icon
                  strokeWidth={isActive ? 3 : 2.5}
                  size={20}
                  className={`shrink-0 ${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}
                />
                <span className="mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-10 pt-6 flex justify-center opacity-50">
        <div className="w-16 h-2 bg-wood-border rounded-full -rotate-2"></div>
      </div>
    </aside>
  );
}
