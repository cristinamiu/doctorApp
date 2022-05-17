import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./GeneralAppInfo";
import Jumbotron from "./Jumbotron";
import DashboardInfo from "./DashboardInfo";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const doctorId = authState.secondId;
  const [patients, setPatients] = useState("");

  const [pending, setPending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/doctors/${doctorId}/my-appointments`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
        const pendingApp = response.data.filter(
          (app) => app.status === "Pending"
        ).length;
        const upcomingApp = response.data.filter(
          (app) => app.status === "Approved"
        ).length;
        const pastApp = response.data.filter(
          (app) => app.status === "Complete"
        ).length;

        setPending(pendingApp);
        setUpcoming(upcomingApp);
        setPast(pastApp);
      })
      .then(() => {
        axios
          .get(`http://localhost:5000/doctors/${doctorId}/my-appointments`)
          .then((response) => {
            console.log(response.data);
            const array = response.data;
            const uniquePatients = [
              ...new Map(
                array.map((item) => [item["PatientId"], item])
              ).values(),
            ];
            setPatients(uniquePatients.length);
            console.log(uniquePatients.length);
          });
      });
  }, [doctorId]);
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <DoctorSidebar />

        <div class="col">
          <div>
            <Jumbotron title="Dashboard" />
          </div>

          <div class="row">
            <DashboardInfo
              style="linear-gradient(45deg, #ffb64d, #ffcb80)"
              status="Pending Appointments"
              path="/doctors/my-appointments/pending"
              number={pending}
              buttonText="Go to appointments"
            />
            <DashboardInfo
              style="linear-gradient(45deg, #2ed8b6, #59e0c5)"
              status="Upcoming Appointments"
              path="/doctors/my-appointments/approved"
              number={upcoming}
              buttonText="Go to appointments"
            />
            <DashboardInfo
              style="linear-gradient(45deg, #4099ff, #73b4ff)"
              status="Past Appointments"
              path="/doctors/my-appointments/complete"
              number={past}
              buttonText="Go to appointments"
            />

            <DashboardInfo
              style="linear-gradient(45deg, #ff5370, #ff869a)"
              status="My Patients"
              path="/doctors/my-patients"
              number={patients}
              buttonText="Go to patients"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
