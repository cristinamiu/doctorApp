import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authState.status && authState.role === "admin") {
      navigate("/admin/dashboard");
    } else if (authState.status && authState.role === "doctor") {
      navigate("/doctors/dashboard");
    } else if (authState.status && authState.role === "patient") {
      navigate("/patients/dashboard");
    }
  });
  return <div>Home</div>;
}

export default Home;
