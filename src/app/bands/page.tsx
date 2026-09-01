import BandCard from "@/components/BandCard";  // นำเข้า BandCard component
import { favoriteBands } from "@/data/bands";  // นำเข้าข้อมูลวงดนตรีจากไฟล์ data/bands.ts

export default function BandsPage() {  // สร้างหน้าweb BandsPage
  return (
    <main style={{ padding: "24px" }}> 
    {/* กล่องที่คลุมเนื้อหาทั้งหน้าเว็บไว้ */}
      <h1>My Favorite Bands</h1>
      
      <section style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        {/* ใช้ display: "flex" เพื่อให้การ์ดเรียงต่อกันเป็นแนวนอน  flexWrap: "wrap" เพื่อให้การ์ดปัดตกลงมาบรรทัดใหม่ถ้ายาวเกินหน้าจอ*/}
        {favoriteBands.map((band) => (  
          <BandCard key={band.id} band={band} />
        //  ใช้ map เพื่อวนลูปผ่าน favoriteBands และสร้าง BandCard สำหรับแต่ละวงดนตรี
        ))}
      </section>
    </main>
  );
}