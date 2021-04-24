import {
  READ_USERS,
  READ_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CLEAR_USER,
  START_USERS_RELOAD,
  FINISHED_USERS_RELOAD,
} from "../types/user";

const initialState = {
  users: [],
  user: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_USERS:
      console.log({ payload });

      return {
        ...state,
        users: payload,
        readable: true,
      };
    case READ_ONE_USER:
      console.log({ payload });
      return {
        ...state,
        user: payload,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [payload, ...state.users],
      };
    case UPDATE_USER:
      console.log({ payload });
      return {
        ...state,
        users: [
          ...state.users.map((user) =>
            user.id === payload.id ? payload : user
          ),
        ],
      };
    case DELETE_USER:
      console.log({ payload });
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== payload)],
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };
    case START_USERS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_USERS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
