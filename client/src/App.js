import React from 'react'
import { Lecturer, Home, Layout, Student, Class, City, Course, Score, Ipk, Login, Register, Enroll } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Home /></>} />
            <Route path="/lecturer" element={<Lecturer />} />
            <Route path="/student" element={<Student />} />
            <Route path="/class" element={<Class />} />
            <Route path="/city" element={<City />} />
            <Route path="/course" element={<Course />} />
            <Route path="/score" element={<Score />} />
            <Route path="/ipk" element={<Ipk />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/enroll" element={<Register />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App