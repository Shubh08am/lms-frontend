import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const LessonView = () => {
  const { id } = useParams(); // lesson ID
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await API.get(`/lessons/${id}`);
      setLesson(res.data);
    };
    fetchLesson();
  }, [id]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
      {lesson.videoUrl && (
        <div>
          <h4>Video:</h4>
          <iframe
            width="560"
            height="315"
            src={lesson.videoUrl.replace("watch?v=", "embed/")}
            title="Lesson Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LessonView;
