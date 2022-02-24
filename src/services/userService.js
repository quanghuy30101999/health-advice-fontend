import axios from "axios";

export const getAllUsers = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/users");
};

export const getAllSpecialty = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/specialties");
};

export const createBookingFromPartent = (state, props) => {
  return axios.post(process.env.REACT_APP_BACKEND_URL + "/partent-booking", {
    date: props.time.date,
    doctor_id: props.time.doctor.id,
    email: state.email,
    first_name: state.first_name,
    gender: state.gender,
    address: state.address,
    phone_number: state.phone_number,
    reason: state.reason,
    time_type: props.time.time.key,
  });
};

export const getAllBooking = (date, doctor_id, patient_id) => {
  let url = "";
  if (!!date) {
    url += `date=${date}&`;
  }
  if (!!doctor_id) {
    url += `doctor_id=${doctor_id}&`;
  }
  if (!!patient_id) {
    url += `patient_id=${patient_id}`;
  }
  return axios.get(process.env.REACT_APP_BACKEND_URL + `/bookings?${url}`);
};

export const getAllHistory = (date, doctor_id, patient_id) => {
  let url = "";
  if (!!date) {
    url += `date=${date}&`;
  }
  if (!!doctor_id) {
    url += `doctor_id=${doctor_id}&`;
  }
  if (!!patient_id) {
    url += `patient_id=${patient_id}`;
  }
  return axios.get(process.env.REACT_APP_BACKEND_URL + `/histories?${url}`);
};

export const getDetailUser = (id) => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + `/user/${id}`);
};

export const confirmBooking = (id, status_id) => {
  return axios.put(process.env.REACT_APP_BACKEND_URL + `/booking/${id}`, {
    status_id,
  });
};

export const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL +
      `/schedules?date=${date}&doctor_id=${doctorId}`
  );
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

export const createSchedule = (result) => {
  return axios.post(process.env.REACT_APP_BACKEND_URL + `/schedules`, {
    result,
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
  avatar,
  specialty
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
  bodyFormData.append("specialty", specialty);
  bodyFormData.append("position_id", positionId);
  bodyFormData.append("avatar", avatar);
  return axios.post(
    process.env.REACT_APP_BACKEND_URL + "/register",
    bodyFormData
  );
};

export const createSpecialty = (name, description, doctor_id, image) => {
  let bodyFormData = new FormData();
  bodyFormData.append("name", name);
  bodyFormData.append("description", description);
  bodyFormData.append("doctor_id", doctor_id);
  bodyFormData.append("image", image);

  return axios.post(
    process.env.REACT_APP_BACKEND_URL + "/specialties",
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
