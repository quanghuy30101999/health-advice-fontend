import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = MarkdownIt();

function handleEditorChange({ html, text }) {
  console.log(html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(preProps, preState, snap) {}

  handleDeleteUser = (id) => {
    this.props.handleDeleteUser(id);
  };

  handleUpdateUser = (value) => {
    this.props.handleUpdateUser(value);
  };

  render() {
    let { users } = this.props;
    return (
      <>
        <table id="customers">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="common.email" />
              </th>
              <th>
                <FormattedMessage id="common.firstName" />
              </th>
              <th>
                <FormattedMessage id="common.lastName" />
              </th>
              <th>
                <FormattedMessage id="common.address" />
              </th>
              <th>
                <FormattedMessage id="common.action" />
              </th>
            </tr>
          </thead>
          {users &&
            users
              .filter((item) => item.role.key === "R2")
              .map((value, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{value.email}</td>
                      <td>{value.first_name}</td>
                      <td>{value.last_name}</td>
                      <td>{value.address}</td>
                      <td>
                        <button
                          className=" btn-edit"
                          onClick={() => {
                            this.handleUpdateUser(value);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(value.id);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
