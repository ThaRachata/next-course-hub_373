import type { Metadata } from "next";
import GameExplorer from "@/components/GameExplorer";
import { games } from "@/data/games";

export const metadata: Metadata = {
  title: "Game Backlog",
};

export default function GamePage() {
  return (
    <main className="page gamePage">
      <h1>Game Backlog</h1>
      <GameExplorer initialGames={games} />
    </main>
  );
}
