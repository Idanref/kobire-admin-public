import { combineReducers } from 'redux';
import workshop from './workshop';
import admin from './admin';
import coupon from './coupon';

export default combineReducers({
  workshop,
  admin,
  coupon,
});
