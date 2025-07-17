import { useEffect, useState } from "react";
import API from "../api/api";

const Progress = () => {
  const [lessons, setLessons] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const lessonRes = await API.get("/progress/completed");
      setLessons(lessonRes.data);

      const quizRes = await API.get("/quiz-attempts/my");
      setAttempts(quizRes.data);
    };
    fetchProgress();
  }, []);

  return (
    <div>
      <h2>📘 Completed Lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons completed yet.</p>
      ) : (
        <ul>
          {lessons.map((lp) => (
            <li key={lp._id}>{lp.lesson?.title}</li>
          ))}
        </ul>
      )}

      <h2>📝 Quiz History</h2>
      {attempts.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <ul>
          {attempts.map((a) => (
            <li key={a._id}>
              Quiz ID: {a.quiz?._id} – Score: {a.score}/{a.answers.length} –{" "}
              {new Date(a.attemptedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Progress;
