import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of your auth state
interface AuthState {
  username: string | null;
  csrfToken: string | null;
}

// Get stored values from localStorage, fall back to null if not found
const initialState: AuthState = {
  username: localStorage.getItem("username") || null,
  csrfToken: localStorage.getItem("csrfToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout action, clears state and localStorage
    logout(state: AuthState) {
      state.username = null;
      state.csrfToken = null;
      localStorage.removeItem("username");
      localStorage.removeItem("csrfToken");
    },
    // Set authentication data in state and localStorage
    setAuthData(state: AuthState, action: PayloadAction<{ username: string; csrfToken: string }>) {
      state.username = action.payload.username;
      state.csrfToken = action.payload.csrfToken;
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("csrfToken", action.payload.csrfToken);
    },
  },
});

// Export actions for use in your components
export const { logout, setAuthData } = authSlice.actions;

// Default reducer export
export default authSlice.reducer;
