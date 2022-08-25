import { ADMIN_SIGNED_IN, SIGN_IN_FAILED } from '../actions/types';

const initialState = {
  adminSignedIn: false,
  token: localStorage.getItem('token'),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_SIGNED_IN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        adminSignedIn: true,
        ...payload,
        // here ...payload will spread the "token": <value> field
      };
    case SIGN_IN_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        adminSignedIn: false,
      };
    default:
      return state;
  }
}
