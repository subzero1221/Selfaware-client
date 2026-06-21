"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProfileSettings from "./ProfileSettings";
import SystemPanel from "./SystemPanel";
import DashboardNavigation from "./DashboardNavigation";
import { activeTab } from "@/types/dtos/dashboard";
import Link from "next/link";
import MyQuizzes from "./mycabinetquizzes/MyCabinetQuizzes";
import AddQuiz from "./AddQuiz";
import GameDashboard from "./game/GameDashboard";

export default function DashboardWorkspace() {
  const { user, isUserLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<activeTab>("overview");

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-wood-base flex items-center justify-center">
        <span className="font-mono text-xs text-wood-text-muted animate-pulse uppercase tracking-widest">
          სისტემის ჩატვირთვა...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pb-12 bg-wood-base text-wood-text-primary flex flex-col justify-between p-6 font-sans selection:bg-wood-accent/20">
        <main className="max-w-md w-full mx-auto text-center my-auto flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-wood-text-primary mb-4 leading-tight">
            წვდომა შეზღუდულია
          </h1>

          <p className="text-wood-text-secondary text-sm md:text-base leading-relaxed mb-10 max-w-sm">
            თქვენ არ გაქვთ წვდომა ამ გვერდზე. გთხოვთ, შეხვიდეთ სისტემაში.
          </p>

          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center bg-wood-accent text-wood-base font-bold px-8 py-3.5 rounded-xl text-sm tracking-wide transition-all duration-200 hover:opacity-95 shadow-[0_4px_20px_var(--color-wood-accent-glow)] active:scale-[0.98]"
          >
            შესვლა / რეგისტრაცია
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-wood-base text-wood-text-primary flex flex-col md:flex-row  antialiased font-sans">
      <DashboardNavigation
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-full overflow-y-auto">
        {activeTab === "overview" && <SystemPanel />}
        {activeTab === "myQuizzes" && <MyQuizzes />}
        {activeTab === "addQuiz" && <AddQuiz />}
        {activeTab === "settings" && <ProfileSettings user={user} />}
        {activeTab == "game" && <GameDashboard />}
      </main>
    </div>
  );
}
