import './App.css';
import SidebarMenu from './Components/SidebarMenu';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students/Students";
import Exams from "./pages/Exams";
import Results from "./pages/Results";
import NoticeBoard from "./pages/NoticeBoard";
import LiveClasses from "./pages/LiveClasses";


function App() {
  return (
    <div>

      <Routes>
          <Route path="/" element={<SidebarMenu />} >
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<Courses />} />
            <Route path="exams" element={<Exams />} />
            <Route path="results" element={<Results />} />
            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="live-classes" element={<LiveClasses />} />
            <Route path="notifications" element={<NoticeBoard />} />
            <Route path="*" element={<> not found</>} />
          </Route>

        </Routes>

    </div>
  );
}

export default App;
