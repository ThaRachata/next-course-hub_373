import type { Band } from "@/types/band";
import Image from "next/image";

// กำหนดประเภทของ props สำหรับคอมโพเนนต์ BandCard
type BandCardProps = {
  band: Band;
};

// กรอบสำหรับแสดงข้อมูลวงดนตรีทั้งหมด
export default function BandCard({ band }: BandCardProps) {  // รับ props ที่เป็นข้อมูลวงดนตรี
  return (
    <article
      style={{
        width: "300px", 
        border: "1px solid #444",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#222",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 1.รูปรวมวงดนตรี */}
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <Image
          src={band.imageUrl} // ใช้ URL ของรูปวงดนตรีจาก props
          alt={band.name} // ใช้ชื่อวงดนตรีเป็นข้อความแทนรูป กรณีรูปไม่โหลด
          fill
          sizes="(max-width: 300px) 100vw, 300px"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* 2.กล่องเนื้อหา */}
      <div style={{ padding: "16px", flex: 1 }}>
        
        {/* ชื่อวงดนตรี */}
        <h2 style={{ fontSize: "1.5rem", margin: "0 0 8px 0", color: "#fff" }}>
          {band.name}
        </h2>
        
        {/* Hit Song */}
        <p style={{ margin: "0 0 16px 0", fontSize: "0.95rem", color: "#ddd" }}>
          <strong style={{ color: "#aaa" }}>เพลงฮิต:</strong> {band.hitSong}
        </p>

        {/* 3.รายชื่อสมาชิก */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <strong style={{ color: "#aaa", fontSize: "0.9rem" }}>สมาชิก:</strong>

          {/* วนลูปแสดงรายชื่อสมาชิก */}
          {band.members.map((member, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            
              {/* รูปโปรไฟล์สมาชิก */}
              <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  overflow: "hidden", 
                  flexShrink: 0,
                  border: "2px solid #555"
              }}>
                {/* องค์ประกอบรูปภาพในวง */}
                <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    width={48} 
                    height={48} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              
              {/* 3.2 กล่องใส่ชื่อและตำแหน่งในวงดนตรี */}
              <div>
                <div style={{ fontWeight: "600", fontSize: "1rem", color: "#eee" }}>
                  {member.name}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#888" }}>
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </article>
  );
}