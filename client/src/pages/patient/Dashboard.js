import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../doctor/Jumbotron";
import DashboardInfo from "../doctor//DashboardInfo";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const { authState } = useContext(AuthContext);
  const [medicalRecords, setMedicalRecords] = useState([]);

  const navigate = useNavigate();
  const patientId = authState.secondId;
  const [patients, setPatients] = useState("");

  const [pending, setPending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/patients/${patientId}/my-appointments`)
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
          .get(
            `http://localhost:5000/doctors/get-diagnostics/by-patient/${patientId}`
          )
          .then((response) => {
            console.log(response.data);
            setMedicalRecords(response.data.length);
          });
      });
  }, [patientId]);
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
              path="/patients/my-appointments/pending"
              number={pending}
              buttonText="Go to appointments"
            />
            <DashboardInfo
              style="linear-gradient(45deg, #2ed8b6, #59e0c5)"
              status="Upcoming Appointments"
              path="/patients/my-appointments/approved"
              number={upcoming}
              buttonText="Go to appointments"
            />
            <DashboardInfo
              style="linear-gradient(45deg, #4099ff, #73b4ff)"
              status="Past Appointments"
              path="/patients/my-appointments/complete"
              number={past}
              buttonText="Go to appointments"
            />

            <DashboardInfo
              style="linear-gradient(45deg, #ff5370, #ff869a)"
              status="Medical Records"
              path={`/patients/medical-records-main/${patientId}`}
              number={medicalRecords}
              buttonText="Go to medical records"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
