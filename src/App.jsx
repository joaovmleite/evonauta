import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StanfordNavbar from './components/Navbar';
import { AppProvider } from './context/AppContext';

import Home from './pages/Home';
import Students from './pages/Students';
import Teachers from './pages/Teachers';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <StanfordNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
