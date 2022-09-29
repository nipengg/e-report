import React from 'react'
import { Lecturer, Home, Layout } from './pages'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Layout />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lecturer" element={<Lecturer />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App