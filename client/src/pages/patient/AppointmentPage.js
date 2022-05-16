import React, { useState, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Status from "../doctor/Status";

function AppointmentPage() {
  const { state } = useLocation();
  const [appointment, setAppointment] = useState(state.appointment);

  const [diagnostic, setDiagnostic] = useState({});
  const [prescriptionObject, setPrescriptionObject] = useState({});

  console.log(state);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/patients/my-appointments/appointment/${state.appointment.id}`
      )
      .then((response) => {
        console.log(response.data);
        setAppointment(response.data);

        axios
          .get(
            `http://localhost:5000/doctors//get-diagnostics/by-app/${state.appointment.id}`
          )
          .then((resp) => {
            console.log(resp.data[0].Diagnostics[0]);
            setDiagnostic(resp.data[0].Diagnostics[0]);

            axios
              .get(
                `http://localhost:5000/doctors//get-prescriptions/by-app/${state.appointment.id}`
              )
              .then((result) => {
                console.log(result.data);
                setPrescriptionObject(result.data);
              });
          });
      });
  }, []);

  return (
    <div class="row">
      <DoctorSidebar />
      <div class="col-md-10">
        <>
          {/* VIEW FOR PACIENT AND DOCTOR */}
          <div className="info-appointment m-3">
            <div className="card">
              <h5
                className="card-header"
                style={{ background: "#65C18C", color: "#fff" }}
              >
                {appointment.title.toUpperCase()}
              </h5>
              <div className="card-body" style={{ textAlign: "left" }}>
                <p className="card-text">
                  <span style={{ fontWeight: "600" }}>Doctor Name: </span>
                  {appointment.Doctor.name}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "600" }}>Service: </span>
                  {appointment.Doctor.department}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "600" }}>Date: </span>{" "}
                  {appointment.date}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "600" }}>Status: </span>{" "}
                  <Status status={appointment.status} />
                </p>
              </div>
            </div>
          </div>

          {/* VIEW OF DIAGNOSTIC */}
          <div className="row">
            <div className="col">
              <div className="prescription">
                <div className="card">
                  <h5 className="card-header">DIAGNOSTIC</h5>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Cardiology: </span>
                      {diagnostic.cardiology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Ophthalmology: </span>
                      {diagnostic.ophthalmology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Neurology: </span>
                      {diagnostic.neurology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Dermatology: </span>
                      {diagnostic.dermatology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Urology: </span>
                      {diagnostic.urology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Oncology: </span>
                      {diagnostic.oncology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Hepatology: </span>
                      {diagnostic.hepatology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Dentistry: </span>
                      {diagnostic.dentistry}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Pneumology: </span>
                      {diagnostic.pneumology}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              {/* VIEW OF PRESCRIPTIONS */}
              <div className="prescription">
                <div className="card">
                  <h5 className="card-header">PRESCRIPTIONS</h5>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Observations: </span>
                      {prescriptionObject.observation}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Medication: </span>
                      {prescriptionObject.medication}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Dose: </span>
                      {prescriptionObject.dose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default AppointmentPage;
