import {
    SAVE_PREFERENCES_REQUEST,
    SAVE_PREFERENCES_SUCCESS,
    SAVE_PREFERENCES_FAILURE,
  } from "../actions/preferencesActions";
  
  const initialState = {
    isSaving: false,
    error: null,
  };
  
  const preferencesReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SAVE_PREFERENCES_REQUEST:
        return { ...state, isSaving: true };
  
      case SAVE_PREFERENCES_SUCCESS:
        return { ...state, isSaving: false };
  
      case SAVE_PREFERENCES_FAILURE:
        return { ...state, isSaving: false, error: action.error };
  
      default:
        return state;
    }
  };
  
  export default preferencesReducer;
  