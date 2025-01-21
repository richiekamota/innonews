import { combineReducers } from "redux";
import dropdownReducer from "./dropdownReducer";
import articleReducer from "./articleReducer";
import preferencesReducer from "./preferencesReducer";
import userPreferencesReducer from "./userPreferencesReducer";
import registrationReducer from "./registrationReducer";
import csrfReducer from "./csrfReducer";
import loginUserReducer from "./loginUserReducer";

const rootReducer = combineReducers({
  dropdown: dropdownReducer,
  articles: articleReducer,
  preferences: preferencesReducer,
  registration: registrationReducer,
  userPreferences: userPreferencesReducer,
  csrf: csrfReducer,
  auth: loginUserReducer,
});

export default rootReducer;
