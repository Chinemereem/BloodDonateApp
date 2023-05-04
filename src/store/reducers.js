import authSlice from './auth/authSlice';
import requestsSlice from './auth/requestsSlice';
import {combineReducers} from '@reduxjs/toolkit';

const reducers = combineReducers({
  auth: authSlice,
  requests: requestsSlice,
});

export default reducers;
