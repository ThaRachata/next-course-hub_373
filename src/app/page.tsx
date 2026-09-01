import CourseCard from "@/components/CourseCard";

export default function Home() {
  const siteName: string = "CSMJU";
  const courseCount: number = 3;
  const isOpen: boolean = true;
  const topics: string[] = [ 
  "HTML", 
  "CSS", 
  "TypeScript", 
  "Next.js", 
  ]; 
  type Course = { 
  id: number; 
  code: string; 
  title: string; 
  credits: number; 
  isOpen: boolean; 
  };  
  const courses: Course[] = [ 
    { 
      id: 1, 
      code: "10301231", 
      title: "Web Technology", 
      credits: 3, 
      isOpen: true, 
    }, 
    { 
      id: 2, 
      code: "10301232", 
      title: "Database Systems", 
      credits: 3, 
      isOpen: false, 
    }, 
    { 
      id: 3, 
      code: "10301233", 
      title: "Programming in Java", 
      credits: 3, 
      isOpen: true, 
    },
    { 
      id: 4, 
      code: "10301234", 
      title: "Programming in C++", 
      credits: 3, 
      isOpen: false, 
    },
    { 
      id: 5, 
      code: "10301235", 
      title: "Programming in Python", 
      credits: 3, 
      isOpen: true, 
    },
  ]; 
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
