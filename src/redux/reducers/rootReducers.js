import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import servicesReducer from "./services";
import plansReducer from "./plans";
import rolesReducer from "./roles";
import permissionsReducer from "./permissions";
import citiesReducer from "./city";
import buildingsReducer from "./buildings";
export default combineReducers({
  authReducer,
  userReducer,
  servicesReducer,
  plansReducer,
  rolesReducer,
  permissionsReducer,
  citiesReducer,
  buildingsReducer,
});
