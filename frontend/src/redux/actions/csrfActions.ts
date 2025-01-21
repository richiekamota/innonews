import { Dispatch } from 'redux';
import apiClient from "../../services/api";

// Action Types
export const CSRF_TOKEN_REQUEST = 'CSRF_TOKEN_REQUEST';
export const CSRF_TOKEN_SUCCESS = 'CSRF_TOKEN_SUCCESS';
export const CSRF_TOKEN_FAILURE = 'CSRF_TOKEN_FAILURE';

// Action to fetch CSRF token
export const fetchCsrfToken = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CSRF_TOKEN_REQUEST });

    try {
      const response = await apiClient.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Extract CSRF token from cookies
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (token) {
        dispatch({
          type: CSRF_TOKEN_SUCCESS,
          payload: token,
        });
      } else {
        dispatch({
          type: CSRF_TOKEN_FAILURE,
          payload: "Failed to fetch CSRF token.",
        });
      }
    } catch (error) {
      dispatch({
        type: CSRF_TOKEN_FAILURE,
        payload: "Failed to fetch CSRF token.",
      });
      console.error("CSRF token error:", error);
    }
  };
};
