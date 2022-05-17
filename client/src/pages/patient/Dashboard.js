import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientSidebar from "./Sidebar";
import Jumbotron from "../doctor/Jumbotron";
import axios from "axios";

function PatientDashboard(props) {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const patientId = props.patientId;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/doctors/get-diagnostics/by-patient/${patientId}`
      )
      .then((response) => {
        console.log(response.data);
        setMedicalRecords(response.data);
        response.data.map((data) => console.log(data.id));
      });
  }, []);
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <PatientSidebar />

        <div class="col">
          <div>
            <Jumbotron title="Dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
