// use client บอกให้ Next.js รู้ว่าไฟล์นี้มีการโต้ตอบกับผู้ใช้และต้องรันในฝั่ง Client เท่านั้น
"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/types/course";

type CourseExplorerProps = {
  courses: Course[];  // รับข้อมูล "วิชาทั้งหมด" มาจากฐานข้อมูลหรือไฟล์แม่
};

// สร้างคอมโพเนนต์ CourseExplorer เพื่อแสดงรายการวิชาและตัวกรอง
export default function CourseExplorer({ courses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState(""); // เก็บค่าคำค้นหาที่ผู้ใช้ป้อน
  const [showOpenOnly, setShowOpenOnly] = useState(false); // เก็บสถานะว่าจะแสดงเฉพาะวิชาที่เปิดลงทะเบียนหรือไม่
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // เก็บสถานะว่าจะแสดงเฉพาะวิชาที่ผู้ใช้ทำเครื่องหมายเป็นรายการโปรดหรือไม่
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]); // เก็บรหัสวิชาที่ผู้ใช้ทำเครื่องหมายเป็นรายการโปรด

  // ฟังก์ชันสำหรับจัดการการคลิกปุ่ม "เพิ่ม/ลบจากรายการโปรด"
  function handleToggleFavorite(id: number) {
    setFavoriteIds((previousIds) => {
      if (previousIds.includes(id)) {  // ถ้าวิชานี้อยู่ในรายการโปรดแล้ว ให้ลบออก
        return previousIds.filter((favoriteId) => favoriteId !== id);
      }

      return [...previousIds, id]; // ถ้าวิชานี้ยังไม่อยู่ในรายการโปรด ให้เพิ่มเข้าไป
    });
  }
  // กลุ่มฟังก์ชันสำหรับจัดการการเปลี่ยนแปลง
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleOpenOnlyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowOpenOnly(event.target.checked);
  }

  function handleFavoritesOnlyChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setShowFavoritesOnly(event.target.checked);
  }

  // กรองรายวิชาตามคำค้นหาและตัวกรองที่ผู้ใช้เลือก
  const searchText = keyword.trim().toLowerCase(); // แปลงคำค้นหาเป็นตัวพิมพ์เล็กและตัดช่องว่างด้านหน้า/หลัง
  const visibleCourses = courses.filter((course) => { // กรองรายวิชาที่ตรงกับคำค้นหาและตัวกรองที่ผู้ใช้เลือก
    const matchesSearch =  // ตรวจสอบว่าชื่อวิชา หรือ รหัสวิชา ตรงกับคำค้นหาหรือไม่
      course.title.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);
    
      // ถ้าไม่ได้กดเช็คให้ข้ามเลย หรือ ถ้ากดเช็ค (วิชานั้นต้อง isOpen = true เท่านั้นถึงจะผ่าน)
    const matchesOpenFilter = !showOpenOnly || course.isOpen;
    // ถ้าไม่ได้กดเช็คให้ข้ามเลย หรือ ถ้ากดเช็ค (วิชานั้นต้องอยู่ใน favoriteIds เท่านั้นถึงจะผ่าน)
    const matchesFavoriteFilter =
      !showFavoritesOnly || favoriteIds.includes(course.id);

    // ถ้าผ่านทั้ง 3 เงื่อนไขก็จะถูกเก็บไว้ใน visibleCourses
    return matchesSearch && matchesOpenFilter && matchesFavoriteFilter;
  });

  // แสดงผลล
  return (
    <section className="courseExplorer" aria-labelledby="course-explorer-title">
      <h2 id="course-explorer-title">ค้นหารายวิชา</h2>
      {/* สรุปจำนวนวิชาที่แสดงผล */}
      <div className="courseSummary">
        <p>รายการโปรด: {favoriteIds.length} รายวิชา</p>
        <p>
          แสดงผล {visibleCourses.length} จาก {courses.length} รายวิชา
        </p>
      </div>
      {/* แถบช่องค้นหา */}
      <div className="courseToolbar">
        <label className="searchField" htmlFor="course-search">
          ค้นหาด้วยชื่อหรือรหัสวิชา
          <input
            id="course-search"
            type="search"
            value={keyword}
            onChange={handleSearchChange}
            placeholder="ค้นหารายวิชา..."
          />
        </label>

        <div className="courseFilters">
          <label htmlFor="open-courses-only">
            <input
              id="open-courses-only"
              type="checkbox"
              checked={showOpenOnly}
              onChange={handleOpenOnlyChange}
            />
            แสดงเฉพาะรายวิชาที่เปิดรับ
          </label>

          <label htmlFor="favorite-courses-only">
            <input
              id="favorite-courses-only"
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={handleFavoritesOnlyChange}
            />
            แสดงเฉพาะรายการโปรด
          </label>
        </div>
      </div>
      {/* พื้นที่แสดงรายวิชา */}
      {visibleCourses.length === 0 ? (
        <p className="emptyState">ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <div className="courseGrid">
          {/* วนลูปแสดงรายวิชาที่ตรงกับเงื่อนไข */}
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
