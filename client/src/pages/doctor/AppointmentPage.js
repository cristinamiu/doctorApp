import React, { useState, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Status from "./Status";

function AppointmentPage() {
  const { state } = useLocation();
  const [appointment, setAppointment] = useState(state.appointment);
  console.log(state);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/doctors/my-appointments/appointment/${state.appointment.id}`
      )
      .then((response) => {
        console.log(response.data);
        setAppointment(response.data);
      });
  }, []);

  const handleApproval = (e) => {
    e.preventDefault();
    console.log("ok");
    axios
      .put(
        `http://localhost:5000/doctors/${appointment.DoctorId}/${appointment.id}/approve`
      )
      .then((response) => {
        setAppointment({ ...appointment, status: "Approved" });
      });
  };

  const handleComplete = (e) => {
    e.preventDefault();
    console.log("ok");
    axios
      .put(
        `http://localhost:5000/doctors/${appointment.DoctorId}/${appointment.id}/complete`
      )
      .then((response) => {
        setAppointment({ ...appointment, status: "Complete" });
      });
  };
  return (
    <div class="row">
      <DoctorSidebar />
      <div class="col-md-10">
        <>
          {/* VIEW FOR PACIENT AND DOCTOR */}
          <div className="info-appointment">
            <div className="card">
              <h5 className="card-header">{appointment.title}</h5>
              <div className="card-body">
                <p className="card-text">
                  <strong>Patient Name: </strong>
                  {appointment.Patient.name}
                </p>
                <p className="card-text">
                  <strong>Date: </strong>
                  {appointment.date}
                </p>
                <p className="card-text">
                  <strong>Status: </strong>
                  {/* <span class="badge rounded-pill bg-warning text-dark">
                    {appointment.status}
                  </span> */}
                  <Status status={appointment.status} />
                </p>
              </div>
            </div>
            {/* TODO: VIEW FOR DOCTOR - ADD PRESCRIPTIONS */}

            <div className="d-flex mt-3 mb-5">
              {appointment.status === "Complete" && (
                <div className="button-group me-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-space"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Add diagnostic
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-success btn-space"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Add prescription
                  </button>
                </div>
              )}

              {appointment.status === "Pending" && (
                <button
                  type="button"
                  className="btn btn-success btn-space"
                  onClick={handleApproval}
                >
                  Approve
                </button>
              )}

              {appointment.status === "Approved" && (
                <button
                  type="button"
                  className="btn btn-primary btn-space"
                  onClick={handleComplete}
                >
                  Complete
                </button>
              )}
            </div>
          </div>

          {/* VIEW OF DIAGNOSTIC */}
          <div className="prescription mt-5">
            <div className="card">
              <h5 className="card-header">DIAGNOSTIC</h5>
              <div className="card-body">jhkgfhjkl</div>
            </div>
          </div>

          {/* VIEW OF PRESCRIPTIONS */}
          <div className="prescription mt-5">
            <div className="card">
              <h5 className="card-header">PRESCRIPTIONS</h5>
              <div className="card-body">jhkgfhjkl</div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default AppointmentPage;
