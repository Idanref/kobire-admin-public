import axios from 'axios';

const setAuthToken = (token) => {
  // if token, set as a header in axios, and will be sent with each request
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
