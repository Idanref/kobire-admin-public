import React, { useState } from 'react';
import WorkshopParticipants from './WorkshopParticipants';
import WorkshopPendings from './WorkshopPendings';

import styled from 'styled-components';
import CreateWorkshopForm from './CreateWorkshopForm';
import UpdateWorkshopForm from './UpdateWorkshopForm';
import WorkshopsWindow from './WorkshopsWindow';
import CreateCouponForm from './CreateCouponForm';
import EditCoupon from './EditCoupon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleSoldout, clearWorkshopsData, clearParticipant, removeParticipantFromWorkshop, approveUserPayment } from '../actions/workshop';
import { clearCouponData } from '../actions/coupon';

// Check if an object is empty
const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const Buttons = ({
  toggleSoldout,
  clearWorkshopsData,
  clearParticipant,
  removeParticipantFromWorkshop,
  approveUserPayment,
  clearCouponData,
  currentWorkshop,
  currentParticipant,
}) => {
  // createWorkshopButton = צור סדנה
  // soldOutButton = סמן סדנה כסולד אאוט
  // approveUsersButton = אשר משתתפים
  // removeParticipantButton = הסר משתתף מהסדנה
  // updateWorkshopButton = עדכן סדנה
  // createNewCoupon = צור קופון חדש
  // editCoupon - ערוך קופון
  const [currentButton, setCurrentButton] = useState('');

  return (
    <Wrapper>
      <div className='main-container direction-rtl'>
        <div className='buttons-container'>
          <div className='buttons'>
            {/* Create workshop button */}
            <button
              onClick={() => {
                setCurrentButton('createWorkshopButton');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'createWorkshopButton' ? 'active-button' : ''}
              disabled={currentButton === 'createWorkshopButton'}
            >
              צור סדנה
            </button>

            {/* Update workshop button */}
            <button
              onClick={() => {
                setCurrentButton('updateWorkshopButton');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'updateWorkshopButton' ? 'active-button' : ''}
              disabled={currentButton === 'updateWorkshopButton'}
            >
              עדכן סדנה
            </button>

            {/* Soldout button */}
            <button
              onClick={() => {
                setCurrentButton('soldOutButton');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'soldOutButton' ? 'active-button' : ''}
              disabled={currentButton === 'soldOutButton'}
            >
              סמן כסולד אאוט (וההפך)
            </button>

            {/* Approve users button */}
            <button
              onClick={() => {
                setCurrentButton('approveUsersButton');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'approveUsersButton' ? 'active-button' : ''}
              disabled={currentButton === 'approveUsersButton'}
            >
              אשר משתתפים
            </button>

            {/* Remove participant button */}
            <button
              onClick={() => {
                setCurrentButton('removeParticipantButton');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'removeParticipantButton' ? 'active-button' : ''}
              disabled={currentButton === 'removeParticipantButton'}
            >
              הסר משתתף מסדנה
            </button>

            {/* Create new coupon button */}
            <button
              onClick={() => {
                setCurrentButton('createNewCoupon');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'createNewCoupon' ? 'active-button' : ''}
              disabled={currentButton === 'createNewCoupon'}
            >
              צור קופון
            </button>

            {/* Edit coupon button */}
            <button
              onClick={() => {
                setCurrentButton('editCoupon');
                clearWorkshopsData();
                clearCouponData();
              }}
              className={currentButton === 'editCoupon' ? 'active-button' : ''}
              disabled={currentButton === 'editCoupon'}
            >
              ערוך קופון
            </button>
          </div>
        </div>
      </div>
      <br></br>
      {/* ^ end of main-container */}

      {/* ---- Components Rendering ---- */}

      {/* Create workshop */}
      {currentButton === 'createWorkshopButton' && (
        <>
          <h1 className='text-center'>צור סדנה חדשה</h1>
          <br />
          <CreateWorkshopForm />
        </>
      )}

      {/* Update workshop */}
      {currentButton === 'updateWorkshopButton' && (
        <>
          <h1 className='text-center'>עדכן סדנה קיימת</h1>
          <br />
          <WorkshopsWindow />
          <br />
          {!isObjectEmpty(currentWorkshop) && <UpdateWorkshopForm />}
          <br />
        </>
      )}

      {/* Toggle soldout */}
      {currentButton === 'soldOutButton' && (
        <>
          <div className='center direction-rtl'>
            <h1>עדכן מצב Sold Out לסדנה</h1>
          </div>
          <br />
          <WorkshopsWindow />
          <br />
          {!isObjectEmpty(currentWorkshop) && (
            <div className='center'>
              <button className='action-button clr-action' onClick={() => toggleSoldout(currentWorkshop._id)}>
                שנה מצב סולד אאוט
              </button>
            </div>
          )}
        </>
      )}

      {/* Approve users */}
      {currentButton === 'approveUsersButton' && (
        <>
          <div className='center direction-rtl'>
            <h1>אשר כי משתתף העביר תשלום</h1>
          </div>
          <br />
          <WorkshopsWindow />
          <br />
          <WorkshopPendings />
          {!isObjectEmpty(currentParticipant) && (
            <div className='center'>
              <button className='action-button' onClick={clearParticipant}>
                בטל בחירה
              </button>
              <button className='action-button btn-green' onClick={() => approveUserPayment(currentWorkshop._id, currentParticipant._id)}>
                אשר העברת תשלום
              </button>
            </div>
          )}
        </>
      )}
      {/* Remove participant */}
      {currentButton === 'removeParticipantButton' && (
        <>
          <div className='center direction-rtl'>
            <h1>הסר משתתף מסדנה</h1>
          </div>
          <br />
          <WorkshopsWindow />
          <br />
          <WorkshopParticipants />
          {!isObjectEmpty(currentParticipant) && (
            <div className='center'>
              <button className='action-button' onClick={clearParticipant}>
                בטל בחירה
              </button>
              <button className='action-button btn-danger' onClick={() => removeParticipantFromWorkshop(currentWorkshop._id, currentParticipant._id)}>
                הסר משתתף
              </button>
            </div>
          )}
        </>
      )}

      {/* Create new coupon */}
      {currentButton === 'createNewCoupon' && (
        <>
          <h1 className='text-center'>צור קופון חדש</h1>
          <br />
          <CreateCouponForm />
        </>
      )}

      {/* Edit coupon */}
      {currentButton === 'editCoupon' && (
        <>
          <h1 className='text-center bg-primary pad-1'>ערוך קופון</h1>
          <br />
          <EditCoupon />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .main-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .buttons-container {
    padding: 1rem;
    max-height: 20vh;
    /* background: red; */
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    /* background: red; */
  }

  .buttons button {
    padding: 0.7rem;
    margin: 0.8rem 1rem;
    border-radius: 10px;
    border: 1px solid #333;
    box-shadow: 0px 1px 2px #333;
    cursor: pointer;
    background-color: #fdb44e;
    color: #333;
  }

  .buttons button:hover {
    opacity: 0.9;
  }

  .active-button {
    opacity: 0.9;
    transform: translateY(0.4rem);
    box-shadow: 1px 1px 2px #000;
    border-bottom: 3px solid #333;
  }

  /* Action Button */
  .action-button {
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #333;
    cursor: pointer;
    margin: 1rem 0;
  }

  .action-button:hover {
    opacity: 0.9;
  }

  .clr-action {
    background-color: #fdb44e;
  }

  .btn-green {
    background-color: #008000;
    color: #fff;
  }

  .btn-danger {
    background-color: #c70000;
    color: #fff;
  }

  .direction-rtl {
    direction: rtl;
  }

  .center {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .text-center {
    text-align: center;
  }

  .bg-primary {
    background: var(--color-primary);
  }

  .pad-1 {
    padding: 1rem;
  }
`;

Buttons.propTypes = {
  toggleSoldout: PropTypes.func.isRequired,
  clearWorkshopsData: PropTypes.func.isRequired,
  clearParticipant: PropTypes.func.isRequired,
  removeParticipantFromWorkshop: PropTypes.func.isRequired,
  approveUserPayment: PropTypes.func.isRequired,
  clearCouponData: PropTypes.func.isRequired,

  currentWorkshop: PropTypes.object.isRequired,
  currentParticipant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentWorkshop: state.workshop.currentWorkshop,
  currentParticipant: state.workshop.currentParticipant,
});

export default connect(mapStateToProps, { toggleSoldout, clearWorkshopsData, clearParticipant, removeParticipantFromWorkshop, approveUserPayment, clearCouponData })(Buttons);
