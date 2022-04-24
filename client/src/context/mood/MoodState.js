import React, { useReducer } from 'react'
import MoodContext from './moodContext';
import moodReducer from './moodReducer';
import tempMoodData from './tempMoodData.json';

import { GET_MOODS, SET_LOADING } from '../types';

const MoodState = (props) => {
  const initialState = {
    moods: [],
    loading: false
  };

  // init mood reducer
  const [state, dispatch] = useReducer(moodReducer, initialState);

  // get moods
  const getMoods = async () => {
    try {
      setLoading();

      const moods = tempMoodData;

      dispatch({ type: GET_MOODS, payload: moods.moods });
    } catch (err) {
      console.error(err);
    }
  }

  // set loading
  const setLoading = async () => {
    dispatch({ type: SET_LOADING });
  }

  return (
    <MoodContext.Provider
      value={{
        moods: state.moods,
        getMoods,
        setLoading
      }}
    >
      {props.children}
    </MoodContext.Provider>
  );
}

export default MoodState;