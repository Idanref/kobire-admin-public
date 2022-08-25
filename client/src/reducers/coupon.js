import { CREATE_NEW_COUPON, UPDATE_ALL_COUPONS, SET_CURRENT_COUPON, EDIT_COUPON, CLEAR_COUPON_DATA } from '../actions/types';

const initialState = {
  currentCoupon: {},
  allCoupons: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NEW_COUPON:
      return {
        ...state,
      };
    case UPDATE_ALL_COUPONS:
      return {
        ...state,
        allCoupons: payload,
      };
    case SET_CURRENT_COUPON:
      return {
        ...state,
        currentCoupon: payload,
      };
    case EDIT_COUPON:
      return {
        ...state,
        currentCoupon: payload,
      };
    case CLEAR_COUPON_DATA:
      return {
        ...state,
        currentCoupon: {},
        allCoupons: [],
      };
    default:
      return state;
  }
}
