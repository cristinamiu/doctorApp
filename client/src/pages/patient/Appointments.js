import React, { useState, useContext, useEffect } from "react";
import PatientSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "../doctor/GeneralAppInfo";
import Jumbotron from "../doctor/Jumbotron";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const patientId = authState.secondId;

  const handleShow = (app) => {
    console.log(app);
    navigate(`/patients/my-appointments/appointment/${app.id}`, {
      state: { appointment: app },
    });
  };

  const handleDelete = (appId) => {
    console.log(appId);
    axios
      .delete(
        `http://localhost:5000/patients/${patientId}/${appId}/delete-appointment`
      )
      .then((response) => {
        console.log(response);
      });
    const appointmentsToReturn = appointments.filter(
      (appointment) => appointment.id !== appId
    );
    setAppointments(appointmentsToReturn);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/patients/${patientId}/my-appointments`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      });
  }, [patientId]);

  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <PatientSidebar />
        <div class="col">
          <div>
            <Jumbotron title="My Appointments" />
            <div class="row">
              <GeneralInfo
                style="linear-gradient(45deg, #ffb64d, #ffcb80)"
                status="Pending"
                path="/patients/my-appointments/pending"
              />
              <GeneralInfo
                style="linear-gradient(45deg, #2ed8b6, #59e0c5)"
                status="Upcoming"
                path="/patients/my-appointments/approved"
              />
              <GeneralInfo
                style="linear-gradient(45deg, #4099ff, #73b4ff)"
                status="Past"
                path="/patients/my-appointments/complete"
              />
            </div>

            <a href="/patients/new-appointment" class="btn btn-success">
              {" "}
              New Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
