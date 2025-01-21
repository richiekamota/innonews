import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../actions/logoutActions';

const initialState = {
  isLoggedIn: true,
  error: null,
  loading: false,
};

const logoutReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default logoutReducer;
