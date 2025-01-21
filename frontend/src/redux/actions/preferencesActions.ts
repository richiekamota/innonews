import apiClient from "../../services/api";

// Action Types
export const SAVE_PREFERENCES_REQUEST = "SAVE_PREFERENCES_REQUEST";
export const SAVE_PREFERENCES_SUCCESS = "SAVE_PREFERENCES_SUCCESS";
export const SAVE_PREFERENCES_FAILURE = "SAVE_PREFERENCES_FAILURE";

export const savePreferences = (preferences: any, csrfToken: string, callback: (success: boolean) => void) => async (dispatch: any) => {
  dispatch({ type: SAVE_PREFERENCES_REQUEST });

  try {
    const response = await apiClient.post(
      "/api/preferences",
      preferences,
      {
        headers: {
          "X-XSRF-TOKEN": csrfToken,
          Authorization: `Bearer ${csrfToken}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch({ type: SAVE_PREFERENCES_SUCCESS, payload: response.data });
      callback(true);
    } else {
      dispatch({ type: SAVE_PREFERENCES_FAILURE, error: "Failed to save preferences." });
      callback(false);
    }
  } catch (error) {
    dispatch({ type: SAVE_PREFERENCES_FAILURE, error: error.message });
    callback(false);
  }
};
