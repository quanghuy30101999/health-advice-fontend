import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";

class HomeHeader extends Component {
  selectLanguage = (language) => {
    this.props.setLanguage(language);
  };
  render() {
    let { lang } = this.props;
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
                    <FormattedMessage id="homeHeader.healthFacilities" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.chooseHospitalClinic" />
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
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.examinationPackage" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.generalHealthCheck" />
                </div>
              </div>
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
                className={`language-en ${lang === "en" ? "ac tive" : ""}`}
                onClick={() => this.selectLanguage("en")}
              >
                EN
              </div>
            </div>
          </div>
        </div>
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
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.specialistExamination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.remoteExamination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.generalExamination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.medicalTest" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.mentalHealth" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.dentalExamination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.surgeryPackage" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeHeader.medicalProducts" />
                </div>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (laguage) => dispatch(actions.setLanguage(laguage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
