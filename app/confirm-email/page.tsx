
import { Suspense } from 'react';
import ConfirmEmailContent from "@/components/auth/ConfirmEmail";

interface PageProps {
  searchParams: Promise<{
    userId?: string;
    code?: string;
  }>;
}

export default async function ConfirmEmailPage({ searchParams }: PageProps) {
 
  const resolvedParams = await searchParams;
  const userId = resolvedParams.userId || "";
  const code = resolvedParams.code || "";

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#121110] text-[#9C938A] grid place-items-center font-mono text-xs">
        იტვირთება...
      </div>
    }>
      <ConfirmEmailContent userId={userId} code={code} />
    </Suspense>
  );
}