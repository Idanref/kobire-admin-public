import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAsAdmin } from '../actions/admin';

const LoginScreen = ({ loginAsAdmin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      username: userName,
      password,
    };
    loginAsAdmin(credentials);
  };

  return (
    <Wrapper>
      <div className='center'>
        <div className='container'>
          <h1>אנא הזן פרטים</h1>
          <div className='form-input'>
            <form>
              {/* UserName */}
              <div className='form-group direction-rtl'>
                <label htmlFor='username'>שם משתמש:</label>
                <input type='text' name='username' id='username' value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              {/* Password */}
              <div className='form-group direction-rtl'>
                <label htmlFor='password'>סיסמה:</label>
                <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='buttons'>
                <button type='submit' onClick={(e) => handleSubmit(e)}>
                  אישור
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .center {
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 20%;
    background-color: lightsteelblue;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 5px #000;
  }

  .form-input {
    margin: 2rem 0;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  .buttons button {
    padding: 0.7rem;
    border-radius: 7px;
    background-color: #555;
    width: 4rem;
    color: white;
    border: 1px solid white;
    cursor: pointer;
  }

  .buttons button:hover {
    opacity: 0.9;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.3rem 0;
    margin-bottom: 1rem;
  }

  .form-group label {
    text-align: center;
    width: 100%;
  }

  .form-group input {
    text-align: center;
    border-radius: 5px;
    font-size: 1rem;
  }

  .direction-rtl {
    direction: rtl;
  }

  .text-center {
    text-align: center;
  }

  .clr-white {
    color: white;
  }
`;

LoginScreen.propTypes = {
  loginAsAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loginAsAdmin })(LoginScreen);
