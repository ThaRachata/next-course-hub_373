import type { Metadata } from "next";
import CourseExplorer from "@/components/CourseExplorer";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main className="page coursePage">
      <h1>รายวิชาทั้งหมด</h1>
      <CourseExplorer courses={courses} />
    </main>
  );
}
