import { Dispatch } from "redux";
import { AUTH_ACTION_TYPES } from "../authTypes";
import apiClient from "../../services/api";

// Action to set the user in Redux
export const setUser = (username: string) => ({
  type: AUTH_ACTION_TYPES.SET_USER,
  payload: { username },
});

// Action to handle user login
export const loginUser = (credentials: { email: string, password: string }, csrfToken: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: AUTH_ACTION_TYPES.LOGIN_REQUEST });

    const response = await apiClient.post(
      "/api/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
      }
    );

    if (response.status === 200) {
      // Store username in localStorage
      localStorage.setItem("username", response.data.username);

      // Dispatch SET_USER action to store username in Redux
      dispatch(setUser(response.data.username));

      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        payload: { message: response.data.message },
      });

      return true;
    } else {
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
        payload: response.data.message || "Login failed.",
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
      payload: "An error occurred while logging in.",
    });
    return false;
  }
};
