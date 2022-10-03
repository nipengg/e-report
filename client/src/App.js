import React from 'react'
import { Lecturer, Home, Layout, Student, Class, City, Course, Score, Ipk, Footer, Login, Register } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Layout /> <Home /></>} />
          <Route path="/lecturer" element={<><Layout /> <Lecturer /></>} />
          <Route path="/student" element={<><Layout /> <Student /></>} />
          <Route path="/class" element={<><Layout /> <Class /></>} />
          <Route path="/city" element={<><Layout /> <City /></>} />
          <Route path="/course" element={<><Layout /> <Course /></>} />
          <Route path="/score" element={<><Layout /> <Score /></>} />
          <Route path="/ipk" element={<><Layout /> <Ipk /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>

  )
}

export default App