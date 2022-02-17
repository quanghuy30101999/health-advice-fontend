import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import { FormattedMessage } from "react-intl";
import "./Header.scss";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  chageLanguage = (language) => {
    this.props.setLanguage(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo) {
      if (userInfo.role && userInfo.role.key === "R1") {
        menu = adminMenu;
      }
      if (userInfo.role && userInfo.role.key === "R2") {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, userInfo } = this.props;

    console.log(this.state.menuApp);

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="languages">
          <div className="welcome">
            <FormattedMessage id="homeHeader.welcome" />,{" "}
            {userInfo && userInfo.lastName ? userInfo.lastName : ""}!
          </div>
          <span
            className="language-vi"
            onClick={() => this.chageLanguage("vi")}
          >
            VN
          </span>
          <span
            className="language-en"
            onClick={() => this.chageLanguage("en")}
          >
            EN
          </span>

          <FormattedMessage id="common.logout">
            {(text) => (
              <div
                className="btn btn-logout"
                onClick={processLogout}
                title={text}
              >
                <i className="fas fa-sign-out-alt"></i>
              </div>
            )}
          </FormattedMessage>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    setLanguage: (laguage) => dispatch(actions.setLanguage(laguage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
