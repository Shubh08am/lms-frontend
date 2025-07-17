// In LessonView.js
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

  const getEmbedUrl = (url) => {
    try {
      // Handle both watch?v= and youtu.be URLs
      if (url.includes("watch?v=")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch {
      return null;
    }
  };

  if (!lesson) return <div>Loading...</div>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
      {lesson.videoUrl && getEmbedUrl(lesson.videoUrl) && (
        <div>
          <h4>Video:</h4>
          <iframe
            width="560"
            height="315"
            src={getEmbedUrl(lesson.videoUrl)}
            title="Lesson Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LessonView;
