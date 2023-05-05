import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? {};
console.log('current-user', currentUser);
let isLogin = false;
if(currentUser) {
  isLogin = true;
}
console.log(isLogin)

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: isLogin
  },
  reducers: {
    login: (state) => {
      state.isLogin = !state.isLogin;
    }
  }
});

const { reducer, actions } = userSlice;

export const { login } = userSlice.actions;
export default reducer;