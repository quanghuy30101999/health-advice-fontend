import axios from "axios";

export const handleLogin = (email, password) => {
  return axios.post(process.env.REACT_APP_BACKEND_URL + "/login", {
    email,
    password,
  });
};

export const handleRegister = ({
  email,
  password,
  firstName,
  lastName,
  address,
  phoneNumber,
  gender,
  roleId,
  positionId,
}) => {
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
