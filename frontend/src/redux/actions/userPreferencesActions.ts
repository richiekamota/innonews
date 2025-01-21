import apiClient from "../../services/api";

export const FETCH_USER_PREFERENCE_REQUEST = "FETCH_USER_PREFERENCE_REQUEST";
export const FETCH_USER_PREFERENCE_SUCCESS = "FETCH_USER_PREFERENCE_SUCCESS";
export const FETCH_USER_PREFERENCE_FAILURE = "FETCH_USER_PREFERENCE_FAILURE";
export const SET_USER_PREFERENCE_DROPDOWN_ERROR = "SET_USER_PREFERENCE_DROPDOWN_ERROR";

export const userPreferenceOptions = ({ csrfToken }) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_USER_PREFERENCE_REQUEST });

  if (!csrfToken) {
    dispatch({
      type: SET_USER_PREFERENCE_DROPDOWN_ERROR,
      payload: "CSRF Token is missing",
    });
    return;
  }

  try {
    const response = await apiClient.get("/api/user-preferences", {
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${csrfToken}`,
      },
    });

    dispatch({
      type: FETCH_USER_PREFERENCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_PREFERENCE_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};
