import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
    <Link to="/courses" style={{ marginRight: "15px" }}>Courses</Link>
    <Link to="/progress" style={{ marginRight: "15px" }}>Progress</Link>
    <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
    <Link to="/signup" style={{ marginRight: "15px" }}>Signup</Link>
    <Link to="/admin/create-course" style={{ marginRight: "15px" }}>Add Course</Link>
    <Link to="/admin/add-lesson" style={{ marginRight: "15px" }}>Add Lesson</Link>
    <Link to="/admin/add-quiz" style={{ marginRight: "15px" }}>Add Quiz</Link>

  </nav>
);

export default Navbar;
