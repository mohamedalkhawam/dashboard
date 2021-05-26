import {
  CREATE_NOTIFICATIONS,
  START_NOTIFICATIONS_RELOAD,
  FINISHED_NOTIFICATIONS_RELOAD,
} from "../types/notifications";

const initialState = {
  notifications: [],
  error: {},
  loading: false,
  readable: false,
};

export default function notificationsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: [payload.data, ...state.notifications],
      };
    case START_NOTIFICATIONS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_NOTIFICATIONS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
