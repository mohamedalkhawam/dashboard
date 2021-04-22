import {
  READ_USERS,
  READ_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
  CLEAR_USER,
  START_USERS_RELOAD,
  FINISHED_USERS_RELOAD,
} from "../types/user";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startUsersReload = () => (dispatch) => {
  dispatch({ type: START_USERS_RELOAD });
};

export const finishedUsersReload = () => (dispatch) => {
  dispatch({ type: FINISHED_USERS_RELOAD });
};

export const readUsers = () =>
  readItemsAsync({
    url: "http://localhost:8080/api/users/all",
    successType: READ_USERS,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const readOneUser = (id) =>
  readOneItemAsync({
    url: "http://localhost:8080/api/users/",
    successType: READ_ONE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const createUser = (formData) =>
  createItemAsync({
    url: "http://localhost:8080/api/users",
    successType: CREATE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const updateUser = (formData) =>
  updateItemAsync({
    url: "http://localhost:8080/api/users/",
    successType: UPDATE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    formData,
    id: formData._id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const deleteUser = (id) =>
  deleteItemAsync({
    url: "http://localhost:8080/api/users/",
    successType: DELETE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};
