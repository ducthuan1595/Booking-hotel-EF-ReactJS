import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    searchListHotel: [],
  },
  reducers: {
    searchListHotel: (state, action) => {
      state.searchListHotel = action.payload;
    }
  }
});

const { reducer, actions } = hotelSlice;

export const { searchListHotel } = hotelSlice.actions;
export default reducer;