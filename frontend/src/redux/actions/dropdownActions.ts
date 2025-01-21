import { Dispatch } from "redux";
import apiClient from "../../services/api";

// Action Types
export const FETCH_DROPDOWN_OPTIONS_REQUEST = "FETCH_DROPDOWN_OPTIONS_REQUEST";
export const FETCH_DROPDOWN_OPTIONS_SUCCESS = "FETCH_DROPDOWN_OPTIONS_SUCCESS";
export const FETCH_DROPDOWN_OPTIONS_FAILURE = "FETCH_DROPDOWN_OPTIONS_FAILURE";
export const SET_DROPDOWN_ERROR = "SET_DROPDOWN_ERROR";

export const fetchDropdownOptions = ({csrfToken}) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_DROPDOWN_OPTIONS_REQUEST });

  if (!csrfToken) {
    dispatch({
      type: SET_DROPDOWN_ERROR,
      payload: "CSRF Token is missing",
    });
    return;
  }

  try {
    const response = await apiClient.get("/api/dropdown-options", {
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${csrfToken}`,
      },
    });

    dispatch({
      type: FETCH_DROPDOWN_OPTIONS_SUCCESS,
      payload: response.data,  // This will be passed to the reducer
    });
  } catch (error) {
    dispatch({
      type: FETCH_DROPDOWN_OPTIONS_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};
