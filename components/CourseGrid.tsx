import { getCourses } from "@/lib/getCourses";
import CourseCard from "./CourseCard";

export default async function CourseGrid() {
  const courses = await getCourses();

  return (
    <>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </>
  );
}