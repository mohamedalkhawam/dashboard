import {
  READ_STATISTICS,
  START_STATISTICS_RELOAD,
  FINISHED_STATISTICS_RELOAD,
  STATISTICS_ERROR,
} from "../types/statistics";

import { readItemsAsync } from "./equCurd/readItems";

export const startStatisticsReload = () => (dispatch) => {
  dispatch({ type: START_STATISTICS_RELOAD });
};

export const finishedStatisticsReload = () => (dispatch) => {
  dispatch({ type: FINISHED_STATISTICS_RELOAD });
};

export const readStatistics = (query) =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/statistics/all`,
    successType: READ_STATISTICS,
    errorType: STATISTICS_ERROR,
    startReload: startStatisticsReload,
    finishedReload: finishedStatisticsReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token"),
    },
  });
