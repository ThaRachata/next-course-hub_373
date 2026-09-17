// กำหนดโครงสร้างชนิดข้อมูลสำหรับเกม
export type GameStatus = "not-started" | "playing" | "completed"; // ล็อคค่าสถานะของเกมให้เป็นหนึ่งในสามค่าเท่านั้น
export type Game = {
  id: string;
  title: string;
  platform: string;
  hours: number;
  status: GameStatus;
};
