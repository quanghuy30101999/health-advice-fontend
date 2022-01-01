import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import coXuongKhopImg from "../../../assets/specialty/120331-co-xuong-khop.jpg";

class OutstandingDoctor extends Component {
  render() {
    return (
      <>
        <div className="section-share section-outstanding-doctor gray">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Bác sĩ nổi bật tuần qua</span>
              <button className="btn-section">Tìm kiếm</button>
            </div>
            <div className="specialty-body"></div>
            <Slider {...this.props.settings}>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div className="position">
                  <div>Giáo sư, Tiến sĩ 12345678cddddddddddddddd</div>
                  <div>Khoa Tiêu hóa</div>
                </div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Giáo sư, Tiến sĩ</div>
                <div>Khoa Tiêu hóa</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Giáo sư, Tiến sĩ</div>
                <div>Khoa Tiêu hóa</div>
              </div>
              <div className="image-customize">
                <img src={coXuongKhopImg} />
                <div>Giáo sư, Tiến sĩ</div>
                <div>Khoa Tiêu hóa</div>
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
