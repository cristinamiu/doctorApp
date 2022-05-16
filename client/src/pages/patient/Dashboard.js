import React, { useContext } from "react";
import PatientSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="container-fluid ">
      <div class="row vh-100">
        <PatientSidebar />
        <div class="col-sm p-0">{authState.secondId}</div>
      </div>
    </div>
  );
}

export default Dashboard;