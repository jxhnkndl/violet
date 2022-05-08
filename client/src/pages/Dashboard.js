import React, { useEffect, useContext } from 'react';
import MoodContext from '../context/mood/moodContext';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () => {
  const moodContext = useContext(MoodContext);
  const { getMoods, moods } = moodContext;

  useEffect(() => {
    getMoods();
    console.log(moods);
  }, [moods]);

  return (
    <Row>
      <Col lg={8} className="column">
        <p className="greeting">Today is May 8, 2022</p>
        <h2>Let's see how you're doing</h2>
      </Col>
    </Row>
  );
};

export default Dashboard;
