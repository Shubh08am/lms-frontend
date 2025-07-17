import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
    <Link to="/courses" style={{ marginRight: "15px" }}>Courses</Link>
    <Link to="/progress" style={{ marginRight: "15px" }}>Progress</Link>
    <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
    <Link to="/signup">Signup</Link>
  </nav>
);

export default Navbar;
