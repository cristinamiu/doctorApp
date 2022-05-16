import React from "react";
import DoctorSidebar from "./Sidebar";
import GeneralInfo from "./GeneralAppInfo";

function Patients() {
  return (
    <div className="container-fluid ">
      <div class="row vh-100">
        <DoctorSidebar />
        <div class="col-sm p-0">
          <div class="container">
            <div class="row">
              <GeneralInfo style="linear-gradient(45deg, #4099ff, #73b4ff)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
