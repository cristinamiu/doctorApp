import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import AdminDashboard from "./admin/Dashboard";
import AdminDoctors from "./admin/Doctors";
import DoctorPage from "./admin/DoctorPage";
import Dashboard from "./doctor/Dashboard";
import DoctorPatients from "./doctor/Patients";
import DoctorAppointments from "./doctor/Appointments";
import DoctorAppointmentPage from "./doctor/AppointmentPage";
import DPendingAppointment from "./doctor/PendingAppointments";
import PatientDashboard from "./patient/Dashboard";
import PatientAppointments from "./patient/Appointments";
import PPendingAppointment from "./patient/PendingAppointments";
import PatientAppointmentPage from "./patient/AppointmentPage";
import MedicalRecords from "./patient/MedicalRecords";
import Record from "./patient/Record";
import NewAppointment from "./patient/NewAppointment";

function RoutesMap() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="general-layout container-fluid d-flex flex-column p-0">
      <BrowserRouter>
        <div className="row">
          <Navbar />
        </div>

        <Routes>
          {/* Register route */}
          <Route exact path="/register" element={<RegisterPage />} />

          {/* Login route */}
          <Route exact path="/login" element={<LoginPage />} />

          {/* ADMIN ROUTES */}
          <Route
            exact
            path="/admin/dashboard"
            element={
              authState.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />
          <Route
            exact
            path="/admin/doctors"
            element={
              authState.role === "admin" ? (
                <AdminDoctors />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />
          <Route
            exact
            path="/admin/doctors/:doctorId"
            element={
              authState.role === "admin" ? (
                <DoctorPage />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          {/* DOCTOR ROUTES */}
          <Route
            exact
            path="/doctors/dashboard"
            element={
              authState.role === "doctor" ? (
                <Dashboard />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/doctors/my-patients"
            element={
              authState.role === "doctor" ? (
                <DoctorPatients />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/doctors/my-appointments"
            element={
              authState.role === "doctor" ? (
                <DoctorAppointments />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/doctors/my-appointments/pending"
            element={
              authState.role === "doctor" ? (
                <DPendingAppointment status={"Pending"} />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />
          <Route
            exact
            path="/doctors/my-appointments/approved"
            element={
              authState.role === "doctor" ? (
                <DPendingAppointment status={"Approved"} />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/doctors/my-appointments/complete"
            element={
              authState.role === "doctor" ? (
                <DPendingAppointment status={"Complete"} />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/doctors/my-appointments/appointment/:id"
            element={
              authState.role === "doctor" ? (
                <DoctorAppointmentPage />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />
          {/* PATIENT ROUTES */}
          <Route
            exact
            path="/patients/dashboard"
            element={
              authState.role === "patient" ? (
                <div>
                  <PatientDashboard />
                </div>
              ) : (
                <h1> {authState.role}</h1>
              )
            }
          />

          <Route
            exact
            path="/patients/my-appointments"
            element={
              authState.role === "patient" ? (
                <div>
                  <PatientAppointments />
                </div>
              ) : (
                <h1> Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/patients/my-appointments/pending"
            element={
              authState.role === "patient" ? (
                <PPendingAppointment status={"Pending"} />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />
          <Route
            exact
            path="/patients/my-appointments/approved"
            element={
              authState.role === "patient" ? (
                <PPendingAppointment status={"Approved"} />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/patients/my-appointments/complete"
            element={
              authState.role === "patient" ? (
                <PPendingAppointment status={"Complete"} />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/patients/my-appointments/appointment/:id"
            element={
              authState.role === "patient" ? (
                <PatientAppointmentPage />
              ) : (
                <h1>Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/patients/medical-records"
            element={
              authState.role === "patient" ? (
                <div>
                  <MedicalRecords patientId={authState.secondId} />
                </div>
              ) : (
                <h1> Unauthorized</h1>
              )
            }
          />

          <Route
            exact
            path="/patients/new-appointment"
            element={
              authState.role === "patient" ? (
                <div>
                  <NewAppointment patientId={authState.secondId} />
                </div>
              ) : (
                <h1> Unauthorized</h1>
              )
            }
          />
          <Route
            exact
            path="/patients/medical-records/:recordId"
            element={
              authState.role === "patient" ? (
                <div>
                  <Record />
                </div>
              ) : (
                <h1> Unauthorized</h1>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMap;
