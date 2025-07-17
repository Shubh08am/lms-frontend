import { useState } from "react";
import API from "../api/api";

const AddQuiz = () => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctIndex: 0 }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "correctIndex") {
      updated[index][field] = parseInt(value);
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctIndex: 0 }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/courses/${courseId}/quizzes`, { title, questions });
      alert("Quiz added successfully!");
      setCourseId("");
      setTitle("");
      setQuestions([{ text: "", options: ["", "", "", ""], correctIndex: 0 }]);
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Quiz to Course</h2>
      <input
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Course ID"
        required
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
        required
      />

      {questions.map((q, qIndex) => (
        <div key={qIndex} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <input
            placeholder={`Q${qIndex + 1} Text`}
            value={q.text}
            onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
            required
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(qIndex, i, e.target.value)}
              required
            />
          ))}
          <select
            value={q.correctIndex}
            onChange={(e) => handleQuestionChange(qIndex, "correctIndex", e.target.value)}
          >
            <option value={0}>Correct Option: 1</option>
            <option value={1}>Correct Option: 2</option>
            <option value={2}>Correct Option: 3</option>
            <option value={3}>Correct Option: 4</option>
          </select>
        </div>
      ))}

      <button type="button" onClick={addQuestion} style={{ marginTop: "10px" }}>
        ➕ Add Question
      </button>
      <br />
      <button type="submit" style={{ marginTop: "10px" }}>✅ Submit Quiz</button>
    </form>
  );
};

export default AddQuiz;
