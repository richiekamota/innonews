import { Dispatch } from 'redux';
import apiClient from "../../services/api";

// Define action types
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const registerUser = (formData: any, csrfToken: string | null) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: REGISTRATION_REQUEST });

    try {
      const response = await apiClient.post(
        '/api/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken || '',
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: REGISTRATION_SUCCESS,
          payload: response.data,
        });
        return true;
      } else {
        dispatch({
          type: REGISTRATION_FAILURE,
          payload: response.data.message || 'Registration failed.',
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: REGISTRATION_FAILURE,
        payload: 'An error occurred. Please try again later.',
      });
      return false;
    }
  };
};
