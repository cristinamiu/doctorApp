import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import axios from "axios";
import Jumbotron from "./Jumbotron";
import { AuthContext } from "../../context/AuthContext";

function Patients() {
  const { authState } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const doctorId = authState.secondId;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/doctors/${doctorId}/my-appointments`)
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
      });
  }, []);
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <DoctorSidebar />

        <div class="col">
          <div>
            <Jumbotron title="My Patients" />
          </div>

          <table class="table align-middle mb-0 bg-white mt-5">
            <thead class="bg-light">
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, key) => (
                <tr>
                  <td>
                    <img
                      src="/images/doctor.png"
                      className="rouded-circle justify-content-start"
                      alt=""
                    />
                  </td>
                  <td>{patient.Patient.id}</td>
                  <td>
                    <div class=" align-items-center">
                      <div>
                        <p class="fw-bold mb-1">{patient.Patient.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group m-2">
                      <a
                        type="button"
                        class="btn btn-primary btn-sm"
                        href={`/doctors/my-patients/${patient.Patient.id}`}
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

export default Patients;
