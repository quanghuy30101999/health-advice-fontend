import React, { Component } from "react";
import { connect } from "react-redux";
import "./Schedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions/";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { createSchedule, getAllcode } from "../../../services/userService";
import { toast } from "react-toastify";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      currentDate: new Date(),
      rangeTime: [],
    };
  }

  async componentDidMount() {
    this.props.loadTopDoctors();
    let response = await getAllcode("TIME");
    if (response && response.data && response.status === 200) {
      let data = response.data.map((item) => ({ ...item, isSelected: false }));
      this.setState({ rangeTime: data });
    }
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
  };

  buildOptions = (doctors) => {
    let result = [];
    if (doctors && doctors.length > 0) {
      doctors.map((value, index) => {
        let obj = {};
        obj.value = value.id;
        obj.label = `${value.first_name} ${value.last_name}`;
        result.push(obj);
      });
    }
    return result;
  };

  hanleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date });
  };

  handleSelectTime = (time) => {
    let rangeTime = this.state.rangeTime;
    let index = rangeTime.findIndex((value) => value.id === time.id);
    if (index >= 0) {
      rangeTime[index].isSelected = !rangeTime[index].isSelected;
    }
    this.setState({
      rangeTime: rangeTime,
    });
  };

  handleSaveSchedule = async () => {
    let { selectedOption, currentDate, rangeTime } = this.state;
    let rangeTimeSelected = rangeTime.filter(
      (item) => item.isSelected === true
    );
    if (!currentDate) {
      toast.error("Invalid date");
    } else if (!selectedOption) {
      toast.error("Please choose a doctor");
    } else if (rangeTimeSelected.length === 0) {
      toast.error("Please choose time");
    } else {
      let date = moment(currentDate).format("DD/MM/YYYY");
      let array = rangeTimeSelected.map((item) => ({
        doctor_id: selectedOption.value,
        time_type: item.key,
        date: date,
      }));
      try {
        let response = await createSchedule(array);
        if (response && response.status === 200) {
          toast.success("Create schedule success");
          let data = rangeTime.map((item) => ({ ...item, isSelected: false }));
          this.setState({
            selectedOption: null,
            currentDate: new Date(),
            rangeTime: data,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  render() {
    let { selectedOption, rangeTime } = this.state;
    const { topDoctors } = this.props;
    const options = this.buildOptions(topDoctors);
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">Manage doctoc's examination plan</div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>Select doctoc</label>
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="col-6 form-group">
              <label>Select date</label>
              <DatePicker
                onChange={this.hanleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((value, index) => {
                  {
                    return (
                      <button
                        key={index}
                        style={{
                          backgroundColor: `${
                            value.isSelected ? "orange" : "#ddd"
                          }`,
                        }}
                        className="btn btn-schedule"
                        onClick={() => this.handleSelectTime(value)}
                      >
                        {value.value_vi}
                      </button>
                    );
                  }
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={this.handleSaveSchedule}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
