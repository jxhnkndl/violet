import React from 'react';

const MoodListItem = ({ data }) => {
  const { _id, mood } = data;

  return (
    <div>
      <p>{_id}</p>
    </div>
  );
};

export default MoodListItem;