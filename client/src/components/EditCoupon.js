import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCoupons, setCurrentCoupon, editCoupon } from '../actions/coupon';

const EditCoupon = ({ createNewCoupon, getAllCoupons, setCurrentCoupon, editCoupon, allCoupons, currentCoupon }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [useLimit, setUseLimit] = useState(20);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    getAllCoupons();
  }, [currentCoupon]);

  // update current coupon details in form
  useEffect(() => {
    const date = new Date(currentCoupon.expirationDate);
    setDay(date.getUTCDate());
    setMonth(date.getUTCMonth() + 1); // months starting from 0, hence +1
    setYear(date.getUTCFullYear());
    setTime(date.getUTCHours() + ':' + date.getUTCMinutes());
    setUseLimit(currentCoupon.useLimit);
    setDiscountPercentage(currentCoupon.discountPercentage);
  }, [currentCoupon]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(parseInt(day) >= 1 && parseInt(day) <= 31)) {
      return alert('יום חייב להיות בין 1-31');
    }
    if (!(parseInt(month) >= 1 && parseInt(month) <= 12)) {
      return alert('חודש חייב להיות בין 1-12');
    }
    if (discountPercentage < 0 || discountPercentage > 100) {
      return alert('הנחה בין 0-100%');
    }
    if (useLimit <= 0) {
      return alert('מספר שימושים נמוך מדי');
    }

    const dateToSend = `${month}.${day}.${year} ${time} GMT`;

    const data = {
      expirationDate: dateToSend,
      useLimit,
      discountPercentage,
    };

    editCoupon(data, currentCoupon._id, currentCoupon.couponCode);
    getAllCoupons();
  };

  const clearFields = (e) => {
    e.preventDefault();
    setDay('');
    setMonth('');
    setYear('');
    setTime('');
    setUseLimit(20);
    setDiscountPercentage(0);
  };

  return (
    <Wrapper>
      <>
        {allCoupons.length > 0 && (
          <>
            <h2 className='text-align'>רשימת הקופונים</h2>
            <div className='coupons-container'>
              {allCoupons.map((coupon) => {
                return (
                  <button key={coupon._id} className='coupon-button-color' onClick={() => setCurrentCoupon(coupon)}>
                    {coupon.couponCode}, {coupon.discountPercentage}%
                  </button>
                );
              })}
            </div>
          </>
        )}

        {Object.keys(currentCoupon).length > 0 && (
          <div className='center'>
            <div className='create-workshop-container mtop-1 mbottom-2'>
              <h4 className='text-align'>{currentCoupon.couponCode}</h4>
              <form>
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
                    עדכן קופון
                  </button>
                  <button onClick={(e) => clearFields(e)}>ניקוי שדות</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
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

  .coupons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
  }

  .coupons-container button {
    padding: 1rem 1rem;
    width: 13rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .coupons-container button:hover {
    opacity: 0.7;
  }

  .clr-primary {
    background: #ffa200;
  }

  .center {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .text-align {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .mtop-1 {
    margin-top: 1rem;
  }

  .mbottom-2 {
    margin-bottom: 2rem;
  }

  .coupon-button-color {
    background-color: var(--color-primary);
    color: #333;
  }
`;

EditCoupon.propTypes = {
  getAllCoupons: PropTypes.func.isRequired,
  setCurrentCoupon: PropTypes.func.isRequired,
  editCoupon: PropTypes.func.isRequired,

  allCoupons: PropTypes.array.isRequired,
  currentCoupon: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  allCoupons: state.coupon.allCoupons,
  currentCoupon: state.coupon.currentCoupon,
});

export default connect(mapStateToProps, { getAllCoupons, setCurrentCoupon, editCoupon })(EditCoupon);
