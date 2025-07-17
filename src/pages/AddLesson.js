import { useState } from "react";
import { useParams } from "react-router-dom"; // ✅ to get courseId from URL
import API from "../api/api";

const AddLesson = () => {
  const { id: courseId } = useParams(); // 👈 gets ":id" from route
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
      const res = await API.post(`/courses/${courseId}/lessons`, form);
      console.log("Lesson added:", res.data);
      alert("Lesson added successfully!");
      setForm({ title: "", content: "", videoUrl: "" });
    } catch (err) {
      console.error("Error adding lesson:", err);
      alert("Error: " + (err.response?.data?.message || err.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Lesson to Course ID: {courseId}</h2>
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
      <button type="submit">Add Lesson</button>
    </form>
  );
};

export default AddLesson;
