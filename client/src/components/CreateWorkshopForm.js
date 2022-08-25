import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createWorkshop } from '../actions/workshop';

const CreateWorkshopForm = ({ createWorkshop }) => {
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState(200);
  const [payBoxUrl, setPayBoxUrl] = useState('');
  const [bitUrl, setBitUrl] = useState('');
  const [maxSpots, setMaxSpots] = useState('');
  const [takenSpots, setTakenSpots] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateToSend = `${month}.${day}.${year} ${time} GMT`;
    const maxSpotsNumber = parseInt(maxSpots);

    if (!(parseInt(day) >= 1 && parseInt(day) <= 31)) {
      return alert('יום חייב להיות בין 1-31');
    }
    if (!(parseInt(month) >= 1 && parseInt(month) <= 12)) {
      return alert('חודש חייב להיות בין 1-12');
    }
    if (price <= 0) {
      return alert('מחיר נמוך מדי, אל תצא פרייאר');
    }

    const workshop = {
      date: dateToSend,
      location,
      maxSpots: maxSpotsNumber,
      takenSpots,
      bitUrl,
      payBoxUrl,
      price: parseInt(price),
    };

    console.log(workshop);
    createWorkshop(workshop);
  };

  const clearFields = (e) => {
    e.preventDefault();
    setLocation('');
    setDay('');
    setMonth('');
    setYear('');
    setTime('');
    setPrice(200);
    setPayBoxUrl('');
    setBitUrl('');
    setMaxSpots('');
    setTakenSpots(0);
  };

  return (
    <Wrapper>
      <div className='center'>
        <div className='create-workshop-container'>
          <form>
            {/* Location */}
            <div className='form-group'>
              <label htmlFor='location'>מיקום</label>
              <input type='text' name='location' id='location' value={location} placeholder='מיקום / תיאור הסדנה' onChange={(e) => setLocation(e.target.value)} />
            </div>
            {/* Day */}
            <div className='form-group'>
              <label htmlFor='location'>יום</label>
              <input type='number' name='day' id='day' min={1} value={day} placeholder='מספר (1-31)' onChange={(e) => setDay(e.target.value)} />
            </div>
            {/* Month */}
            <div className='form-group'>
              <label htmlFor='month'>חודש</label>
              <input type='number' name='month' id='month' value={month} placeholder='מספר (1-12)' onChange={(e) => setMonth(e.target.value)} />
            </div>
            {/* Year */}
            <div className='form-group'>
              <label htmlFor='Year'>שנה</label>
              <input type='number' name='Year' id='Year' value={year} placeholder='מספר' onChange={(e) => setYear(e.target.value)} />
            </div>
            {/* Time */}
            <div className='form-group'>
              <label htmlFor='Time'>זמן</label>
              <input type='text' name='Time' id='Time' value={time} placeholder='בפורמט HH:MM' onChange={(e) => setTime(e.target.value)} />
            </div>
            {/* Price */}
            <div className='form-group'>
              <label htmlFor='Price'>מחיר</label>
              <input type='text' name='Price' id='Price' value={price} placeholder='ברירת מחדל: 200' onChange={(e) => setPrice(e.target.value)} />
            </div>
            {/* PayBox URL */}
            <div className='form-group'>
              <label htmlFor='PayBoxUrl'>קישור פייבוקס</label>
              <input type='text' name='PayBoxUrl' id='PayBoxUrl' value={payBoxUrl} placeholder='לא חובה' onChange={(e) => setPayBoxUrl(e.target.value)} />
            </div>
            {/* Bit URL */}
            <div className='form-group'>
              <label htmlFor='BitUrl'>קישור ביט</label>
              <input type='text' name='BitUrl' id='BitUrl' value={bitUrl} placeholder='לא חובה' onChange={(e) => setBitUrl(e.target.value)} />
            </div>
            {/* Maximum Spots */}
            <div className='form-group'>
              <label htmlFor='maxSpots'>מקסימום משתתפים</label>
              <input type='number' name='maxSpots' id='maxSpots' value={maxSpots} placeholder='לא חובה' onChange={(e) => setMaxSpots(e.target.value)} />
            </div>
            {/* Taken Spots */}
            <div className='form-group'>
              <label htmlFor='takenSpots'>כמה משתתפים כעת</label>
              <input type='number' name='takenSpots' id='takenSpots' value={takenSpots} placeholder='לא חובה' onChange={(e) => setTakenSpots(e.target.value)} />
            </div>
            <div className='form-buttons'>
              <button type='submit' className='clr-primary' onClick={(e) => handleSubmit(e)}>
                יצירת סדנה
              </button>
              <button onClick={(e) => clearFields(e)}>ניקוי שדות</button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .create-workshop-container {
    background: #fff;
    box-shadow: 1px 1px 5px #333;
    padding: 1rem;
    border-radius: 10px;
    display: inline-block;
    direction: rtl;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.3rem 0;
  }

  .form-group label {
    text-align: center;
    width: 100%;
  }

  .form-group input {
    text-align: center;
    border-radius: 5px;
  }

  .form-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }

  .form-buttons button {
    padding: 0.5rem;
    border-radius: 7px;
    border: 1px solid #333;
    cursor: pointer;
  }

  .form-buttons button:hover {
    opacity: 0.9;
  }

  .clr-primary {
    background: #ffa200;
  }

  .center {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

CreateWorkshopForm.propTypes = {
  createWorkshop: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createWorkshop })(CreateWorkshopForm);
