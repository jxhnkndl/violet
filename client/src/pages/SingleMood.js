import React from 'react';
import { useParams } from 'react-router-dom';

const SingleMood = () => {
  const { moodId } = useParams();

  return <div>{moodId}</div>;
};

export default SingleMood;
