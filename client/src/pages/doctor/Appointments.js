import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";

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
          <h3 style={{ textAlign: "left", marginTop: "10px" }}>
            Pending appointments:
          </h3>
          <div className="row p-2">
            {appointments.map(
              (app, key) =>
                app.status === "Pending" && (
                  <AppointmentCard
                    appointment={app}
                    onDelete={handleDelete}
                    onShow={handleShow}
                  />
                )
            )}
          </div>
          <h3 style={{ textAlign: "left", marginTop: "10px" }}>
            Upcoming appointments:
          </h3>
          <div className="row p-2">
            {appointments.map(
              (app, key) =>
                app.status === "Approved" && (
                  <AppointmentCard
                    appointment={app}
                    onDelete={handleDelete}
                    onShow={handleShow}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
