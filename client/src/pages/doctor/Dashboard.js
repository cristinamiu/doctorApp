import React from "react";
import DoctorSidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="container-fluid ">
      <div class="row vh-100">
        <DoctorSidebar />
        <div class="col-sm p-0">Row 2</div>
      </div>
    </div>
  );
}

export default Dashboard;
