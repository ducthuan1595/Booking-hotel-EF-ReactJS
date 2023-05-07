import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? {};
console.log(currentUser);
let isLogin = false;
if(Object.keys(currentUser).length !== 0) {
  console.log('ok');
  isLogin = true;
}

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: isLogin,
    informUser: currentUser
  },
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      state.isLogin = true;
    },
    signOut: (state) => {
      console.log('delete');
      localStorage.removeItem('currentUser');
      state.isLogin = false;
    },
    getInformUser: (state) => {
      state.informUser = JSON.parse(localStorage.getItem('currentUser')) ?? {};
    }
  }
});

const { reducer, actions } = userSlice;

export const { signOut, signIn, getInformUser } = userSlice.actions;
export default reducer;