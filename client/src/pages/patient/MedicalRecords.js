import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientSidebar from "./Sidebar";
import Jumbotron from "../doctor/Jumbotron";
import axios from "axios";

function MedicalRecords(props) {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const { patientId } = useParams();
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
            <Jumbotron title="Medical Records" />
          </div>

          <table class="table align-middle mb-0 bg-white mt-5">
            <thead class="bg-light">
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Appointment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map((record) => (
                <tr>
                  <td>
                    <img
                      src="/images/doctor.png"
                      className="rouded-circle justify-content-start"
                      alt=""
                    />
                  </td>
                  <td>{record.id}</td>
                  <td>
                    <div class=" align-items-center">
                      <div>
                        <p class="fw-bold mb-1">{record.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>{record.date}</td>
                  <td>{record.status}</td>

                  <td>
                    <div class="btn-group m-2">
                      <a
                        type="button"
                        class="btn btn-primary btn-sm"
                        href={`/patients/medical-records/${record.id}`}
                      >
                        View
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
