import React from 'react'
import { Lecturer, Home, Layout, Student, Class, City, Course } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Layout />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lecturer" element={<Lecturer />} />
          <Route path="/student" element={<Student />} />
          <Route path="/class" element={<Class />} />
          <Route path="/city" element={<City />} />
          <Route path="/course" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App