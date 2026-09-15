import type { Course } from "@/types/course";
// ดึงโครงสร้าง Course จาก types/course มาใช้ในการกำหนด props ของ CourseCard

// กำหนด props ของ CourseCard โดยรับ course, isFavorite และ onToggleFavorite
type CourseCardProps = {
  course: Course;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

// สร้างคอมโพเนนต์ CourseCard เพื่อแสดงข้อมูลของวิชา
export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>{course.name}</h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>หน่วยกิต: {course.credit}</p>
      <p>ผู้สอน: {course.instructor}</p>

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

      {onEdit && (
        <button type="button" onClick={() => onEdit(course.id)}>
          แก้ไข
        </button>
      )}

      {onDelete && (
        <button type="button" onClick={() => onDelete(course.id)}>
          ลบ
        </button>
      )}
    </article>
  );
}
