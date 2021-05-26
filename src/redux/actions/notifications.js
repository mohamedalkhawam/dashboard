import {
  CREATE_NOTIFICATIONS,
  START_NOTIFICATIONS_RELOAD,
  FINISHED_NOTIFICATIONS_RELOAD,
  NOTIFICATIONS_ERROR,
} from "../types/notifications";

import { createItemAsync } from "./equCurd/createItem";

export const startNotificationsReload = () => (dispatch) => {
  dispatch({ type: START_NOTIFICATIONS_RELOAD });
};

export const finishedNotificationsReload = () => (dispatch) => {
  dispatch({ type: FINISHED_NOTIFICATIONS_RELOAD });
};

export const createNotifications = (formData) =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + "/api/notifications",
    successType: CREATE_NOTIFICATIONS,
    errorType: NOTIFICATIONS_ERROR,
    startReload: startNotificationsReload,
    finishedReload: finishedNotificationsReload,
    title: "notifications",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });
