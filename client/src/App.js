import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodState from './context/mood/MoodState';

import Container from 'react-bootstrap/Container';
import Dashboard from './pages/Dashboard';
import SingleMood from './pages/SingleMood';

function App() {
  return (
    <MoodState>
      <Router>
        <div className="app">
          <Container>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/:moodId" element={<SingleMood />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </MoodState>
  );
}

export default App;
