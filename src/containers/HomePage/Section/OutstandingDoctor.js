import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import coXuongKhopImg from "../../../assets/specialty/120331-co-xuong-khop.jpg";
import * as actions from "../../../store/actions/";
import { FormattedMessage } from "react-intl";
import "./OutstandingDoctor.scss";
import { withRouter } from "react-router";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        doctors: this.props.topDoctors,
      });
    }
  }
  async componentDidMount() {
    await this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/user/${doctor.id}`);
  };
  render() {
    let { doctors } = this.state;
    let { lang } = this.props;

    return (
      <>
        <div className="section-share section-outstanding-doctor gray">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="common.outstandingDoctorOfTheWeek" />
              </span>
              <button className="btn-section">Tìm kiếm</button>
            </div>
            <div className="specialty-body"></div>
            <Slider {...this.props.settings}>
              {doctors &&
                doctors.length > 0 &&
                doctors.map((value, index) => {
                  let nameEn = `${value.position.value_en}, ${value.first_name} ${value.last_name}`;
                  let nameVi = `${value.position.value_vi} ${value.first_name} ${value.last_name}`;
                  return (
                    <div
                      className="image-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(value)}
                    >
                      <img
                        style={{
                          borderRadius: "50%",
                          width: "200px",
                          height: "200px",
                        }}
                        src={
                          value.avatar !== null
                            ? process.env.REACT_APP_BACKEND_URL + value.avatar
                            : coXuongKhopImg
                        }
                      />
                      <div
                        className="position"
                        style={{ marginLeft: "15%", paddingTop: "10px" }}
                      >
                        <div>{lang === "vi" ? nameVi : nameEn}</div>
                        <div>{value.specialty && value.specialty.name}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    topDoctors: state.user.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => {
      dispatch(actions.fetchTopDoctor());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
