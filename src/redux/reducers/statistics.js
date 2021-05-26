import {
  READ_STATISTICS,
  START_STATISTICS_RELOAD,
  FINISHED_STATISTICS_RELOAD,
} from "../types/statistics";

const initialState = {
  statistics: [],
  error: {},
  loading: false,
  readable: false,
};

export default function statisticsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_STATISTICS:
      return {
        ...state,
        statistics: payload.data,
        readable: true,
      };

    case START_STATISTICS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_STATISTICS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
