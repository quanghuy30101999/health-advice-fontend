import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import "./DetailDoctor.scss";
import { getDetailUser } from "../../../services/userService";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let response = await getDetailUser(this.props.match.params.id);
      if (response && response.status === 200) {
        this.setState({
          doctor: response.data,
        });
      }
    }
  }

  render() {
    let { doctor } = this.state;
    console.log(doctor);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL + this.state.doctor.avatar
                }
              ></img>
            </div>
            <div className="content-right">
              <div className="up">
                {doctor && doctor.position && doctor.position.value_vi && (
                  <span>{`${doctor.position.value_vi} ${doctor.first_name} ${doctor.last_name}`}</span>
                )}
              </div>
              <div className="down">
                {doctor && doctor.markdown && doctor.markdown.description && (
                  <span>{doctor.markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-infor-doctor">
            {doctor && doctor.markdown && doctor.markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: doctor.markdown.contentHTML,
                }}
              ></div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
