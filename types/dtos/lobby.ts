interface LobbyDto {
  lobbyId: string;
  hostId: string;
  joinCode: string;
  state: LobbyState;
  players: LobbyPlayerDto[];
  createdAt: string;
  quizId?: string;
}

interface LobbyPlayerDto {
  id: string;
  nickName: string;
  joinedAt: string;
  isReady: boolean;
}

interface JoinLobbyDto {
  nickname: string;
  joinCode: string;
}

interface KickLobbyPlayerDto {
  id: string;
  joinCode: string;
}

enum LobbyState {
  waiting = 0,
  active = 1,
  finished = 2,
}
