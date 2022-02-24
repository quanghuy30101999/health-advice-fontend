import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import { createBookingFromPartent } from "../../../../services/userService";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      gender: "",
      address: "",
      phone_number: "",
      reason: "",
      isLoading: false,
    };
  }

  async componentDidMount() {}

  handleCloseModal = () => {
    this.props.handleCloseModal();
  };

  onChange = (event, name) => {
    let copyState = { ...this.state };
    copyState[name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleCreateBooking = async () => {
    try {
      this.setState({ isLoading: true });
      let response = await createBookingFromPartent(this.state, this.props);
      if (response && response.status === 200) {
        toast.success("Đặt lịch khám bệnh thành công, chờ bác sĩ xác nhận");
        this.setState({
          email: "",
          first_name: "",
          gender: "",
          address: "",
          phone_number: "",
          reason: "",
          isLoading: false,
        });
        this.props.handleCloseModal();
      }
    } catch (error) {
      this.setState({ isLoading: false });
      toast.error(error.response.data.message);
    }
  };

  render() {
    let { doctor } = this.props.time;
    let { email, first_name, address, phone_number, reason } = this.state;
    return (
      <>
        <Modal
          isOpen={this.props.isOpenModal}
          size="lg"
          centered
          scrollable
          className="booking-modal-container"
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right">
                <i className="fas fa-times" onClick={this.handleCloseModal}></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-infor">
                <ProfileDoctor doctor={doctor} time={this.props.time} />
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>Email *</label>
                  <input
                    className="form-control"
                    placeholder="Email (bắt buộc)"
                    value={email}
                    onChange={(e) => {
                      this.onChange(e, "email");
                    }}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Họ và tên *</label>
                  <input
                    className="form-control"
                    placeholder="Họ và tên (bắt buộc)"
                    value={first_name}
                    onChange={(e) => {
                      this.onChange(e, "first_name");
                    }}
                  />
                </div>
                <div
                  className="col-12 form-group"
                  onChange={(e) => {
                    this.onChange(e, "gender");
                  }}
                >
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="M"
                    />
                    <label class="form-check-label">Nam</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="F"
                    />
                    <label class="form-check-label">Nữ</label>
                  </div>
                </div>
                <div className="col-6 form-group">
                  <label>Số điện thoại *</label>
                  <input
                    className="form-control"
                    placeholder="Số điện thoại (bắt buộc)"
                    value={phone_number}
                    onChange={(e) => {
                      this.onChange(e, "phone_number");
                    }}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ liên hệ</label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      this.onChange(e, "address");
                    }}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={reason}
                    onChange={(e) => {
                      this.onChange(e, "reason");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-cancel"
                onClick={this.handleCloseModal}
              >
                Huỷ
              </button>
              <button
                className="btn-booking-confirm"
                onClick={this.handleCreateBooking}
              >
                <LoadingOverlay
                  active={this.state.isLoading}
                  spinner
                  text="Loading ..."
                ></LoadingOverlay>
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
