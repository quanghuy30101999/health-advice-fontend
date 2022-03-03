import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailSpecialty } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: {},
      doctors: [],
    };
  }
  async componentDidMount() {
    try {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
        let response = await getDetailSpecialty(this.props.match.params.id);
        if (response && response.status === 200) {
          this.setState({ doctors: response.data.users });
          this.setState({ specialty: response.data });
        }
      }
    } catch (error) {}
  }

  render() {
    let { doctors, specialty } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            <h1>{specialty.name}</h1>
            <p>{specialty.description}</p>
          </div>

          {doctors &&
            doctors.length > 0 &&
            doctors.map((item, index) => {
              return (
                <div className="each-doctor">
                  <div className="content-left">
                    <ProfileDoctor doctor={item} />
                  </div>
                  <div className="content-right">
                    <DoctorSchedule key={index} doctorId={item.id} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
