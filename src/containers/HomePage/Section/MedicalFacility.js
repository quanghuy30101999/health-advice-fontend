import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import coXuongKhopImg from "../../../assets/specialty/120331-co-xuong-khop.jpg";

class MedicalFacility extends Component {
  render() {
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">Tìm kiếm</button>
            </div>
            <div className="specialty-body"></div>
            <Slider {...this.props.settings}>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Bệnh viện Hữu Nghị</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Cơ xương khớp</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Cơ xương khớp</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Cơ xương khớp</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Cơ xương khớp</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Cơ xương khớp</div>
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
