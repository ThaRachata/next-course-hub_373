import type { Course } from "@/types/course";
// ดึงโครงสร้าง Course จาก types/course มาใช้ในการกำหนด props ของ CourseCard

// กำหนด props ของ CourseCard โดยรับ course, isFavorite และ onToggleFavorite
type CourseCardProps = {
  course: Course;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
};

// สร้างคอมโพเนนต์ CourseCard เพื่อแสดงข้อมูลของวิชา
export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>{course.title}</h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>หน่วยกิต: {course.credits}</p>
      <p>สถานะ: {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
      {onToggleFavorite && (
        <button
          className="favoriteButton"
          type="button"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(course.id)}
        >
          {isFavorite ? "ลบจากรายการโปรด" : "เพิ่มในรายการโปรด"}
        </button>
      )}
    </article>
  );
}
