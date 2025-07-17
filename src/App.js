import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import QuizAttempt from "./pages/QuizAttempt";
import Progress from "./pages/Progress";
import CreateCourse from "./pages/CreateCourse";
import AddLesson from "./pages/AddLesson";
import AddQuiz from "./pages/AddQuiz";




function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/quiz/:id" element={<QuizAttempt />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
          <Route path="/admin/add-lesson" element={<AddLesson />} />
          <Route path="/admin/add-quiz" element={<AddQuiz />} />



        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
