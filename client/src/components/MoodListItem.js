import React from 'react';
import { Link } from 'react-router-dom';
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
  };

  // get mood icon from mood rating
  const getMoodDetails = () => {
    switch (mood) {
      case 5:
        return {
          icon: IconPinkChevUp,
          alt: 'Mood indicator showing a manic mood rating',
          rating: 'Manic',
        };
        break;
      case 4:
        return {
          icon: IconYellowChevUp,
          alt: 'Mood indicator showing a hypomanic mood rating',
          rating: 'Hypomanic',
        };
        break;
      case 3:
        return {
          icon: IconStable,
          alt: 'Mood indicator showing a stable mood rating',
          rating: 'Stable',
        };
        break;
      case 2:
        return {
          icon: IconYellowChevDown,
          alt: 'Mood indicator showing a low mood rating',
          rating: 'Low',
        };
        break;
      case 1:
        return {
          icon: IconPinkChevDown,
          alt: 'Mood indicator showing a depressed mood rating',
          rating: 'Depressed',
        };
        break;
      default:
        return IconStable;
        break;
    }
  };

  // generate mood icon and heading based on mood rating
  const moodDetails = getMoodDetails();

  return (
    <div className="mood-list-item">
      <div className="mood-data">
        <div className="mood-icon">
          <img
            src={moodDetails.icon}
            className="mood-list-icon"
            alt={moodDetails.alt}
          />
        </div>
        <div className="mood-details">
          <p className="mood-date">{getDate()}</p>
          <p className="mood-rating">{moodDetails.rating}</p>
        </div>
      </div>
      <div className="info-icon">
        <Link to={`/${_id}`}>
          <img src={IconInfo} className="mood-list-info" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default MoodListItem;
