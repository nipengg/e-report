import React from 'react'
import { Lecturer, Home, Layout, Student, Class, City, Course, Score, Ipk, Footer } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/score" element={<Score />} />
          <Route path="/ipk" element={<Ipk />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>

  )
}

export default App