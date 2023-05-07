import { configureStore } from "@reduxjs/toolkit";
import authUser from './userSlice';
import hotels from './hotelSlice';

const rootReducer = {
  auth: authUser,
  hotel: hotels
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
