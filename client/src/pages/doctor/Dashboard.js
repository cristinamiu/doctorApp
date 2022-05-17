import React, { useContext } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import Jumbotron from "./Jumbotron";
function Dashboard() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <DoctorSidebar />

        <div class="col">
          <div>
            <Jumbotron title="Dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
