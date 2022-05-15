import React, { useEffect, useContext } from 'react';
import MoodContext from '../context/mood/moodContext';

import Headline from '../components/Headline';
import MoodListItem from '../components/MoodListItem';

const Dashboard = () => {
  const moodContext = useContext(MoodContext);
  const { getMoods, moods } = moodContext;

  useEffect(() => {
    getMoods();
    console.log(moods);
  }, [moods]);

  return (
    <div>
      <Headline headline="Let's see how you're doing" />

      {/* verify api has returned mood data */}
      {moods.length ? (
        // loop through user's moods
        // create a mood list item with key details for each entry
        <div id="mood-stream">
          {moods.map((mood) => (
            <MoodListItem key={mood._id} data={mood} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
