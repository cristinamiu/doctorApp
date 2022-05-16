import React, { useState, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Status from "./Status";
import DiagnosticForm from "./DiagnosticForm";
import PrescriptionForm from "./PrescriptionForm";

function AppointmentPage() {
  const { state } = useLocation();
  const [appointment, setAppointment] = useState(state.appointment);
  const [newObs, setNewObs] = useState("");
  const [newMed, setNewMed] = useState("");
  const [newDose, setNewDose] = useState("");

  const [newDiagnostic, setNewDiagnostic] = useState("");
  const [diagnostic, setDiagnostic] = useState({});
  const [prescriptionObject, setPrescriptionObject] = useState({});

  console.log(state);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/doctors/my-appointments/appointment/${state.appointment.id}`
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

  const addDiagnostic = () => {
    console.log("state");
    console.log(state);
    axios
      .post(
        `http://localhost:5000/doctors/add-diagnostic`,
        {
          content: newDiagnostic,
          appId: state.appointment.id,
          doctorId: state.appointment.DoctorId,
        },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Unauthorized");
        } else {
          const diagnosticToAdd = response.data;
          console.log("Adding diagnostic");
          console.log(response.data);
          setDiagnostic(diagnosticToAdd);
        }
      });
  };

  const addPrescription = () => {
    axios
      .post(
        `http://localhost:5000/doctors/add-prescription`,
        {
          observation: newObs,
          medication: newMed,
          dose: newDose,
          appId: state.appointment.id,
          doctorId: state.appointment.DoctorId,
        },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Unauthorized");
        } else {
          const prescriptionToAdd = response.data;
          setPrescriptionObject(prescriptionToAdd);
        }
      });
  };

  const handleObs = (e) => {
    setNewObs(e.target.value);
  };

  const handleMed = (e) => {
    setNewMed(e.target.value);
  };

  const handleDose = (e) => {
    setNewDose(e.target.value);
  };

  const handleChangeDiag = (diag) => {
    console.log(diag);
    setNewDiagnostic(diag);
  };

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
                  <span style={{ fontWeight: "600" }}>Patient Name: </span>
                  {appointment.Patient.name}
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
                    data-bs-target="#exampleModal2"
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
        <PrescriptionForm
          onChangeObs={handleObs}
          onChangeMed={handleMed}
          onChangeDose={handleDose}
          onAddPrescriptionClick={addPrescription}
        />
        <DiagnosticForm
          onChangeDiagnostic={handleChangeDiag}
          onAddDiagnosticClick={addDiagnostic}
        />
      </div>
    </div>
  );
}

export default AppointmentPage;
