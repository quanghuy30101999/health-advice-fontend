import actionTypes from "./actionTypes";

export const addUserSuccess = (user) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  user,
});

export const userLoginSuccess = (user) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  user: user,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
