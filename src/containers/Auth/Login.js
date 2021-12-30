import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/authService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      display: false,
      errMessage: "",
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleOnClickLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let { username, password } = this.state;
      await handleLogin(username, password).then(
        (response) => {
          if (response.status === 200) {
            if (response.data.status === 400) {
              this.setState({
                errMessage: response.data.message,
              });
            } else {
              this.props.userLoginSuccess(response.data);
            }
          } else {
          }
        },
        (error) => {
          this.setState({
            errMessage: error.message,
          });
        }
      );
    } catch (error) {}
  };

  handleShowHidePassword = () => {
    this.setState({
      display: !this.state.display,
    });
  };
  render() {
    let { username, password, display, errMessage } = this.state;
    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-center headerTitle">Login</div>
              <div className="col-12 form-group login-input">
                <div>Username:</div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  name="username"
                  onChange={(event) => this.handleOnChangeUserName(event)}
                ></input>
              </div>
              <div className="col-12 form-group login-input">
                <div>Password:</div>
                <div className="custom-input-password">
                  <input
                    className="form-control"
                    type={display ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    name="password"
                    onChange={(event) => this.handleOnChangePassword(event)}
                  ></input>
                  {display ? (
                    <i
                      className="fas fa-eye"
                      onClick={this.handleShowHidePassword}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-eye-slash"
                      onClick={this.handleShowHidePassword}
                    ></i>
                  )}
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {errMessage}
              </div>
              <div className="col-12">
                <button className="btn-login" onClick={this.handleOnClickLogin}>
                  Login
                </button>
              </div>
              <div className="col-12">
                <span className="forgot-password">Forgot password?</span>
              </div>
              <div className="col-12 text-center">
                <span className="text-other-login">Or Login with:</span>
              </div>
              <div className="col-12 social-login text-center">
                <i className="fab fa-google-plus google"></i>
                <i className="fab fa-facebook facebook"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail),
    userLoginSuccess: (user) => dispatch(actions.userLoginSuccess(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
