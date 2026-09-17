// ส่วนแสดงผลหน้า การ์ดเกม
import Link from "next/link";
import type { Game } from "@/types/game";

// กำหนดประเภทของ props สำหรับคอมโพเนนต์ GameCard
type GameCardProps = {
  game: Game;
  onEdit?: (id: string) => void;  // void = ไม่มีค่าที่ส่งกลับ 
  onDelete?: (id: string) => void;
  isDeletePending?: boolean;  // ยืนยันว่ากำลังรอการลบหรือไม่ 
};

const statusLabels: Record<Game["status"], string> = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
  isDeletePending = false, 
}: GameCardProps) {
  return (
    <article className="gameCard">
      <h2>
        <Link href={`/game/${game.id}`}>{game.title}</Link> {/* Component <Link>  เพื่อส่งค่า game.id ไปที่ URL แบบ Dynamic Route โดยที่ไม่ต้องโหลดหน้าเว็บใหม่ทั้งหน้า */}
      </h2>
      <p>แพลตฟอร์ม: {game.platform}</p>
      <p>เวลาที่คาดว่าจะใช้เล่น: {game.hours} ชั่วโมง</p>
      <p>สถานะ: {statusLabels[game.status]}</p>
      {onEdit && (
        <button type="button" onClick={() => onEdit(game.id)}>
          แก้ไข
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className={isDeletePending ? "btn-confirm-delete" : ""}
          onClick={() => onDelete(game.id)}
          aria-label={isDeletePending ? `ยืนยันการลบ ${game.title}` : undefined}
        >
          {isDeletePending ? "ยืนยันการลบ" : "ลบ"}
        </button>
      )}
    </article>
  );
}
