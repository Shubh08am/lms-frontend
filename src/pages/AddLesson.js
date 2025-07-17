import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const AddLesson = () => {
  const { id: courseId } = useParams(); // ✅ Get courseId from route

  const [form, setForm] = useState({
    title: "",
    content: "",
    videoUrl: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/courses/${courseId}/lessons`, form); // ✅ Valid request
      alert("Lesson added successfully!");
      setForm({ title: "", content: "", videoUrl: "" });
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Lesson to Course</h2>
      <input
        name="title"
        placeholder="Lesson Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      />
      <input
        name="videoUrl"
        placeholder="Video URL"
        value={form.videoUrl}
        onChange={handleChange}
      />
      <button type="submit" style={{ marginTop: "10px" }}>Add Lesson</button>
    </form>
  );
};

export default AddLesson;
