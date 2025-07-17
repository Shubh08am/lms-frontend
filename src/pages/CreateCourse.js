import { useState } from "react";
import API from "../api/api";

const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", {
        ...form,
        price: Number(form.price)
      });
      alert("Course created successfully!");
      setForm({ title: "", description: "", instructor: "", price: "" });
    } catch (err) {
      alert("Error creating course: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Course (Admin)</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateCourse;
