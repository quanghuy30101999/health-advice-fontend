import React, { Component } from "react";
import { connect } from "react-redux";
import "./Schedule.scss";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      rangeTime: [],
    };
  }

  async componentDidMount() {
    let options = [];
    for (let index = 0; index <= 2; index++) {
      let option = {};
      if (index === 0) {
        option.lable = `Hôm nay - ${moment(moment().add(index, "days")).format(
          "DD/MM"
        )}`;
      } else {
        option.lable = moment(moment().add(index, "days")).format(
          "dddd - DD/MM"
        );
      }
      option.value = moment(moment().add(index, "days")).format("DD/MM/YYYY");
      options.push(option);
    }
    this.setState({ options: options });
    if (this.props.doctorId) {
      let response = await getScheduleDoctorByDate(
        this.props.doctorId,
        options[0].value
      );
      if (response && response.status === 200) {
        this.setState({
          rangeTime: response.data ? response.data : [],
        });
      }
    }
  }

  handleSelectDaySchedule = async (e) => {
    try {
      if (this.props.doctorId) {
        let response = await getScheduleDoctorByDate(
          this.props.doctorId,
          e.target.value
        );
        if (response && response.status === 200) {
          this.setState({
            rangeTime: response.data ? response.data : [],
          });
        }
      }
    } catch (error) {}
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    let { options, rangeTime } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleSelectDaySchedule(e)}>
              {options &&
                options.length > 0 &&
                options.map((value, index) => {
                  return (
                    <option key={index} value={value.value}>
                      {this.capitalizeFirstLetter(value.lable)}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch khám</span>
              </i>
            </div>
            <div className="time-content">
              <div className="time-content-button">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((value, index) => {
                    return <button key={index}>{value.time.value_vi}</button>;
                  })}
              </div>
              <div className="book-free">
                <span>
                  Chọn <i className="far fa-hand-point-up"></i> và đặt lịch miễn
                  phí
                </span>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
