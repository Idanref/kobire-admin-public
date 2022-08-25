import { useEffect } from 'react';
import './App.css';
import Buttons from './components/Buttons';
import LoginScreen from './components/LoginScreen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

function App({ adminSignedIn }) {
  // check for token in local storage when app first runs
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return <>{adminSignedIn ? <Buttons /> : <LoginScreen />}</>;
}

App.propTypes = {
  adminSignedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  adminSignedIn: state.admin.adminSignedIn,
});

export default connect(mapStateToProps, {})(App);
