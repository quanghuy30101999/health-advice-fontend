import { getTopDoctor } from "../../services/userService";
import actionTypes from "./actionTypes";

export const addUserSuccess = (userInfo) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  userInfo,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const userRegisterSuccess = () => ({
  type: actionTypes.USER_REGISTER_SUCCESS,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctor();
      if (res && res.status === 200) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      });
    }
  };
};
