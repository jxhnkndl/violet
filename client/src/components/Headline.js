import React from 'react';
import dayjs from 'dayjs';

const Headline = (props) => {
  return (
    <div id="headline">
      <p>Today is {dayjs().format('dddd MMMM D, YYYY')}</p>
      <h2>{props.headline}</h2>
    </div>
  );
};

export default Headline;
