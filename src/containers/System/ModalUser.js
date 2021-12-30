import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createUser } from "../../services/userService";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleUserModal();
  };

  onHandleChange = (event, key) => {
    let copyState = { ...this.state };
    copyState[key] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };

  save = async () => {
    let { email, password, firstName, lastName, address } = this.state;
    try {
      await createUser(email, password, firstName, lastName, address).then(
        (res) => {
          if (res.status === 200) {
            if (res.data.status === 400) {
              toast(res.data.message);
            } else {
              this.props.createNewUser(res.data);
            }
          }
        },
        (error) => {}
      );
    } catch (error) {}
  };

  render() {
    return (
      <Modal
        toggle={this.toggle}
        isOpen={this.props.isOpen}
        size="lg"
        centered
        scrollable
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.onHandleChange(event, "email")}
              ></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => this.onHandleChange(event, "password")}
              ></input>
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) => this.onHandleChange(event, "firstName")}
              ></input>
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) => this.onHandleChange(event, "lastName")}
              ></input>
            </div>
            <div className="input-container max-w-input">
              <label>Adress</label>
              <input
                type="text"
                onChange={(event) => this.onHandleChange(event, "address")}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="px-3" onClick={this.save}>
            Save
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Button onClick={this.toggle} className="px-3">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
