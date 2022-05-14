import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

function RoutesMap() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="general-layout">
      <BrowserRouter>
        <Navbar />

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
                <h1> Admin Dashboard</h1>
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
                <h1>Admin doctors</h1>
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
