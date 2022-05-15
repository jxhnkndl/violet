import React from 'react';
import dayjs from 'dayjs';

const Headline = (props) => {
  // format mood chart date for display
  const getDate = () => {
    return dayjs().format('dddd MMMM D, YYYY');
  };

  return (
    <div id="headline">
      <p>Today is {getDate()}</p>
      <h2>{props.headline}</h2>
    </div>
  );
};

export default Headline;
