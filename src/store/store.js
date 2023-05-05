import { configureStore } from "@reduxjs/toolkit";
import authUser from './userSlice';

const rootReducer = {
  auth: authUser
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
