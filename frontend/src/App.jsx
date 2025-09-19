import React, { useState } from 'react';
import FileUpload from './components/FileUpload.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

function App() {
  const [view, setView] = useState('upload'); // 'upload' or 'dashboard'

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spes Recruiter ATS</h1>
        <nav>
          <button onClick={() => setView('upload')}>Upload</button>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
        </nav>
      </header>
      <main>
        {view === 'upload' ? <FileUpload /> : <Dashboard />}
      </main>
    </div>
  );
}

export default App;
