// รายละเอียดเกม 
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/data/games";
import type { Game, GameStatus } from "@/types/game";

// ทำ Dynamic Route
type GamePageProps = {
  params: Promise<{ id: string }>; // ใช้ Promise เพื่อให้แน่ใจว่า(รอ) params จะถูกส่งมาอย่างถูกต้อง id ต้องเป็น string
};

const statusLabels: Record<GameStatus, string> = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};
// คอมโพเนนต์ GameDetailPage ใช้สำหรับแสดงผลหน้ารายละเอียดของเกมแต่ละเกม โดยดึงข้อมูลตาม id ที่ได้รับมาจาก params
export default function GameDetailPage({ params }: GamePageProps) {
  const { id } = use(params); // ดึง id จาก params โดยใช้ use 
  const [game, setGame] = useState<Game | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    //  Promise.resolve().then() เพื่อให้แน่ใจว่าโค้ดภายในจะทำงานหลังจากการ render ครั้งแรก
    Promise.resolve().then(() => {  // .resolve() สร้าง Promise ที่สำเร็จทันที และ .then() จะเรียกใช้ callback function หลังจาก Promise สำเร็จ
      let storedGames: Game[] = [];

      try {
        const storedGamesValue = localStorage.getItem("my_games"); // ดึงข้อมูลจาก localStorage 
        const parsedGames: unknown = storedGamesValue // ถ้า storedGamesValue มีข้อมูล  จะทำการใช้ JSON.parse แปลงข้อความให้กลายเป็นข้อมูลแบบ Array ถ้าไม่มีค่า จะเป็น array ว่าง
          ? JSON.parse(storedGamesValue)
          : [];
        storedGames = Array.isArray(parsedGames) ? parsedGames : []; // ตรวจสอบว่า parsedGames เป็น array หรือไม่ 
      } catch {
        storedGames = [];
      }

      if (!cancelled) {
        const availableGames = storedGames.length > 0 ? storedGames : games; // ถ้า storedGames มีข้อมูล จะใช้ storedGames แต่ถ้าไม่มีข้อมูล จะใช้ games ที่ import มาจาก "@/data/games"
        setGame(availableGames.find((item) => item.id === id) ?? null); // ค้นหาเกมที่ตรงกับ id ที่ได้รับจาก params ถ้าไม่พบจะตั้งค่าเป็น null
      }
    });

    // ฟังก์ชัน cleanup เมื่อผู้ใช้ย้อนกลับตอนกำลังโหลดข้อมูลเกม เพื่อป้องกันการอัปเดต state หลังจาก component ถูก unmounted
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (game === null) {
    notFound();
  }

  // ถ้า game เป็น undefined แสดงว่ากำลังโหลดข้อมูลเกมอยู่ ให้ return null เพื่อไม่แสดงอะไรในขณะนั้น
  if (game === undefined) {
    return null;
  }

  return (
    <main className="gameDetailPage">
      <Link className="gameDetailBack" href="/game">
        กลับไปที่รายการเกม
      </Link>
      <article className="gameDetail">
        <p className="gameDetailEyebrow">รายละเอียดเกม</p>
        <h1>{game.title}</h1>
        <div className="gameDetailStats">
          <div className="gameDetailStat">
            <span>แพลตฟอร์ม</span>
            <strong>{game.platform}</strong>
          </div>
          <div className="gameDetailStat">
            <span>เวลาที่คาดว่าจะใช้เล่น</span>
            <strong>{game.hours} ชั่วโมง</strong>
          </div>
          <div className="gameDetailStat">
            <span>สถานะ</span>
            <strong className={`gameStatus gameStatus--${game.status}`}>
              {statusLabels[game.status]}
            </strong>
          </div>
        </div>
      </article>
    </main>
  );
}
