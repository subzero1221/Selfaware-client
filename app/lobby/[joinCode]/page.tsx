import LobbyForPlayers from "@/components/playerslobby/LobbyForPlayers";

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ joinCode: string }>;
}) {
  const { joinCode } = await params;

  return <LobbyForPlayers joinCode={joinCode} />;
}
