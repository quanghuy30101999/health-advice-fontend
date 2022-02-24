import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageHistory.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllHistory, confirmBooking } from "../../../services/userService";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

class ManageHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [],
      currentDate: new Date(),
      isLoading: false,
    };
  }

  async componentDidMount() {
    let { currentDate } = this.state;
    try {
      let response;
      let { user } = this.props;
      if (user && user.role && user.role.key === "R2") {
        response = await getAllHistory(
          moment(currentDate).format("DD/MM/YYYY"),
          this.props.user.id,
          null
        );
      } else if (user && user.role && user.role.key === "R3") {
        response = await getAllHistory(
          moment(currentDate).format("DD/MM/YYYY"),
          null,
          this.props.user.id
        );
      } else {
        response = await getAllHistory(
          moment(currentDate).format("DD/MM/YYYY"),
          null,
          null
        );
      }

      if (response && response.status === 200) {
        this.setState({
          histories: response.data,
        });
      }
    } catch (error) {}
  }

  hanleOnChangeDatePicker = async (date) => {
    this.setState({ currentDate: date[0] });
    let { currentDate } = this.state;
    try {
      this.setState({ isLoading: true });
      let response;
      let { user } = this.props;
      if (user && user.role && user.role.key === "R2") {
        response = await getAllHistory(
          moment(currentDate).format("DD/MM/YYYY"),
          this.props.user.id,
          null
        );
      } else if (user && user.role && user.role.key === "R3") {
        response = await getAllHistory(
          moment(currentDate).format("DD/MM/YYYY"),
          null,
          this.props.user.id
        );
      } else {
        response = await getAllHistory(
          moment(currentDate).format("DD/MM/YYYY"),
          null,
          null
        );
      }
      if (response && response.status === 200) {
        this.setState({
          histories: response.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  handleConfirm = async (id, status_id) => {
    this.setState({ isLoading: true });
    try {
      let response = await confirmBooking(id, status_id);
      if (response && response.status === 200) {
        let histories = this.state.histories;
        let index = histories.findIndex((item) => item.id === id);
        histories[index] = response.data;
        this.setState({
          ...this.state,
          isLoading: false,
          histories: [...histories],
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  handleCancel = async (id, status_id) => {
    this.setState({ isLoading: true });
    try {
      let response = await confirmBooking(id, status_id);
      if (response && response.status === 200) {
        let histories = this.state.histories;
        let index = histories.findIndex((item) => item.id === id);
        histories[index] = response.data;
        this.setState({
          ...this.state,
          isLoading: false,
          histories: [...histories],
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    let { histories, isLoading } = this.state;
    return (
      <>
        <LoadingOverlay active={isLoading} spinner text="Loading ...">
          <div className="manage-patient-container">
            <div className="m-p-title">Medical Manage</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Select date</label>
                <DatePicker
                  onChange={this.hanleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12">
                <table id="customers">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Time</th>
                      <th>Name patient</th>
                      <th>Address</th>
                      <th>Gender</th>
                      <th>Name doctor</th>
                    </tr>
                  </thead>
                  {histories
                    .filter((item) => item.status !== "Done")
                    .map((value, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{value.time}</td>
                            <td>{value.patient.first_name}</td>
                            <td>{value.patient.address}</td>
                            <td>
                              {value.patient.gender === "M" ? "Male" : "Female"}
                            </td>
                            <td>{value.doctor.first_name}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory);
