import React, { useEffect, useContext } from 'react'
import MoodContext from '../context/mood/moodContext';

const Dashboard = () => {
  const moodContext = useContext(MoodContext);
  const { getMoods, moods } = moodContext;

  useEffect(() => {
    getMoods();
    console.log(moods);
  }, [moods]);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;