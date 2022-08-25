import axios from 'axios';
import { CREATE_NEW_COUPON, UPDATE_ALL_COUPONS, SET_CURRENT_COUPON, EDIT_COUPON, CLEAR_COUPON_DATA } from './types';

// Create new coupon
export const createNewCoupon = (coupon) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/coupons`, coupon, config);

    dispatch({
      type: CREATE_NEW_COUPON,
      // no need for payload (currentCoupon)
    });
    alert(`הקופון ${coupon.couponCode} נוצר בהצלחה!`);
  } catch (err) {
    alert(err.response.data);
  }
};

// Edit coupon
export const editCoupon = (data, couponId, couponCode) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/coupons/edit/${couponId}`, data, config);

    dispatch({
      type: EDIT_COUPON,
      payload: res.data,
    });

    alert(`הקופון ${couponCode} עודכן בהצלחה!`);
  } catch (err) {
    alert(err.response.data);
  }
};

// Get all coupons
export const getAllCoupons = () => async (dispatch) => {
  try {
    const res = await axios.get('/coupons');

    dispatch({
      type: UPDATE_ALL_COUPONS,
      payload: res.data,
    });
  } catch (err) {
    alert(err.response.data);
  }
};

// Set current coupon
export const setCurrentCoupon = (coupon) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENT_COUPON,
      payload: coupon,
    });
  } catch (err) {
    alert('שגיאה בשיוך הקופון');
  }
};

// ---- Utilities ----

// Clear coupons data
export const clearCouponData = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_COUPON_DATA,
    });
  } catch (err) {
    alert('שגיאה בניקוי הקופונים');
  }
};
