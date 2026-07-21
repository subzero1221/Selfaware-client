import HostGame from "@/components/dashboard/game/HostGame";

interface PageProps {
  params: Promise<{
    joinCode: string;
  }>;
}

export default async function HostGamePage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const joinCode = params.joinCode;

  return <HostGame joinCode={joinCode} />;
}
