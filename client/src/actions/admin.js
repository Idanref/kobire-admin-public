import axios from 'axios';
import { ADMIN_SIGNED_IN, SIGN_IN_FAILED } from './types';
import setAuthToken from '../utils/setAuthToken';

// login as admin
export const loginAsAdmin = (credentials) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/admin/login`, credentials, config);

    dispatch({
      type: ADMIN_SIGNED_IN,
      payload: res.data,
    });
    console.log('Admin logged in!');
  } catch (err) {
    alert(err.response.data);
    dispatch({
      type: SIGN_IN_FAILED,
    });
  }
};
