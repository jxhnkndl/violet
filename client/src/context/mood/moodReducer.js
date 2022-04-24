import { GET_MOODS, SET_LOADING } from "../types";


const moodReducer = (state, action) => {
  switch (action.type) {
    case GET_MOODS:
      return {
        ...state,
        moods: action.payload,
        loading: false
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}

export default moodReducer;