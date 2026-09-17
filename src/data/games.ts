// ข้อมูลเกม
import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: "ark",
    title: "Ark: Survival Evolved",
    platform: "PC",
    hours: 3,
    status: "completed",
  },
  {
    id: "rdr2",
    title: "Red Dead Redemption 2",
    platform: "PC",
    hours: 4,
    status: "playing",
  },
  {
    id: "rov",
    title: "Arena of Valor",
    platform: "Mobile",
    hours: 3,
    status: "not-started",
  },
  {
    id: "minecraft",
    title: "Minecraft",
    platform: "PC",
    hours: 2,
    status: "playing",
  },
  {
    id: "fc_mobile",
    title: "EA Sports FC Mobile",
    platform: "Mobile",
    hours: 1,
    status: "not-started",
  },
];
