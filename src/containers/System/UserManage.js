import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import { ToastContainer } from "react-toastify";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpen: false,
    };
  }

  async componentDidMount() {
    try {
      await getAllUsers().then(
        (res) => {
          if (res.status === 200) {
            this.setState({
              users: res.data,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  handleClickAddUser = () => {
    this.setState({
      isOpen: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  createNewUser = (user) => {
    let arr = [...this.state.users];
    arr.push(user);
    this.setState({
      users: arr,
      isOpen: false,
    });
  };

  render() {
    let { users, isOpen } = this.state;
    return (
      <>
        <div className="users-container">
          <ModalUser
            isOpen={isOpen}
            toggleUserModal={this.toggleUserModal}
            className="modal-body"
            createNewUser={this.createNewUser}
          />
          <div className="title text-center">
            <FormattedMessage id="common.manageUsers" />
          </div>
          <div className="mx-1">
            <button
              className="btn btn-primary px-3"
              onClick={this.handleClickAddUser}
            >
              <i className="fas fa-plus"></i>{" "}
              <FormattedMessage id="common.addNewUser" />
            </button>
          </div>
          <div className="users-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="common.email" />
                  </th>
                  <th>
                    <FormattedMessage id="common.firstName" />
                  </th>
                  <th>
                    <FormattedMessage id="common.lastName" />
                  </th>
                  <th>
                    <FormattedMessage id="common.address" />
                  </th>
                  <th>
                    <FormattedMessage id="common.action" />
                  </th>
                </tr>
              </thead>
              {users
                .filter((item) => item.role.key === "R3")
                .map((value, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{value.email}</td>
                        <td>{value.firstName}</td>
                        <td>{value.lastName}</td>
                        <td>{value.address}</td>
                        <td>
                          <button className=" btn-edit">
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button className="btn-delete">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
          <ToastContainer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    userCreateSuccess: (user) => dispatch(actions.addUserSuccess(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
