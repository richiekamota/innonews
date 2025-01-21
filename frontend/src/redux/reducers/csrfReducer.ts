import { CSRF_ACTION_TYPES } from "../csrfTypes";

interface CSRFState {
  csrfToken: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: CSRFState = {
  csrfToken: "",
  isLoading: false,
  error: null,
};

export const csrfReducer = (state = initialState, action: any): CSRFState => {
  switch (action.type) {
    case CSRF_ACTION_TYPES.FETCH_CSRF_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CSRF_ACTION_TYPES.FETCH_CSRF_SUCCESS:
      return { ...state, csrfToken: action.payload, isLoading: false };
    case CSRF_ACTION_TYPES.FETCH_CSRF_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
export default csrfReducer;