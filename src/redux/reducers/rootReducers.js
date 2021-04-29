import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import servicesReducer from "./services";
import plansReducer from "./plans";
import rolesReducer from "./roles";
import permissionsReducer from "./permissions";
export default combineReducers({
  authReducer: authReducer,
  userReducer: userReducer,
  servicesReducer: servicesReducer,
  plansReducer: plansReducer,
  rolesReducer: rolesReducer,
  permissionsReducer: permissionsReducer,
});
