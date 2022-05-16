import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";

function PendingAppointments(props) {
  // const status = props.status;
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
        `http://localhost:5000/doctors/${patientId}/${appId}/delete-appointment`
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
        <DoctorSidebar />
        <div class="col">
          <h3 style={{ textAlign: "left", marginTop: "10px" }}>
            {props.status} appointments:
          </h3>
          {!appointments.find((app) => app.status === props.status) ? (
            <p style={{ fontStyle: "italic", textAlign: "left" }}>
              No {props.status} appointments
            </p>
          ) : (
            <div className="row p-2">
              {appointments.map(
                (app, key) =>
                  app.status === props.status && (
                    <AppointmentCard
                      appointment={app}
                      onDelete={handleDelete}
                      onShow={handleShow}
                      status={props.status}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingAppointments;
