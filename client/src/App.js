import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodState from './context/mood/MoodState';

import Container from 'react-bootstrap/Container';
import Dashboard from './pages/Dashboard';
import SingleMood from './pages/SingleMood';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <MoodState>
      <Router>
        <Container>
          <Row>
            <Col lg={10} xl={8} className="column">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/:moodId" element={<SingleMood />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </MoodState>
  );
}

export default App;
