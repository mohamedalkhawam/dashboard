import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
export default combineReducers({
  authReducer: authReducer,
  userReducer: userReducer,
});
