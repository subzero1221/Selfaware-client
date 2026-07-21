import { GameDto } from "@/types/dtos/game";

export default function HostGameInfo({ game }: { game: GameDto }) {
  return (
    <div className="bg-wood-base p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Game Info</h2>
      <p className="mb-2">
        <span className="font-semibold">Quiz Title:</span> {game.state}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Total Questions:</span>{" "}
        {game.totalQuestions}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Current Question:</span>{" "}
        {game.currentQuestion?.text}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Time Limit (seconds):</span>{" "}
        {game.timeLimitSeconds}
      </p>
      <ul className="list-disc list-inside">
        <li>Player List</li>
        {game.players.map((player) => (
          <li key={player.playerId}>
            {player.nickName || `Player ${player.playerId}`} - Score:{" "}
            {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
