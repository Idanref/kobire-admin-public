import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNewCoupon } from '../actions/coupon';

const CreateCouponForm = ({ createNewCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [useLimit, setUseLimit] = useState(20);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (couponCode === '') {
      return alert('קוד קופון לא יכול להיות ריק');
    }

    if (!(parseInt(day) >= 1 && parseInt(day) <= 31)) {
      return alert('יום חייב להיות בין 1-31');
    }
    if (!(parseInt(month) >= 1 && parseInt(month) <= 12)) {
      return alert('חודש חייב להיות בין 1-12');
    }
    if (discountPercentage < 0) {
      return alert('הנחה שלילית?');
    }
    if (useLimit <= 0) {
      return alert('מספר שימושים נמוך מדי');
    }

    const dateToSend = `${month}.${day}.${year} ${time} GMT`;

    const coupon = {
      couponCode,
      expirationDate: dateToSend,
      useLimit,
      discountPercentage,
    };

    createNewCoupon(coupon);
  };

  const clearFields = (e) => {
    e.preventDefault();
    setCouponCode('');
    setDay('');
    setMonth('');
    setYear('');
    setTime('');
    setUseLimit(20);
    setDiscountPercentage(0);
  };

  return (
    <Wrapper>
      <div className='center'>
        <div className='create-workshop-container'>
          <form>
            {/* Coupon Code */}
            <div className='form-group'>
              <label htmlFor='couponCode'>קוד קופון</label>
              <input type='text' name='couponCode' id='couponCode' value={couponCode} placeholder='workshop22' onChange={(e) => setCouponCode(e.target.value)} />
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
            {/* Number of uses */}
            <div className='form-group'>
              <label htmlFor='useLimit'>מספר שימושים</label>
              <input type='number' name='useLimit' id='useLimit' value={useLimit} placeholder='מספר' onChange={(e) => setUseLimit(e.target.value)} />
            </div>
            {/* Discount percentage */}
            <div className='form-group'>
              <label htmlFor='discountPercentage'>אחוזי הנחה</label>
              <input
                type='number'
                name='discountPercentage'
                id='discountPercentage'
                value={discountPercentage}
                placeholder='מספר 0-100'
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </div>

            <div className='form-buttons'>
              <button type='submit' className='clr-primary' onClick={(e) => handleSubmit(e)}>
                יצירת קופון
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

CreateCouponForm.propTypes = {
  createNewCoupon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createNewCoupon })(CreateCouponForm);
