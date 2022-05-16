import React, { useContext } from "react";
import PatientSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Appointments() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="container-fluid ">
      <div class="row">
        <PatientSidebar />
        <div class="col-sm p-0">{authState.secondId}</div>
      </div>
    </div>
  );
}

export default Appointments;
