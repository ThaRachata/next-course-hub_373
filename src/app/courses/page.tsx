import type { Course } from "@/types/course";

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

export default function CoursesPage() { 
    return ( 
    <main className="page"> 
        <h1>รายวิชาทั้งหมด</h1> 
        <section className="courseGrid"> 
        {courses.map((course) => ( 
            <div key={course.id} className="courseCard"> 
                <h2>{course.title}</h2> 
                <p>Code: {course.code}</p> 
                <p>Credits: {course.credits}</p> 
                <p>Status: {course.isOpen ? "Open" : "Closed"}</p> 
            </div> 
        ))} 
        </section> 
    </main> 
    ); 
} 