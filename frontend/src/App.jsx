import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import RecruiterDashboard from './components/RecruiterDashboard';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/dashboard" element={<RecruiterDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
