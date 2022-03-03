import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import "./UserManageRedux.scss";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  createSpecialty,
  getAllSpecialty,
} from "../../../services/userService";

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: "",
      name: "",
      description: "",
      image: "",
      selectedOption: null,
      description: "",
      doctors: [],
      specialties: [],
    };
  }

  async componentDidMount() {
    this.props.loadTopDoctors();
    try {
      let response = await getAllSpecialty();
      if (response && response.status === 200) {
        this.setState({
          specialties: response.data,
        });
      }
    } catch (error) {}
  }

  componentDidUpdate(preProps, preState, snap) {}

  onChangeInput = () => {};

  buildOptions = (doctors) => {
    let result = [];
    if (doctors && doctors.length > 0) {
      doctors
        .filter((item) => item.specialty === null)
        .map((value, index) => {
          let obj = {};
          obj.value = value.id;
          obj.label = `${value.first_name} ${value.last_name}`;
          result.push(obj);
        });
    }
    return result;
  };

  handleOnChangeImage = (even) => {
    let files = even.target.files;
    let file = files[0];
    if (file) {
      let obj = URL.createObjectURL(file);
      this.setState({
        previewImgURL: obj,
        avatar: file,
      });
    }
  };

  handleChangeDes = (event) => {
    this.setState({ description: event.target.value });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  onChangeInput = (e, input) => {
    let copyState = { ...this.state };
    copyState[input] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeImage = (even) => {
    let files = even.target.files;
    let file = files[0];
    if (file) {
      let obj = URL.createObjectURL(file);
      this.setState({
        previewImgURL: obj,
        image: file,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({ isOpen: true });
  };

  saveUser = async () => {
    let { name, description, selectedOption, image, specialties } = this.state;
    try {
      let response;
      if (!!selectedOption) {
        response = await createSpecialty(
          name,
          description,
          selectedOption.value,
          image
        );
      } else {
        response = await createSpecialty(name, description, null, image);
      }

      if (response && response.status === 200) {
        toast.success("Create specialty success");
        this.setState({
          previewImgURL: "",
          isOpen: "",
          name: "",
          description: "",
          image: "",
          selectedOption: null,
          description: "",
          specialties: [...this.state.specialties, response.data],
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  render() {
    const { selectedOption, description, specialties } = this.state;
    let { topDoctors } = this.props;
    const options = this.buildOptions(topDoctors);
    return (
      <div className="user-redux-container">
        <div className="title">Manage specialties</div>
        <div className="user-redux-body">
          {this.state.isOpen && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
          <div className="container">
            <div className="row">
              <div className="col-12" style={{ padding: "5px" }}>
                Add new specialty
              </div>
              <div className="col-3">
                <label>Name</label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                />
              </div>

              <div className="content-left form-group col-3">
                <label>Select doctor</label>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
              </div>
              <div className="more-infor col-3">
                <div className="content-right form-group">
                  <label>Introductory information</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={description}
                    onChange={(event) => this.handleChangeDes(event)}
                  ></textarea>
                </div>
              </div>
              <div className="col-3">
                <label>Image</label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="lable-upload">
                    Upload image <i className="fas fa-upload"></i>
                  </label>
                  <div
                    onClick={() => this.openPreviewImage()}
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  onClick={() => this.saveUser()}
                >
                  Save
                </button>
              </div>
              <>
                <table id="customers" style={{ marginTop: "10px" }}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th className="col-3">Name</th>
                      <th>Description</th>
                      <th>
                        <FormattedMessage id="common.action" />
                      </th>
                    </tr>
                  </thead>
                  {specialties &&
                    specialties.map((value, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>{index}</td>
                            <td>{value.name}</td>
                            <td>{value.description}</td>
                            <td>
                              <button className=" btn-edit">
                                <i className="fas fa-pencil-alt"></i>
                              </button>
                              <button className="btn-delete">
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
              </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
