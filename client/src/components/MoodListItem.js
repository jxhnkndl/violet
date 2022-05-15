import React from 'react';
import dayjs from 'dayjs';

import Row from 'react-bootstrap/Row';

import IconInfo from '../assets/icons/icon-info.svg';
import IconStable from '../assets/icons/icon-equals.svg';
import IconYellowChevUp from '../assets/icons/icon-yellow-chev-up.svg';
import IconYellowChevDown from '../assets/icons/icon-yellow-chev-down.svg';
import IconPinkChevUp from '../assets/icons/icon-pink-chev-up.svg';
import IconPinkChevDown from '../assets/icons/icon-pink-chev-down.svg';

const MoodListItem = ({ data }) => {
  const { _id, date, mood } = data;

  // format mood chart date for display
  const getDate = () => {
    return dayjs(date).format('MMMM D, YYYY');
  }

  // get mood icon from mood rating
  const getMoodIcon = () => {
    switch (mood) {
      case 5:
        return IconPinkChevUp;
        break;
      case 4:
        return IconYellowChevUp;
        break;
      case 3:
        return IconStable;
        break;
      case 2:
        return IconYellowChevDown;
        break;
      case 1:
        return IconPinkChevDown;
        break;     
      default:
        return IconStable;
        break;
    }
  }

  return (
    <div className="mood-list-item">
      <div className="mood-data">
        <div className="mood-icon">
          <img src={getMoodIcon()} className="mood-list-icon" alt="" />
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
