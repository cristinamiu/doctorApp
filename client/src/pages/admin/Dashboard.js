import React, { useEffect, useState } from "react";
import AdminSidebar from "./Sidebar";
import axios from "axios";
import Jumbotron from "../doctor/Jumbotron";
import DashboardInfo from "../doctor/DashboardInfo";
function Dashboard() {
  const [doctors, setDoctors] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/users`).then((response) => {
      setDoctors(response.data.length);
    });
  }, []);
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <AdminSidebar />

        <div class="col">
          <div>
            <Jumbotron title="Dashboard" />
          </div>

          <div class="row">
            <DashboardInfo
              style="linear-gradient(45deg, #ffb64d, #ffcb80)"
              status="Doctors"
              path="/admin/doctors"
              number={doctors}
              buttonText="Go to doctors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
