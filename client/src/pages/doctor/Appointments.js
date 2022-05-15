import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { authState } = useContext(AuthContext);

  const doctorId = authState.secondId;

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
    <div className="container-fluid ">
      <div class="row vh-100">
        <DoctorSidebar />
        {/* <div class="col-sm p-0"> */}
        {appointments.map((app, key) => (
          <AppointmentCard appointment={app} onDelete={handleDelete} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Appointments;
