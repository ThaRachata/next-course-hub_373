// use client บอกให้ Next.js รู้ว่าไฟล์นี้มีการโต้ตอบกับผู้ใช้และต้องรันในฝั่ง Client เท่านั้น
"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "@/components/CourseForm";
import type { Course } from "@/types/course";

type CourseExplorerProps = {
  initialCourses: Course[]; // รับข้อมูลเริ่มต้นจาก Server Component
};

// สร้างคอมโพเนนต์ CourseExplorer เพื่อแสดงรายการวิชาและตัวกรอง
export default function CourseExplorer({
  initialCourses = [],
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState(""); // เก็บค่าคำค้นหาที่ผู้ใช้ป้อน
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // เก็บสถานะว่าจะแสดงเฉพาะวิชาที่ผู้ใช้ทำเครื่องหมายเป็นรายการโปรดหรือไม่
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // เก็บรหัสวิชาที่ผู้ใช้ทำเครื่องหมายเป็นรายการโปรด

  // ฟังก์ชันสำหรับจัดการการคลิกปุ่ม "เพิ่ม/ลบจากรายการโปรด"
  function handleToggleFavorite(id: string) {
    setFavoriteIds((previousIds) => {
      if (previousIds.includes(id)) {
        // ถ้าวิชานี้อยู่ในรายการโปรดแล้ว ให้ลบออก
        return previousIds.filter((favoriteId) => favoriteId !== id);
      }

      return [...previousIds, id]; // ถ้าวิชานี้ยังไม่อยู่ในรายการโปรด ให้เพิ่มเข้าไป
    });
  }
  // กลุ่มฟังก์ชันสำหรับจัดการการเปลี่ยนแปลง
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleFavoritesOnlyChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setShowFavoritesOnly(event.target.checked);
  }

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses((previousCourses) => [...previousCourses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses((previousCourses) =>
      previousCourses.filter((course) => course.id !== id),
    );
    setFavoriteIds((previousIds) =>
      previousIds.filter((courseId) => courseId !== id),
    );

    if (editingId === id) {
      setEditingId(null);
    }
  }

  function handleEdit(id: string) {
    setEditingId(id);
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses((previousCourses) =>
      previousCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  // กรองรายวิชาตามคำค้นหาและตัวกรองที่ผู้ใช้เลือก
  const searchText = keyword.trim().toLowerCase(); // แปลงคำค้นหาเป็นตัวพิมพ์เล็กและตัดช่องว่างด้านหน้า/หลัง
  const visibleCourses = courses.filter((course) => {
    // กรองรายวิชาที่ตรงกับคำค้นหาและตัวกรองที่ผู้ใช้เลือก
    const matchesSearch = // ตรวจสอบว่าชื่อวิชา หรือ รหัสวิชา ตรงกับคำค้นหาหรือไม่
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);

    // ถ้าไม่ได้กดเช็คให้ข้ามเลย หรือ ถ้ากดเช็ค (วิชานั้นต้อง isOpen = true เท่านั้นถึงจะผ่าน)
    const matchesFavoriteFilter =
      !showFavoritesOnly || favoriteIds.includes(course.id);

    // ถ้าผ่านทั้ง 3 เงื่อนไขก็จะถูกเก็บไว้ใน visibleCourses
    return matchesSearch && matchesFavoriteFilter;
  });

  // แสดงผล
  // ... (โค้ดส่วนบนของไฟล์ CourseExplorer.tsx คงเดิม) ...

  return (
    <section className="courseExplorer" aria-labelledby="course-explorer-title">
      <h2 id="course-explorer-title">ค้นหารายวิชา</h2>

      {/* 1. เอาแถบเครื่องมือค้นหาขึ้นมาก่อน */}
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

      {/* 2. สรุปจำนวนวิชาย้ายมาไว้ตรงกลางระหว่างกล่องค้นหากับกล่องเพิ่มวิชา (ถ้าพี่อยากให้อยู่เหนือการ์ด ก็เอาไปไว้ใต้ CourseForm ได้ครับ) */}
      <div className="courseSummary">
        <p>รายการโปรด: {favoriteIds.length} รายวิชา</p>
        <p>
          แสดงผล {visibleCourses.length} จาก {courses.length} รายวิชา
        </p>
      </div>

      {/* 3. เอาฟอร์มเพิ่มวิชาย้ายลงมาไว้ข้างล่างกล่องค้นหา */}
      <CourseForm
        key={editingId ?? "new-course"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* 4. พื้นที่แสดงรายวิชา (Card) อยู่ล่างสุดเหมือนเดิม */}
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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
