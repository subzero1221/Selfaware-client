import LobbyForPlayers from "@/components/playerslobby/LobbyForPlayers";

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ Id: string }>;
}) {
  const { Id } = await params;

  return <LobbyForPlayers joinCode={Id} />;
}
