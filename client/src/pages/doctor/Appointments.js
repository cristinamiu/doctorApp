import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./GeneralAppInfo";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const doctorId = authState.secondId;

  const handleShow = (app) => {
    console.log(app);
    navigate(`/doctors/my-appointments/appointment/${app.id}`, {
      state: { appointment: app },
    });
  };

  const handleDelete = (appId) => {
    console.log(appId);
    axios
      .delete(
        `http://localhost:5000/doctors/${doctorId}/${appId}/delete-appointment`
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
      .get(`http://localhost:5000/doctors/${doctorId}/my-appointments`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      });
  }, [doctorId]);

  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <DoctorSidebar />
        <div class="col">
          <div>
            <div class="row">
              <div class="jumbotron jumbotron-billboard">
                <div class="img"></div>
                <div class="container">
                  <div class="row m-4">
                    <div class="col-lg-12">
                      <h2>My Appointments</h2>
                    </div>
                  </div>
                </div>
              </div>
              <GeneralInfo
                style="linear-gradient(45deg, #ffb64d, #ffcb80)"
                status="Pending"
                path="/doctors/my-appointments/pending"
              />
              <GeneralInfo
                style="linear-gradient(45deg, #2ed8b6, #59e0c5)"
                status="Upcoming"
                path="/doctors/my-appointments/approved"
              />
              <GeneralInfo
                style="linear-gradient(45deg, #4099ff, #73b4ff)"
                status="Past"
                path="/doctors/my-appointments/complete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
