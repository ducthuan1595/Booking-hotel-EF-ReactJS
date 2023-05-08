export const initState = {
  fullName: '',
    email: '',
    phoneNumber: '',
    identity: ''
};

export const FULL_NAME = 'fullName';
export const PHONE_NUMBER = 'phoneNumber';
export const IDENTITY = 'identity';

const reducer = (state, action) => {
  switch(action.type) {
    case FULL_NAME: 
    console.log(state);
      return  state.fullName = 'invalid'
  }
}

export default reducer;