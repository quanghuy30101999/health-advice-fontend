import React, { Component, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Register.scss";
import { FormattedMessage } from "react-intl";
import { handleRegister } from "../../services/authService";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "",
    roleId: "R2",
    positionId: "",
    errMessage: "",
  });
  function handleOnChangeInput(event, name) {
    const { value } = event.target;
    setState((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleOnClickregister() {
    try {
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
      } = state;
      let data = await handleRegister({
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
      if (data.status === 200) {
        if (data.data.status === 400) {
          setState({
            errMessage: data.data.message,
          });
        } else {
          if (roleId === "R2") {
            history.push(`/setup-account/${data.data.id}`);
          } else {
            history.push("/login");
          }
        }
      }
    } catch (error) {}
  }
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
    display,
    errMessage,
  } = state;
  return (
    <>
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <div className="col-12 text-center headerTitle">
              <FormattedMessage id="register.register" />
            </div>
            <div className="col-12 form-group register-input">
              <div>Email:</div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your username"
                value={email}
                onChange={(event) => handleOnChangeInput(event, "email")}
              ></input>
            </div>

            <div className="col-12 form-group register-input">
              <div>Password:</div>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={display ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  name="password"
                  onChange={(event) => handleOnChangeInput(event, "password")}
                ></input>
                {display ? (
                  <i
                    className="fas fa-eye"
                    onClick={() => {
                      this.setState({
                        display: false,
                      });
                    }}
                  ></i>
                ) : (
                  <i
                    className="fas fa-eye-slash"
                    onClick={() => {
                      this.setState({
                        display: true,
                      });
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div className="col-12 form-group register-input">
              <div>First Name:</div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your username"
                value={firstName}
                onChange={(event) => handleOnChangeInput(event, "firstName")}
              ></input>
            </div>
            <div className="col-12 form-group register-input">
              <div>Last Name:</div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your username"
                value={lastName}
                onChange={(event) => handleOnChangeInput(event, "lastName")}
              ></input>
            </div>
            <div className="col-12 form-group register-input">
              <div>Address:</div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your username"
                value={address}
                onChange={(event) => handleOnChangeInput(event, "address")}
              ></input>
            </div>
            <div className="col-12 form-group register-input">
              <div>Phone number:</div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(event) => handleOnChangeInput(event, "phoneNumber")}
              ></input>
            </div>
            <div className="col-12 form-group register-input">
              <div>Gender:</div>
              <div className="form-check form-check-inline male">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="M"
                  onChange={(event) => handleOnChangeInput(event, "gender")}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="F"
                  onChange={(event) => handleOnChangeInput(event, "gender")}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Female
                </label>
              </div>
            </div>
            <div className="col-12 form-group register-input">
              <div className="form-group col-md-12 inline">
                <div class="col-md-4">
                  <label htmlFor="inputState">Role</label>
                  <select
                    id="inputState"
                    className="form-control"
                    placeholder="Vui lòng chọn"
                    onChange={(event) => handleOnChangeInput(event, "roleId")}
                  >
                    <option value="R2">Doctor</option>
                    <option value="R3">Patient</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState">Position</label>
                  <select
                    id="inputState"
                    className="form-control"
                    placeholder="Vui lòng chọn"
                    value={positionId}
                    onChange={(event) =>
                      handleOnChangeInput(event, "positionId")
                    }
                  >
                    <option value="P0">None</option>
                    <option value="P1">Master</option>
                    <option value="P2">Doctor</option>
                    <option value="P3">Associate Professor</option>
                    <option value="P4">Professor</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {errMessage}
            </div>
            <div className="col-12">
              <button className="btn-register" onClick={handleOnClickregister}>
                Next
              </button>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-register">Or register with:</span>
            </div>
            <div className="col-12 social-register text-center">
              <i className="fab fa-google-plus google"></i>
              <i className="fab fa-facebook facebook"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (laguage) => dispatch(actions.setLanguage(laguage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
