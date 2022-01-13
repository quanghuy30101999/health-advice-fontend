import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import coXuongKhopImg from "../../../assets/specialty/120331-co-xuong-khop.jpg";
import * as actions from "../../../store/actions/";
import { FormattedMessage } from "react-intl";

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
  render() {
    let { doctors } = this.state;
    let { lang } = this.props;
    doctors = doctors.concat(doctors);

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
                  let nameEn = `${value.positionData.valueEn}, ${value.firstName} ${value.lastName}`;
                  let nameVi = `${value.positionData.valueVi} ${value.firstName} ${value.lastName}`;
                  return (
                    <div className="image-customize" key={index}>
                      <img src={coXuongKhopImg} />
                      <div className="position">
                        <div>{lang === "vi" ? nameVi : nameEn}</div>
                        <div>Khoa Tiêu hóa</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
