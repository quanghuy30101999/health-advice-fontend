import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserManageRedux from "../containers/System/Admin/UserManageRedux";
import Header from "../containers/Header/Header";
import AddDoctorInformation from "../containers/System/Admin/AddDoctorInformation";
import Schedule from "../containers/System/Doctor/Schedule";
import ManageHistory from "../containers/System/Patient/HistoryMedicalHistory";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ManageSpecialty from "../containers/System/Admin/ManageSpecialty";
class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <>
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/doctor-manage" component={UserManageRedux} />
              <Route
                path="/system/add-information"
                component={AddDoctorInformation}
              />
              <Route path="/system/manage-schedule" component={Schedule} />
              <Route path="/system/manage-patient" component={ManagePatient} />
              <Route
                path="/system/manage-medical-history"
                component={ManageHistory}
              />
              <Route
                path="/system/manage-specialties"
                component={ManageSpecialty}
              />
              <Route path="/system/manage-schedule" component={Schedule} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
