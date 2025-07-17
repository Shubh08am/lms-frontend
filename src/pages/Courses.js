import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>All Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <Link to={`/courses/${course._id}`}>
                {course.title} — {course.instructor}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
