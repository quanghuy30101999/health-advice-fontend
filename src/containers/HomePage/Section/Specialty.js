import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import coXuongKhopImg from "../../../assets/specialty/120331-co-xuong-khop.jpg";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialties: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await getAllSpecialty();
      if (response && response.status === 200) {
        this.setState({ specialties: response.data });
      }
    } catch (error) {}
  }
  render() {
    let { specialties } = this.state;
    return (
      <>
        <div className="section-share section-specialty gray">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="common.popularSpecialties" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="common.seeMore" />
              </button>
            </div>
            <div className="specialty-body"></div>
            <Slider {...this.props.settings}>
              {specialties &&
                specialties.length > 0 &&
                specialties.map((item, index) => {
                  return (
                    <div
                      className="image-customize"
                      key={index}
                      onClick={() => {
                        this.props.history.push(`/specialty/${item.id}`);
                      }}
                    >
                      <img
                        style={{
                          width: "300px",
                          height: "200px",
                        }}
                        src={
                          !!item.image
                            ? process.env.REACT_APP_BACKEND_URL + item.image
                            : coXuongKhopImg
                        }
                      />
                      <div>{item.name}</div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
