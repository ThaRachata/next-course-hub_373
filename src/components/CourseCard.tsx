import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  description?: string;  
//   ?  สามารถเป็น ค่าว่าง ได้
};

export default function CourseCard({ 
  course, 
  description, 
}: CourseCardProps) { 
  return ( 
    <article className="course-card"> 
      <h2>{course.title}</h2> 
      <p>รหัสวิชา: {course.code}</p> 
      {description && <p>{description}</p>} 
    </article> 
  ); 
}