import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./AddDoctorInformation.scss";
import * as actions from "../../../store/actions/";
import Select from "react-select";
import { getDetailUser, updateMarkdown } from "../../../services/userService";

const mdParser = MarkdownIt();

class AddDoctorInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      data: false,
    };
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let response = await getDetailUser(selectedOption.value);
    if (response && response.status === 200) {
      if (response.data && response.data.markdown) {
        let { description, contentHTML } = response.data.markdown;
        this.setState({
          description: description,
          contentMarkdown: response.data.markdown.content_markdown,
          contentHTML: contentHTML,
          data: true,
        });
      } else {
        this.setState({
          description: "",
          contentMarkdown: "",
          contentHTML: "",
          data: false,
        });
      }
    }
  };

  handleChangeDes = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSaveContentMarkdown = async () => {
    const { selectedOption, contentMarkdown, contentHTML, description, data } =
      this.state;
    data
      ? this.props.updateMarkdown(
          selectedOption.value,
          contentMarkdown,
          contentHTML,
          description
        )
      : this.props.createMarkdown(
          selectedOption.value,
          contentMarkdown,
          contentHTML,
          description
        );
    this.setState({
      selectedOption: null,
      contentMarkdown: "",
      contentHTML: "",
      description: "",
    });
  };

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(preProps, preState, snap) {}

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

  render() {
    const { selectedOption, contentMarkdown, description } = this.state;
    const { topDoctors } = this.props;
    const options = this.buildOptions(topDoctors);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> Add doctor information</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Select doctor</label>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
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
        <div className="manage-doctor-editor">
          <MdEditor
            value={contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={(event) => this.handleSaveContentMarkdown()}
        >
          {this.state.data ? "Update information" : "Create information"}
        </button>
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
    createMarkdown: (id, contentMarkdown, contentHTML, description) => {
      dispatch(
        actions.createMarkdownStart(
          id,
          contentMarkdown,
          contentHTML,
          description
        )
      );
    },
    updateMarkdown: (id, contentMarkdown, contentHTML, description) => {
      dispatch(
        actions.updateMarkdownStart(
          id,
          contentMarkdown,
          contentHTML,
          description
        )
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDoctorInformation);
