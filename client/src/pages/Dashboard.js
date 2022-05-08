import React, { useEffect, useContext } from 'react';
import MoodContext from '../context/mood/moodContext';

import Headline from '../components/Headline';
import MoodListItem from '../components/MoodListItem';
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
      <Col lg={10} xl={8} className="column">
        <Headline headline="Let's see how you're doing" />

        {/* verify api has returned mood data */}
        {moods.length ? (

          // loop through user's moods
          // create a mood list item with key details for each entry
          <div id="mood-stream">
            {moods.map(mood => <MoodListItem key={mood._id} data={mood} />)}
          </div>
          
        ) : (
          <p>Loading...</p>
        )}

      </Col>
    </Row>
  );
};

export default Dashboard;
