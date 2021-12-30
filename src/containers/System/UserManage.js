import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import { toast, ToastContainer } from "react-toastify";
import * as actions from "../../store/actions";

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
      <div className="users-container">
        <ModalUser
          isOpen={isOpen}
          toggleUserModal={this.toggleUserModal}
          className="modal-body"
          createNewUser={this.createNewUser}
        />
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={this.handleClickAddUser}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            {users.map((value, index) => {
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
