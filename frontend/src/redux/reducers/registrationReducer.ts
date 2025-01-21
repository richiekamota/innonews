import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
  } from '../actions/registrationActions';
  
  const initialState = {
    isLoading: false,
    message: '',
    success: false,
  };
  
  const registrationReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case REGISTRATION_REQUEST:
        return { ...state, isLoading: true };
      case REGISTRATION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: true,
          message: 'Registration successful! Redirecting to login...',
        };
      case REGISTRATION_FAILURE:
        return { ...state, isLoading: false, message: action.payload, success: false };
      default:
        return state;
    }
  };
  
  export default registrationReducer;
  