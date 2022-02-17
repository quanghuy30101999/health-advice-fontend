import axios from "axios";

export const getAllUsers = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/users");
};

export const getDetailUser = (id) => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + `/user/${id}`);
};

export const createMarkdown = (
  id,
  contentMarkdown,
  contentHTML,
  description
) => {
  return axios.post(
    process.env.REACT_APP_BACKEND_URL + `/user/${id}/markdown`,
    {
      content_markdown: contentMarkdown,
      contentHTML,
      description,
    }
  );
};

export const updateMarkdown = (
  id,
  contentMarkdown,
  contentHTML,
  description
) => {
  return axios.put(process.env.REACT_APP_BACKEND_URL + `/user/${id}/markdown`, {
    content_markdown: contentMarkdown,
    contentHTML,
    description,
  });
};

export const deleteUser = (id) => {
  return axios.delete(process.env.REACT_APP_BACKEND_URL + `/user/${id}`);
};

export const getAllcode = (type) => {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL + `/allcode?types=${type}`
  );
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
  positionId,
  avatar
) => {
  let bodyFormData = new FormData();
  bodyFormData.append("email", email);
  bodyFormData.append("password", password);
  bodyFormData.append("first_name", firstName);
  bodyFormData.append("last_name", lastName);
  bodyFormData.append("address", address);
  bodyFormData.append("phone_number", phoneNumber);
  bodyFormData.append("gender", gender);
  bodyFormData.append("role_id", roleId);
  bodyFormData.append("position_id", positionId);
  bodyFormData.append("avatar", avatar);
  return axios.post(
    process.env.REACT_APP_BACKEND_URL + "/register",
    bodyFormData
  );
};

export const updateUser = (
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
) => {
  let bodyFormData = new FormData();
  bodyFormData.append("email", email);
  bodyFormData.append("password", password);
  bodyFormData.append("first_name", firstName);
  bodyFormData.append("last_name", lastName);
  bodyFormData.append("address", address);
  bodyFormData.append("phone_number", phoneNumber);
  bodyFormData.append("gender", gender);
  bodyFormData.append("role_id", roleId);
  bodyFormData.append("position_id", positionId);
  bodyFormData.append("avatar", avatar);
  return axios.put(
    process.env.REACT_APP_BACKEND_URL + `/user/${id}`,
    bodyFormData
  );
};
