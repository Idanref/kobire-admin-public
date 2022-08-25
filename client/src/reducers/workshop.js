import {
  CREATE_WORKSHOP,
  GET_LOCATIONS,
  GET_WORKSHOPS_BY_CITY,
  UPDATE_CURRENT_WORKSHOP,
  TOGGLE_SOLDOUT,
  CLEAR_WORKSHOPS_DATA,
  SET_PARTICIPANT,
  CLEAR_PARTICIPANT,
  REMOVE_PARTICIPANT_FROM_WORKSHOP,
  APPROVE_USER,
  UPDATE_WORKSHOP,
} from '../actions/types';

const initialState = {
  locations: [],
  workshopsInCity: [],
  currentWorkshop: {},
  currentParticipant: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };
    case GET_WORKSHOPS_BY_CITY:
      return {
        ...state,
        workshopsInCity: payload,
      };
    case UPDATE_CURRENT_WORKSHOP:
    case TOGGLE_SOLDOUT:
    case UPDATE_WORKSHOP:
      return {
        ...state,
        currentWorkshop: payload,
      };
    case SET_PARTICIPANT:
      return {
        ...state,
        currentParticipant: payload,
      };
    case CLEAR_WORKSHOPS_DATA:
      return {
        ...state,
        locations: [],
        workshopsInCity: [],
        currentWorkshop: {},
        currentParticipant: {},
      };
    case CLEAR_PARTICIPANT:
      return {
        ...state,
        currentParticipant: {},
      };
    case REMOVE_PARTICIPANT_FROM_WORKSHOP:
      return {
        ...state,
        currentWorkshop: payload,
        currentParticipant: {},
      };
    case APPROVE_USER:
      return {
        ...state,
        currentWorkshop: payload,
        currentParticipant: {},
      };
    default:
      return state;
  }
}
