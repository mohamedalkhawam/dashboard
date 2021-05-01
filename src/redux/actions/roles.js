import {
  READ_ROLES,
  READ_ONE_ROLE,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  SEARCH_ROLE_FILTER,
  ROLE_ERROR,
  CLEAR_ROLE,
  START_ROLES_RELOAD,
  FINISHED_ROLES_RELOAD,
} from "../types/roles";

import { readItemsAsync } from "./equCurd/readItems";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";
import { readOneItemAsync } from "./equCurd/readOneItem";

export const startRolesReload = () => (dispatch) => {
  dispatch({ type: START_ROLES_RELOAD });
};

export const finishedRolesReload = () => (dispatch) => {
  dispatch({ type: FINISHED_ROLES_RELOAD });
};

export const readRoles = () =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/roles/all",
    successType: READ_ROLES,
    errorType: ROLE_ERROR,
    startReload: startRolesReload,
    finishedReload: finishedRolesReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const readOneRole = (id) =>
  readOneItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/roles/",
    successType: READ_ONE_ROLE,
    errorType: ROLE_ERROR,
    startReload: startRolesReload,
    finishedReload: finishedRolesReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const createRole = (formData) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/roles/",

    successType: CREATE_ROLE,
    errorType: ROLE_ERROR,
    startReload: startRolesReload,
    finishedReload: finishedRolesReload,
    formData,
    title: "Role",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const updateRole = (formData) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/roles/",
    successType: UPDATE_ROLE,
    errorType: ROLE_ERROR,
    startReload: startRolesReload,
    finishedReload: finishedRolesReload,
    formData,
    id: formData._id,
    title: "Role",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const deleteRole = (id) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/roles/",
    successType: DELETE_ROLE,
    errorType: ROLE_ERROR,
    startReload: startRolesReload,
    finishedReload: finishedRolesReload,
    id,
    title: "Role",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const searchRoleFilter = (text) => (dispatch) => {
  dispatch({
    type: SEARCH_ROLE_FILTER,
    payload: text,
  });
};

export const clearRole = () => (dispatch) => {
  dispatch({ type: CLEAR_ROLE });
};
