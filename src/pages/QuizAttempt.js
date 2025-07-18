import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const QuizAttempt = () => {
  const { id } = useParams(); // Quiz ID from URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/${id}`);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null)); // Initialize answers array
      } catch (err) {
        alert("Error loading quiz: " + (err.response?.data?.message || err.message));
      }
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (qIndex, optIndex) => {
    const updated = [...answers];
    updated[qIndex] = optIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(`/quiz-attempts/${id}/submit`, { answers });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      alert("Submission error: " + (err.response?.data?.message || err.message));
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} style={{ marginBottom: "20px" }}>
          <p><strong>Q{qIndex + 1}:</strong> {q.text}</p>
          {q.options.map((opt, optIndex) => (
            <label key={optIndex} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q${qIndex}`}
                value={optIndex}
                checked={answers[qIndex] === optIndex}
                onChange={() => handleChange(qIndex, optIndex)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} disabled={answers.includes(null)}>
          Submit Quiz
        </button>
      ) : (
        <h3>Your Score: {score} / {quiz.questions.length}</h3>
      )}
    </div>
  );
};

export default QuizAttempt;
