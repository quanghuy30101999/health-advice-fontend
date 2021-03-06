import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import { withRouter } from "react-router-dom";

class HomeHeader extends Component {
  selectLanguage = (language) => {
    this.props.setLanguage(language);
  };
  redirectLogin = () => {
    this.props.history.push("/login");
  };
  render() {
    let { lang, isShowBanner } = this.props;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.specialty" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.searchDoctor" />
                </div>
              </div>

              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.chooseGoodDoctor" />
                </div>
              </div>
              <div className="child-content"></div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeHeader.doctor" />
              </div>
              <div
                className={`language-vn ${lang === "vi" ? "active" : ""}`}
                onClick={() => this.selectLanguage("vi")}
              >
                VN
              </div>
              <div
                className={`language-en ${lang === "en" ? "active" : ""}`}
                onClick={() => this.selectLanguage("en")}
              >
                EN
              </div>
              <div className={`language-en }`} onClick={this.redirectLogin}>
                Login
              </div>
            </div>
          </div>
        </div>
        {isShowBanner ? (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="homeHeader.medicalBackground" />
              </div>
              <div className="title2">
                <FormattedMessage id="homeHeader.comprehensiveHealthCare" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <FormattedMessage id="homeHeader.findMedicalSpecialist">
                  {(placeholder) => (
                    <input type="text" placeholder={placeholder} />
                  )}
                </FormattedMessage>
              </div>
            </div>
            <div className="content-down">
              <div className="options"></div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (laguage) => dispatch(actions.setLanguage(laguage)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
