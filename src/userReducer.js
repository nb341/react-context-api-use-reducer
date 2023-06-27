import * as ActionTypes from "./ActionTypes";

export const reducer = (
  state = {
    isLoading: false,
    errMess: null,
    todos: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        users: action.payload,
      };

    case ActionTypes.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case ActionTypes.USERS_LOADING:
      return { ...state, isLoading: true, errMess: null, users: null };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        users: null,
      };

    default:
      return state;
  }
};
