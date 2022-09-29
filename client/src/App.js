import React from 'react'
import { Lecturer, Home, Layout, Student } from './pages'
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
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App