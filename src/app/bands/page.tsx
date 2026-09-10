import BandExplorer from "@/components/BandExplorer";

export default function BandsPage() {
  // แก้: เปลี่ยนจากการแสดง BandCard โดยตรงเป็น BandExplorer เพื่อรองรับ search, follow และ like
  return <BandExplorer />;
}
