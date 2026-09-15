import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

export default function Home() {
  const siteName: string = "CSMJU";
  const courseCount = courses.length;
  const isOpen: boolean = true;
  const topics: string[] = ["HTML", "CSS", "TypeScript", "Next.js"];
  return (
    <main>
      <h1>{siteName}</h1>
      <p>จำนวนรายวิชา: {courseCount}</p>
      <p>สถานะ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <section className="courseGrid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </main>
  );
}
