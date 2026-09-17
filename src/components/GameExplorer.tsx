// GameExplorer component
"use client";

import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";
import type { Game } from "@/types/game";

type GameExplorerProps = {
  initialGames: Game[];
};
// คอมโพเนนต์ GameExplorer รับ props ของ initialGames 
export default function GameExplorer({ initialGames = [] }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);  // รายชื่อเกมทั้งหมด
  const [storageLoaded, setStorageLoaded] = useState(false); // สำหรับตรวจสอบว่า localStorage โหลดข้อมูลเสร็จแล้วหรือยัง
  const [keyword, setKeyword] = useState("");   // สำหรับเก็บคำค้นหา
  const [platform, setPlatform] = useState(""); // สำหรับเก็บแพลตฟอร์มที่เลือก
  const [editingId, setEditingId] = useState<string | null>(null);  // สำหรับเก็บ id ของเกมที่กำลังแก้ไข ถ้าไม่มีการแก้ไขจะเป็น null
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);  // สำหรับเก็บ id ของเกมที่กำลังรอการลบ ถ้าไม่มีการลบจะเป็น null

  //  UseEffect เพื่อหน่วงเวลาให้โหลดข้อมูลจาก localStorage ก่อนที่จะ render เกมทั้งหมด
  useEffect(() => {
    Promise.resolve().then(() => { // .resolve() สร้าง Promise ที่สำเร็จทันที และ .then() จะเรียกใช้ callback function หลังจาก Promise สำเร็จ
      try {
        const storedGamesValue = localStorage.getItem("my_games");
        const parsedGames: unknown = storedGamesValue
          ? JSON.parse(storedGamesValue)  // ถ้า storedGamesValue มีข้อมูล จะทำการใช้ JSON.parse แปลงข้อความให้กลายเป็นข้อมูลแบบ Array ถ้าไม่มีค่า จะเป็น array ว่าง
          : null;

        if (Array.isArray(parsedGames)) {
          setGames(parsedGames); // ถ้าใช่ก็ Update state ของ games ด้วย parsedGames
        }
      } catch {}

      setStorageLoaded(true); // ตั้งค่า storageLoaded เป็น true เพื่อบอกว่าโหลดข้อมูลจาก localStorage เสร็จแล้ว
    });
  }, []); // useEffect จะทำงานแค่ตอนเปิดหน้าเว็บครั้งเดียว

  // เมื่อ games หรือ storageLoaded เปลี่ยนแปลง จะทำงาน useEffect เพื่อบันทึกข้อมูลเกมลงใน localStorage
  useEffect(() => {
    if (storageLoaded) { // ตรวจสอบการโหลดข้อมูลจาก localStorage เสร็จแล้วหรือยัง
      localStorage.setItem("my_games", JSON.stringify(games)); // JSON.stringify() แปลงข้อมูล games เป็น string แล้วเก็บใน localStorage
    }
  }, [games, storageLoaded]); 

  // ฟังก์ชัน handleCreate ใช้สำหรับสร้างเกมใหม่ โดยรับ draft  ของเกมเป็นพารามิเตอร์
  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(), // สร้าง id ใหม่แบบสุ่มไม่ซ้ำกัน
      title: draft.title.trim(), 
      platform: draft.platform.trim(),
      hours: Number(draft.hours),
      status: draft.status,
    };

    setGames((previousGames) => [...previousGames, newGame]); // เพิ่มเกมใหม่เข้าไปใน state ของ games โดยใช้ spread operator เพื่อคงค่าเดิมของ previousGames
  }

  // ฟังก์ชัน handleUpdate ใช้สำหรับอัปเดตข้อมูลเกม โดยรับ id ของเกมและ draft ของเกมเป็นพารามิเตอร์
  function handleUpdate(id: string, draft: GameDraft) {
    setGames((previousGames) =>
      previousGames.map((game) =>
        game.id === id // ตรวจสอบว่า id ของเกมตรงกับ id ที่ส่งเข้ามาหรือไม่ ถ้าใช่ก็อัปเดตข้อมูลเกมด้วย draft
          ? {
              ...game,
              title: draft.title.trim(),
              platform: draft.platform.trim(),
              hours: Number(draft.hours),
              status: draft.status,
            }
          : game,
      ),
    );
    setEditingId(null); // ตั้งค่า editingId เป็น null เพื่อยกเลิกการแก้ไขเกม
  }

  //  ใช้บันทึกข้อมูลเกม โดยตรวจสอบว่า editingId เป็น null หรือไม่ ถ้าเป็น null แสดงว่ากำลังสร้างเกมใหม่ ถ้าไม่เป็น null แสดงว่ากำลังแก้ไขเกมที่มีอยู่แล้ว
  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft); // ถ้า editingId ไม่เป็น null ก็จะแก้ไขแล้วเรียก handleUpdate เพื่ออัปเดตข้อมูลเกม
  }

  // ฟังก์ชัน handleDelete ใช้สำหรับลบเกม 
  function handleDelete(id: string) {
    if (pendingDeleteId !== id) {
      setPendingDeleteId(id);
      return;
    }

    setGames((previousGames) => previousGames.filter((game) => game.id !== id));
    setPendingDeleteId(null);
    if (editingId === id) { // ตรวจสอบว่าเกมที่กำลังแก้ไขตรงกับ id ของเกมที่ถูกลบหรือไม่ ถ้าใช่ก็ยกเลิกการแก้ไข
      setEditingId(null);  
    }
  }

  const editingGame = games.find((game) => game.id === editingId); // เก็บข้อมูลเกมนั้นไว้ในตัวแปร editingGame เพื่อเตรียมส่งไปให้ GameForm 
  const platforms = Array.from(
    new Set(games.map((game) => game.platform)),  // สร้าง Set ของแพลตฟอร์มจาก games เพื่อให้ได้แพลตฟอร์มที่ไม่ซ้ำกัน แล้วแปลงกลับเป็น array ด้วย Array.from()
  ).sort(); // เรียงลำดับแพลตฟอร์มตามตัวอักษร
  const searchText = keyword.trim().toLowerCase(); 
  const visibleGames = games.filter((game) => {
    const matchesTitle = game.title.toLowerCase().startsWith(searchText);
    const matchesPlatformSearch = game.platform
      .toLowerCase()
      .startsWith(searchText);
    const matchesPlatform = platform === "" || game.platform === platform; // เช็คการเลือกแพลตฟอร์ม                    

    return (matchesTitle || matchesPlatformSearch) && matchesPlatform; // เช็คเงื่อนไขและคืนค่า
  });

  return (
    <section className="gameExplorer" aria-labelledby="game-explorer-title">
      <div className="gameToolbar">
        <label htmlFor="game-search">
          ค้นหาเกมหรือแพลตฟอร์ม
          <input
            id="game-search"
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="กรุณากรอกชื่อเกมหรือแพลตฟอร์ม..."
          />
        </label>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (confirm("ต้องการคืนค่าข้อมูลเดิมใช่หรือไม่?")) {
                localStorage.removeItem("my_games");
                window.location.reload();
              }
            }}
            className="btn-reset"
          >
            คืนค่าข้อมูลเดิม
          </button>
        </div>

        <label htmlFor="game-platform">
          แพลตฟอร์ม
          <select
            id="game-platform"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            <option value="">ทุกแพลตฟอร์ม</option>
            {platforms.map((gamePlatform) => (
              <option key={gamePlatform} value={gamePlatform}>
                {gamePlatform}
              </option>
            ))}
          </select>
        </label>
      </div>

      <GameForm
        key={editingId ?? "new-game"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <h2 id="game-explorer-title">รายการเกม ({visibleGames.length})</h2>
      {visibleGames.length === 0 ? (
        <p>ไม่พบเกมที่ตรงกับคำค้นหา</p>
      ) : (
        <div className="gameGrid">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={setEditingId}
              onDelete={handleDelete}
              isDeletePending={pendingDeleteId === game.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
