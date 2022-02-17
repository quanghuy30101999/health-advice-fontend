import actionTypes from "./actionTypes";
import {
  getAllcode,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  createMarkdown,
  updateMarkdown,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllcode("POSITION");
      if (response && response.status === 200) {
        dispatch(fetchPositionSuccess(response.data));
      } else {
        fetchPositionFailed();
      }
    } catch (error) {
      fetchPositionFailed();
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (data) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllcode("ROLE");
      if (response && response.status === 200) {
        dispatch(fetchRoleSuccess(response.data));
      } else {
        fetchRoleFailed();
      }
    } catch (error) {
      fetchRoleFailed();
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
});

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllcode("GENDER");
      if (response && response.status === 200) {
        dispatch(fetchGenderSuccess(response.data));
      } else {
        fetchGenderFailed();
      }
    } catch (error) {
      fetchGenderFailed();
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const createNewUser = (state) => {
  let {
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    gender,
    roleId,
    positionId,
    avatar,
  } = state;
  return async (dispatch, getState) => {
    try {
      let response = await createUser(
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        gender,
        roleId,
        positionId,
        avatar
      );
      if (response && response.status === 200) {
        toast.success("Create user success");
        dispatch(saveUserSuccess(response.data));
      } else {
        saveUserFailed();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(saveUserFailed(error.response.data.message));
    }
  };
};

export const saveUserSuccess = (data) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data,
});

export const saveUserFailed = (message) => ({
  type: actionTypes.CREATE_USER_FAILED,
  message,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllUsers();
      if (response && response.status === 200) {
        dispatch(fetchAllUserSuccess(response.data));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      console.log(error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteUser(id);
      if (response && response.status === 200) {
        toast.success("Delete user success");
        dispatch(deleteUserSuccess(id));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteUserFailed(error.response.data.message));
    }
  };
};

export const deleteUserSuccess = (id) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  id,
});

export const deleteUserFailed = (message) => ({
  type: actionTypes.DELETE_USER_FAILED,
  message,
});

export const updateUserStart = (user) => {
  let {
    id,
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    gender,
    roleId,
    positionId,
    avatar,
  } = user;
  return async (dispatch, getState) => {
    try {
      let response = await updateUser(
        id,
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        gender,
        roleId,
        positionId,
        avatar
      );
      if (response && response.status === 200) {
        toast.success("Update user success");
        dispatch(updateUserSuccess(response.data));
      } else {
        dispatch(updateUserFailed());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateUserFailed(error.response.data.message));
    }
  };
};

export const updateUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  data,
});

export const updateUserFailed = (message) => ({
  type: actionTypes.UPDATE_USER_FAILED,
  message,
});

export const createMarkdownStart = (
  id,
  contentMarkdown,
  contentHTML,
  description
) => {
  return async (dispatch, getState) => {
    try {
      let response = await createMarkdown(
        id,
        contentMarkdown,
        contentHTML,
        description
      );
      if (response && response.status === 200) {
        toast.success("Create success");
        dispatch(createMarkdownSuccess(response.data));
      } else {
        dispatch(createMarkdownFailed());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(createMarkdownFailed());
      console.log(error);
    }
  };
};

export const createMarkdownSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  data,
});

export const createMarkdownFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

export const updateMarkdownStart = (
  id,
  contentMarkdown,
  contentHTML,
  description
) => {
  return async (dispatch, getState) => {
    try {
      let response = await updateMarkdown(
        id,
        contentMarkdown,
        contentHTML,
        description
      );
      if (response && response.status === 200) {
        toast.success("Update information success");
        dispatch(updateMarkdownSuccess(response.data));
      } else {
        dispatch(updateMarkdownFailed());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateMarkdownFailed());
    }
  };
};

export const updateMarkdownSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  data,
});

export const updateMarkdownFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});
