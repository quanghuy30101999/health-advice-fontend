import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
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
    let { doctor } = this.props;
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
              {doctor && doctor.markdown && doctor.markdown.description && (
                <p>{doctor.markdown.description}</p>
              )}
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
