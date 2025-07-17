import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const QuizAttempt = () => {
  const { id } = useParams(); // quiz ID
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await API.get(`/quizzes/${id}`);
      setQuiz(res.data);
      setAnswers(new Array(res.data.questions.length).fill(null));
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(`/quiz-attempts/${id}/submit`, { answers });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      alert("Submission error: " + err.message);
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div>
      <h2>Quiz</h2>
      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex}>
          <p><strong>Q{qIndex + 1}:</strong> {q.text}</p>
          {q.options.map((opt, optIndex) => (
            <label key={optIndex}>
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
          <hr />
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit}>Submit Quiz</button>
      ) : (
        <p>Your Score: {score} / {quiz.questions.length}</p>
      )}
    </div>
  );
};

export default QuizAttempt;
