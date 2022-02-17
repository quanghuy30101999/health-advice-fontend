import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import "./UserManageRedux.scss";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";

class UserManageRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      previewImgURL: "",
      isOpen: false,

      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "R2",
      positionId: "",
      avatar: "",
      errMessage: "",
      action: "create",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
    this.props.fetchAllUser();
  }

  componentDidUpdate(preProps, preState, snap) {
    if (preProps.genders !== this.props.genders) {
      this.setState({
        gender:
          this.props.genders && this.props.genders.length > 0
            ? this.props.genders[0].key
            : "",
      });
    }
    if (preProps.roles !== this.props.roles) {
      this.setState({
        roleId:
          this.props.roles && this.props.roles.length > 0
            ? this.props.roles[0].key
            : "",
      });
    }
    if (preProps.positions !== this.props.positions) {
      this.setState({
        positionId:
          this.props.positions && this.props.positions.length > 0
            ? this.props.positions[0].key
            : "",
      });
    }
    if (preProps.users !== this.props.users) {
      this.setState({
        users:
          this.props.users && this.props.users.length > 0
            ? this.props.users
            : [],
      });
    }
  }

  saveUser = () => {
    if (this.state.action === "create") {
      this.props.createNewUser(this.state);
    } else if (this.state.action === "edit") {
      this.props.updateUser(this.state);
    }
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: this.props.genders[0].key,
      roleId: this.props.roles[0].key,
      positionId: this.props.positions[0].key,
      avatar: "",
      action: "create",
      errMess: "",
      previewImgURL: "",
    });
  };

  handleDeleteUser = (id) => {
    this.props.deleteUser(id);
  };

  handleOnChangeImage = (even) => {
    let files = even.target.files;
    let file = files[0];
    if (file) {
      let obj = URL.createObjectURL(file);
      this.setState({
        previewImgURL: obj,
        avatar: file,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({ isOpen: true });
  };

  onChangeInput = (e, input) => {
    let copyState = { ...this.state };
    copyState[input] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleUpdateUser = (value) => {
    let {
      id,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      address,
      gender,
      role,
      position,
      avatar,
    } = value;
    this.setState({
      id,
      email,
      password,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      address,
      gender,
      roleId: role.key,
      positionId: position.key,
      avatar,
      previewImgURL: process.env.REACT_APP_BACKEND_URL + avatar,
      action: "edit",
      errMess: "",
    });
  };

  render() {
    let { genders, roles, positions, errMess } = this.props;
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
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Manage doctors</div>
        <div className="user-redux-body">
          {this.state.isOpen && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
          <div className="container">
            <div className="row">
              <div className="col-12" style={{ padding: "5px" }}>
                Add new user
              </div>
              <div className="col-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                />
              </div>
              <div className="col-3">
                <label>First name</label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Last name</label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Phone number</label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-9">
                <label>Address</label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Gender</label>
                <select
                  value={gender}
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((value, index) => {
                      return (
                        <option key={index} value={value.key}>
                          {value.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Role</label>
                <select
                  value={roleId}
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "roleId");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((value, index) => {
                      return (
                        <option key={index} value={value.key}>
                          {value.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Position</label>
                <select
                  value={positionId}
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "positionId");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((value, index) => {
                      return (
                        <option key={index} value={value.key}>
                          {value.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Image</label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="lable-upload">
                    Upload image <i className="fas fa-upload"></i>
                  </label>
                  <div
                    onClick={() => this.openPreviewImage()}
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                  ></div>
                </div>
                {/* <input className="form-control" type="text" /> */}
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  onClick={() => this.saveUser()}
                >
                  Save
                </button>
              </div>
              <div className="col-12 mt-3">
                <TableManageUser
                  users={this.state.users}
                  handleDeleteUser={this.handleDeleteUser}
                  handleUpdateUser={this.handleUpdateUser}
                />
              </div>
            </div>
          </div>
        </div>
        {this.props.errMess && toast.error(errMess)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    createNewUser: (state) => dispatch(actions.createNewUser(state)),
    fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
    updateUser: (user) => dispatch(actions.updateUserStart(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
