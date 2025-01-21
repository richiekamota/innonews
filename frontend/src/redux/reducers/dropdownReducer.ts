import { FETCH_DROPDOWN_OPTIONS_REQUEST, FETCH_DROPDOWN_OPTIONS_SUCCESS, FETCH_DROPDOWN_OPTIONS_FAILURE, SET_DROPDOWN_ERROR } from "../actions/dropdownActions";

const initialState = {
    sources: [],
    categories: [],
    authors: [],
    error: null,
  };
  
  const dropdownReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DROPDOWN_OPTIONS_REQUEST:
        return {
          ...state,
        };
      
      case FETCH_DROPDOWN_OPTIONS_SUCCESS:
        const sources = Object.values(action.payload.sources);
        const categories = Object.values(action.payload.categories);
        const authors = Object.values(action.payload.authors);
  
        return {
          ...state,
          sources,
          categories,
          authors
        };
      
      case FETCH_DROPDOWN_OPTIONS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      
      case SET_DROPDOWN_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default dropdownReducer;