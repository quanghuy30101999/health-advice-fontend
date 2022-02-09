import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllcode } from "../../../services/userService";
class UserManageRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await getAllcode("ROLE");
      if (response && response.status === 200) {
        this.setState({ genderArr: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { genderArr } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Manage doctors</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <button className="btn btn-primary">Add new user</button>
              </div>
              <div className="col-3">
                <label>Email</label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-3">
                <label>Password</label>
                <input className="form-control" type="password" />
              </div>
              <div className="col-3">
                <label>First name</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>Last name</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>Phone number</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-9">
                <label>Address</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>Gender</label>
                <select className="form-control">
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((value, index) => {
                      return <option selected>{value.value_en}</option>;
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Role</label>
                <select className="form-control">
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-3">
                <label>Position</label>
                <select className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-3">
                <label>Image</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-12">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
