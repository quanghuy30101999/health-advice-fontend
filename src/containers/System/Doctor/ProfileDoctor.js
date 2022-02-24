import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { ToastContainer } from "react-toastify";
import localization from "moment/locale/vi";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    let { doctor, time } = this.props;
    console.log(time);
    return (
      <>
        <div className="intro-doctor">
          <div className="content-left">
            <img src={process.env.REACT_APP_BACKEND_URL + doctor.avatar}></img>
          </div>
          <div className="content-right">
            <div className="up">
              {doctor && doctor.position && doctor.position.value_vi && (
                <span>{`${doctor.position.value_vi} ${doctor.first_name} ${doctor.last_name}`}</span>
              )}
            </div>
            <div className="down">
              {`${time.time.value_vi} - ${this.capitalizeFirstLetter(
                moment(time.date).format("dddd - DD/MM/YYYY")
              )}`}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
