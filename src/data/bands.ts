// นำเข้าประเภท Band จากไฟล์ types/band.ts เพื่อใช้ในการกำหนดประเภทของข้อมูลวงดนตรี
import type { Band } from "../types/band";

// สร้าง array ของวงดนตรี โดยแต่ละวงดนตรีมี id, name, members, hitSong และ imageUrl
export const favoriteBands: Band[] = [
  {
    id: 1,
    name: "Polycat", 
    hitSong: "เวลาเธอยิ้ม",
    imageUrl: "/images/bands/polycat.jpg",
    members: [
      {
        name: "นะ",
        role: "นักร้องนำ",
        imageUrl: "/images/bands/na_polycat.jpg"
      },
      {
        name: "เพียว",
        role: "มือเบส",
        imageUrl: "/images/bands/pure_polycat.jpg"
      },
      {
        name: "โต้ง",
        role: "มือคีย์บอร์ด",
        imageUrl: "/images/bands/Tong_polycat.jpg"
      }
    ]
  },
  {
    id: 2,
    name: "Cigarettes After Sex",
    hitSong: "Apocalypse",
    imageUrl: "/images/bands/cigarettes.jpg",
    members: [
      {
        name: "Greg Gonzalez",
        role: "นักร้องนำและมือกีตาร์",
        imageUrl: "/images/bands/greg_cigarettes.jpg"
      },
      {
        name: "Randall Steffey",
        role: "มือเบส",
        imageUrl: "/images/bands/randall_cigarettes .jpg"
      },
      {
        name: "Jacob Tomsky",
        role: "มือกลอง",
        imageUrl: "/images/bands/jacob_cigarettes.jpg"
      }
    ]
  },
  {
    id: 3,
    name: "bodyslam",
    hitSong: "แสงสุดท้าย",
    imageUrl: "/images/bands/bodyslam.jpg",
    members: [
      {
        name: "ตูน",
        role: "นักร้องนำ",
        imageUrl: "/images/bands/toon_bodyslam.jpg"
      },
      {
        name: " ปิ๊ด",
        role: "มือเบส",
        imageUrl: "/images/bands/pud_bodyslam.jpg"
      },
      {
        name: "เภา",
        role: "มือกีตาร์",
        imageUrl: "/images/bands/phao_bodyslam.jpg"
      },
    ]
  }
];