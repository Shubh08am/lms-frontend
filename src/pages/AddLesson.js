import { useState } from "react";
import API from "../api/api";

const AddLesson = () => {
  const [form, setForm] = useState({
    courseId: "",
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
      console.log("Submitting to /courses/", form.courseId);
      const res = await API.post(`/courses/${form.courseId}/lessons`, {
        title: form.title,
        content: form.content,
        videoUrl: form.videoUrl
      });
      console.log("Lesson added:", res.data);
      alert("Lesson added successfully!");
      setForm({ courseId: "", title: "", content: "", videoUrl: "" });
    } catch (err) {
      console.error("Error adding lesson:", err);
      alert("Error: " + (err.response?.data?.message || err.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Lesson to Course</h2>
      <input
        name="courseId"
        placeholder="Course ID"
        value={form.courseId}
        onChange={handleChange}
        required
      />
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
