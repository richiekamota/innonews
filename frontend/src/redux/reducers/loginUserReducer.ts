import { AUTH_ACTION_TYPES } from "../authTypes";

interface AuthState {
  isAuthenticated: boolean;
  message: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  message: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_ACTION_TYPES.SET_USER:
        return {
          ...state,
          username: action.payload.username,
        };
      case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
        };
      case AUTH_ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      // other cases...
      default:
        return state;
    }
  };
export default authReducer;