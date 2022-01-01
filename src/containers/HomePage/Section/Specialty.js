import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import coXuongKhopImg from "../../../assets/specialty/120331-co-xuong-khop.jpg";
class Specialty extends Component {
  render() {
    return (
      <>
        <div className="section-share section-specialty gray">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="specialty-body"></div>
            <Slider {...this.props.settings}>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
