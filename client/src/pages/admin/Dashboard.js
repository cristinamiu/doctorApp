import React from "react";
import AdminSidebar from "./Sidebar";

function Dashboard() {
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <AdminSidebar />
          <div class="col-sm p-3 vh-100">Row 2</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
