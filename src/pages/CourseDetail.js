import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api";

const CourseDetail = () => {
  const { id } = useParams(); // courseId
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);
    };
    fetchCourse();
  }, [id]);

  const enroll = async () => {
    try {
      await API.post(`/courses/${id}/enroll`);
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Error enrolling: " + (err.response?.data?.message || err.message));
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Price:</strong> ₹{course.price}</p>
      <p>{course.description}</p>

      <button onClick={enroll}>Enroll</button>

      <h3>Lessons</h3>
      {course.lessons.length === 0 ? <p>No lessons added.</p> : (
        <ul>
          {course.lessons.map((lesson) => (
            <li key={lesson._id}>
              <Link to={`/lessons/${lesson._id}`}>{lesson.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <h3>Quizzes</h3>
      {course.quizzes.length === 0 ? <p>No quizzes yet.</p> : (
        <ul>
          {course.quizzes.map((quiz) => (
            <li key={quiz._id}>
              <Link to={`/quiz/${quiz._id}`}>Take Quiz</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseDetail;
