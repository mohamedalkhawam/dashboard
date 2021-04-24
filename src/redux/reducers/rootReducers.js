import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import servicesReducer from "./services";
import plansReducer from "./plans";
export default combineReducers({
  authReducer: authReducer,
  userReducer: userReducer,
  servicesReducer: servicesReducer,
  plansReducer: plansReducer,
});
