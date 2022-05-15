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
function RoutesMap() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="general-layout ">
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMap;
