import axios from "axios";

export const getAllUsers = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/users");
};

export const createUser = (email, password, firstName, lastName, address) => {
  return axios.post(process.env.REACT_APP_BACKEND_URL + "/register", {
    email,
    password,
    firstName,
    lastName,
    address,
  });
};
