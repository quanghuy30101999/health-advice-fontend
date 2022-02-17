import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  errMess: "",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      let copyState2 = { ...state };
      copyState2.roles = action.data;
      return {
        ...copyState2,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.data] };
    case actionTypes.CREATE_USER_FAILED:
      return { ...state, errMess: action.message };
    case actionTypes.FETCH_POSITION_SUCCESS:
      let copyState3 = { ...state };
      copyState3.positions = action.data;
      return {
        ...copyState3,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      let copyState4 = { ...state };
      copyState4.users = action.data;
      return {
        ...copyState4,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      const { id } = action;
      return {
        ...state,
        users: state.users.filter((item) => item.id !== id),
      };
    case actionTypes.DELETE_USER_FAILED:
      return { ...state, errMess: action.message };
    case actionTypes.UPDATE_USER_SUCCESS:
      let users = state.users;
      let index = users.findIndex((value) => value.id === action.data.id);
      console.log(action.data);
      if (index > 0) {
        users[index] = action.data;
      }
      return {
        ...state,
        users: [...users],
      };

    case actionTypes.UPDATE_USER_FAILED:
      return { ...state, errMess: action.message };
    default:
      return state;
  }
};

export default appReducer;
