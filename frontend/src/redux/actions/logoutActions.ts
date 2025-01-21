import apiClient from '../../services/api';

// Action Types
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Action Creator for logging out
export const logoutUser = (csrfToken: string | null) => async (dispatch: any) => {
  // Dispatch a request action before performing the API call
  dispatch({ type: LOGOUT_REQUEST });

  if (!csrfToken) {
    // Handle missing CSRF token
    dispatch({
      type: LOGOUT_FAILURE,
      error: 'CSRF Token is missing',
    });
    return;
  }

  try {
    // Perform the logout API request
    const response = await apiClient.post('/api/logout', null, {
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${csrfToken}`,
      },
    });

    // Dispatch success if the logout is successful
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: response.data, // Include any response data if necessary
    });
  } catch (error) {
    // Dispatch failure if there's an error
    dispatch({
      type: LOGOUT_FAILURE,
      error: error.message || 'Logout failed',
    });
  }
};
