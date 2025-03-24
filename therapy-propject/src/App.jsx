import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import NavBar from '../components/NavBar';
import HomePage from '../pages/HomePage';
import Directory from '../pages/Directory';
import About from '../pages/About';
import News from '../pages/News';


function App() {


  return (
    <nav>
      <NavBar />

     <div>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
      </Routes>

     </div>
      
    </nav>
  );
}

export default App
