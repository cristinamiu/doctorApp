import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./GeneralAppInfo";
import Jumbotron from "./Jumbotron";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const doctorId = authState.secondId;

  const [pending, setPending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

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
      });
  }, [doctorId]);

  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <DoctorSidebar />
        <div class="col">
          <div>
            <Jumbotron title="My Appointments" />
            <div class="row">
              <GeneralInfo
                style="linear-gradient(45deg, #ffb64d, #ffcb80)"
                status="Pending"
                path="/doctors/my-appointments/pending"
                number={pending}
              />
              <GeneralInfo
                style="linear-gradient(45deg, #2ed8b6, #59e0c5)"
                status="Upcoming"
                path="/doctors/my-appointments/approved"
                number={upcoming}
              />
              <GeneralInfo
                style="linear-gradient(45deg, #4099ff, #73b4ff)"
                status="Past"
                path="/doctors/my-appointments/complete"
                number={past}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
