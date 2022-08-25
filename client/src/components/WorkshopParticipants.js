import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setParticipant } from '../actions/workshop';

// Check if object is empty
const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const WorkshopParticipants = ({ setParticipant, currentWorkshop, currentParticipant }) => {
  // selected participant with redux
  return (
    <Wrapper>
      {/* check if currentWorkshop is not empty */}
      {!isObjectEmpty(currentWorkshop) && (
        <>
          {/* If there is a currentParticipant */}
          {!isObjectEmpty(currentParticipant) && (
            <div className='current-participant-info direction-rtl'>
              <h4>המשתתף שנבחר</h4>
              <p>שם: {currentParticipant.name}</p>
              <p>אימייל: {currentParticipant.email}</p>
              <p>טלפון: {currentParticipant.phone}</p>
              <p>מספר כרטיסים: {currentParticipant.numOfTickets}</p>
              <p>קופון: {currentParticipant.coupon ? currentParticipant.coupon.couponCode : 'אין'}</p>
              {/* if there is a coupon, price will be including the discount, else - without  */}
              <p style={{ color: '#c70000', fontWeight: 'bold' }}>
                סה״כ לתשלום:{' '}
                {currentParticipant.coupon
                  ? ((100 - currentParticipant.coupon.discountPercentage) / 100) * (parseInt(currentParticipant.numOfTickets) * currentWorkshop.price)
                  : parseInt(currentParticipant.numOfTickets) * currentWorkshop.price}
                ₪
              </p>
            </div>
          )}

          {/* Else: there is no currentParticipant, load all participants */}
          {isObjectEmpty(currentParticipant) && (
            <>
              <h2 className='text-align'>רשימת המשתתפים בסדנה</h2>
              <div className='participants-container'>
                {currentWorkshop.participants.map((item) => {
                  return (
                    <button key={item._id} onClick={() => setParticipant(item)}>
                      {item.name}, {item.phone}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .participants-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
  }

  .participants-container button {
    padding: 1rem 1rem;
    width: 13rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .participants-container button:hover {
    opacity: 0.7;
  }

  .current-participant-info {
    text-align: center;
    padding: 1rem;
    background-color: #f1f1f1;
  }

  .direction-rtl {
    direction: rtl;
  }

  .text-align {
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

WorkshopParticipants.propTypes = {
  setParticipant: PropTypes.func.isRequired,

  currentWorkshop: PropTypes.object.isRequired,
  currentParticipant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentWorkshop: state.workshop.currentWorkshop,
  currentParticipant: state.workshop.currentParticipant,
});

export default connect(mapStateToProps, { setParticipant })(WorkshopParticipants);
