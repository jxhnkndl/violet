import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MoodState from './context/mood/MoodState';

function App() {
  return (
    <MoodState>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </MoodState>
  );
}

export default App;
