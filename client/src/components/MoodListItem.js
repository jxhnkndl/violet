import React from 'react';
import dayjs from 'dayjs';

import Row from 'react-bootstrap/Row';

import IconInfo from '../assets/icons/icon-info.svg';
import IconStable from '../assets/icons/icon-equals.svg';

const MoodListItem = ({ data }) => {
  const { _id, date, mood } = data;

  // format mood chart date for display
  const getDate = () => {
    return dayjs(date).format('MMMM D, YYYY');
  }

  return (
    <div className="mood-list-item">
      <div className="mood-data">
        <div className="mood-icon">
          <img src={IconStable} className="mood-list-icon" alt="" />
        </div>
        <div className="mood-details">
          <p className="mood-date">{getDate()}</p>
          <p className="mood-rating">Test</p>
        </div>
      </div>
      <div className="info-icon">
        <img src={IconInfo} className="mood-list-info" alt="" />
      </div>
    </div>
  );
};

export default MoodListItem;
