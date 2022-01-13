import axios from "axios";

export const getAllUsers = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/users");
};

export const getTopDoctor = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/doctors");
};

export const updateDoctor = (id, contentMarkdown, contentHTML, description) => {
  return axios.put(process.env.REACT_APP_BACKEND_URL + `/doctor/${id}`, {
    contentMarkdown,
    contentHTML,
    description,
  });
};

export const createUser = (
  email,
  password,
  firstName,
  lastName,
  address,
  phoneNumber,
  gender,
  roleId,
  positionId
) => {
  return axios.post(process.env.REACT_APP_BACKEND_URL + "/register", {
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    gender,
    roleId,
    positionId,
  });
};
