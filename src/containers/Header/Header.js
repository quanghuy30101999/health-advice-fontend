import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { FormattedMessage } from "react-intl";
import "./Header.scss";

class Header extends Component {
  chageLanguage = (language) => {
    this.props.setLanguage(language);
  };
  render() {
    const { processLogout } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="languages">
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

        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    setLanguage: (laguage) => dispatch(actions.setLanguage(laguage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
