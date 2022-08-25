import React, { useState, useEffect } from 'react';
import '../select-workshop.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import hebrewLocale from 'moment/locale/he';
import { getLocations, getWorkshopsInCity, updateCurrentWorkshop, clearParticipant } from '../actions/workshop';

// HTML & CSS Took from main project
const WorkshopsWindow = ({ getLocations, getWorkshopsInCity, updateCurrentWorkshop, locations, workshopsInCity, currentWorkshop, clearParticipant }) => {
  const [datesVisible, setDatesVisible] = useState(false);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const handleChooseLocation = async (city) => {
    setDatesVisible(true);
    await getWorkshopsInCity(city);
    clearParticipant();
  };

  const handleChooseDate = (workshop) => {
    updateCurrentWorkshop(workshop);
    clearParticipant();
  };

  return (
    <Wrapper>
      <section id='order'>
        <div className='order-container'>
          <h1>בחר סדנת צילום</h1>
          <hr />
          <div className='buttons-container direction-rtl'>
            {locations.map((item) => {
              return (
                <button key={item._id} onClick={() => handleChooseLocation(item)}>
                  {item}
                </button>
              );
            })}
          </div>

          {datesVisible && (
            <div className='select animated zoomIn'>
              <input type='radio' name='option' />
              <i className='toggle icon icon-arrow-down'></i>
              <i className='toggle icon icon-arrow-up'></i>
              <span className='placeholder'>בחרו יום ותאריך</span>

              {/* Goes through all workshops in city and shows info */}
              {workshopsInCity.map((item) => {
                return (
                  <label key={item._id} className='option'>
                    <input type='radio' name='option' onChange={() => handleChooseDate(item)} />
                    <span className={item.soldOut ? 'title animated fadeIn unavailable' : 'title animated fadeIn'}>
                      <Moment utc format='יום dddd, DD/MM/YYYY בשעה HH:mm'>
                        {item.date}
                      </Moment>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Chosen Workshops Info */}
      {/* If currentWorkshop is not empty: */}
      {Object.keys(currentWorkshop).length !== 0 && (
        <div className='chosen-workshop-info direction-rtl'>
          <h4>הסדנה שנבחרה</h4>
          <p>מיקום: {currentWorkshop.location}</p>
          <p>
            תאריך:{' '}
            <Moment utc format='יום dddd, DD/MM/YYYY בשעה HH:mm'>
              {currentWorkshop.date}
            </Moment>
          </p>
          <p>מחיר: {currentWorkshop.price}₪</p>
          <p>
            סולד אאוט: <span className={currentWorkshop.soldOut ? 'soldout-true' : 'soldout-false'}>{currentWorkshop.soldOut ? 'true' : 'false'}</span>
          </p>
          <p>משתתפים כרגע: {currentWorkshop.takenSpots}</p>
          <p>מקסימום משתתפים: {currentWorkshop.maxSpots ? currentWorkshop.maxSpots : 'ללא הגבלה'}</p>
          <p>מזהה סדנה: {currentWorkshop._id}</p>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* CSS for 'select' element is imported seperately */

  #order {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f4f4f4;
    opacity: 0.9;
  }

  .order-container {
    background-color: #444;
    width: 70%;
    height: 50%;
    border-radius: 20px;
    text-align: center;
    color: #fff;
  }

  .order-container h1 {
    margin-top: 1rem;
  }

  .order-container hr {
    width: 40%;
    height: 0.2rem;
    background: var(--color-primary);
    border-color: var(--color-primary);
    margin: auto;
    margin-top: 0.7rem;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .buttons-container button {
    flex: 1 0 25%;
    height: 4rem;
    font-size: 120%;
    color: #f4f4f4;
    background: transparent;
    opacity: 0.5;
    border-radius: 10px;
    margin-top: 10px;
    border-color: #fff;
    border: none;
    transition: all 0.5s ease;
    outline: none;
  }

  .buttons-container button:hover {
    opacity: 1;
    cursor: pointer;
  }

  .buttons-container button:focus {
    color: #fff;
    opacity: 1;
    box-shadow: none;
  }

  .direction-rtl {
    direction: rtl;
  }

  .unavailable {
    text-decoration: line-through;
  }

  .bit-paybox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
    justify-content: center;
  }

  .bit-paybox button {
    background-color: transparent;
    outline: none;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  .chosen-workshop-info {
    text-align: center;
    padding: 1rem;
    background-color: #fcd299;
  }

  .soldout-false {
    color: #fff;
    background-color: #c70000;
    padding: 0.2rem;
    border-radius: 10px;
  }

  .soldout-true {
    color: #fff;
    background-color: green;
    padding: 0.2rem;
    border-radius: 10px;
  }

  @media only screen and (max-width: 768px) {
    .order-container {
      width: 100%;
    }

    .buttons-container button {
      flex: 1 0 25%;
    }

    .bit-paybox {
      width: 100%;
    }
  }
`;

WorkshopsWindow.propTypes = {
  getLocations: PropTypes.func.isRequired,
  getWorkshopsInCity: PropTypes.func.isRequired,
  updateCurrentWorkshop: PropTypes.func.isRequired,
  clearParticipant: PropTypes.func.isRequired,

  locations: PropTypes.array.isRequired,
  workshopsInCity: PropTypes.array.isRequired,
  currentWorkshop: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  locations: state.workshop.locations,
  workshopsInCity: state.workshop.workshopsInCity,
  currentWorkshop: state.workshop.currentWorkshop,
});

export default connect(mapStateToProps, { getLocations, getWorkshopsInCity, updateCurrentWorkshop, clearParticipant })(WorkshopsWindow);
