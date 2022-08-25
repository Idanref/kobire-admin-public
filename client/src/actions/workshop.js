import axios from 'axios';
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
} from './types';

// create new workshop
export const createWorkshop = (workshop) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/workshops`, workshop, config);

    dispatch({
      type: CREATE_WORKSHOP,
    });

    console.log(res.data);
    alert('סדנה נוצרה בהצלחה');
  } catch (err) {
    alert('קרתה שגיאה, נא לבדוק בקונסול');
    console.log(err.response.data);
  }
};

// update workshop
export const updateWorkshop = (data, workshopId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/workshops/update/${workshopId}`, data, config);

    dispatch({
      type: UPDATE_WORKSHOP,
      payload: res.data,
    });
    alert('הסדנה עודכנה בהצלחה!');
  } catch (err) {
    alert(err.response.data);
  }
};

// Get locations
export const getLocations = () => async (dispatch) => {
  try {
    const res = await axios.get('/workshops/locations/all');

    dispatch({
      type: GET_LOCATIONS,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// Get workshops in city
export const getWorkshopsInCity = (city) => async (dispatch) => {
  try {
    const res = await axios.get(`/workshops?location=${city}`);

    dispatch({
      type: GET_WORKSHOPS_BY_CITY,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// toggle soldout
export const toggleSoldout = (workshopId) => async (dispatch) => {
  try {
    const res = await axios.put(`/workshops/soldout/${workshopId}`);

    dispatch({
      type: TOGGLE_SOLDOUT,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// approve that user has sent payment (and transfer from 'pending' to 'participants')
export const approveUserPayment = (workshopId, participantId) => async (dispatch) => {
  try {
    const res = await axios.put(`/workshops/approve/${workshopId}/${participantId}`);

    dispatch({
      type: APPROVE_USER,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
    console.log(err.response);
  }
};

// remove participant from workshop
export const removeParticipantFromWorkshop = (workshopId, participantId) => async (dispatch) => {
  try {
    // if window presses on 'ok' on confirmation dialog
    if (window.confirm('האם אתה בטוח שברצונך להסיר את המשתמש?')) {
      const res = await axios.delete(`/workshops/${workshopId}/${participantId}`);

      dispatch({
        type: REMOVE_PARTICIPANT_FROM_WORKSHOP,
        payload: res.data,
      });
    } else {
      // if window presses on 'cancel' on confirmation dialog
      dispatch({
        type: CLEAR_PARTICIPANT,
      });
    }
  } catch (err) {
    alert(err.response.data);
  }
};

// ==== Utility Actions ====

// update current workshop (in redux state) (get workshop by id)
export const updateCurrentWorkshop = (workshop) => async (dispatch) => {
  try {
    const res = await axios.get(`workshops/${workshop._id}`);
    dispatch({
      type: UPDATE_CURRENT_WORKSHOP,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// set participant
export const setParticipant = (participant) => async (dispatch) => {
  dispatch({
    type: SET_PARTICIPANT,
    payload: participant,
  });
};

// clear workshops data
export const clearWorkshopsData = () => async (dispatch) => {
  dispatch({
    type: CLEAR_WORKSHOPS_DATA,
  });
};

export const clearParticipant = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PARTICIPANT,
  });
};
