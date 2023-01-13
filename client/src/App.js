import React from 'react'
import { Lecturer, Home, Layout, Student, Class, City, Course, Score, Ipk, Login, Register, ShowStudent, ShowClass } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowStudentAttendance from './pages/Course/Attendance/ShowStudentAttendance';

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lecturer" element={<Lecturer />} />
            <Route path="/student" element={<Student />} />
            <Route path="/student/:name" element={<ShowStudent />} />
            <Route path="/class" element={<Class />} />
            <Route path="/city" element={<City />} />
            <Route path="/course" element={<Course />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/enroll" element={<Register />} />
            <Route path="/score" element={<Score />} />
            <Route path="/ipk" element={<Ipk />} />
            <Route path="/course/:courseID" element={<ShowClass/>} />
            <Route path="/course/:courseID/:classID" element={<ShowStudentAttendance/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App