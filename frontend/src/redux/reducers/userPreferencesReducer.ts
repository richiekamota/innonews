import { FETCH_USER_PREFERENCE_REQUEST, 
    FETCH_USER_PREFERENCE_SUCCESS, 
    FETCH_USER_PREFERENCE_FAILURE, 
    SET_USER_PREFERENCE_DROPDOWN_ERROR } from "../actions/userPreferencesActions";

const initialState = {
    sources: [],
    categories: [],
    authors: [],
    error: null,
  };
  
  const userPrefReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_PREFERENCE_REQUEST:
        return {
          ...state,
        };
      
      case FETCH_USER_PREFERENCE_SUCCESS:
        const sources = Object.values(action.payload.sources);
        const categories = Object.values(action.payload.categories);
        const authors = Object.values(action.payload.authors);
    
        return {
          ...state,
          sources,
          categories,
          authors
        };
      
      case FETCH_USER_PREFERENCE_SUCCESS:
        return {
          ...state,
          error: action.payload,
        };
      
      case SET_USER_PREFERENCE_DROPDOWN_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default userPrefReducer;