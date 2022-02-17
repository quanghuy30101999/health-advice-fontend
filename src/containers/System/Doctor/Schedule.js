import React, { Component } from "react";
import { connect } from "react-redux";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log("ok");
    return (
      <>
        <h1>Manage schedule</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
