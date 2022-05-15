import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/users`).then((response) => {
      setDoctors(response.data);
    });
  }, []);

  const deleteDoctor = (doctorId) => {
    axios
      .delete(`http://localhost:5000/doctors/${doctorId}`)
      .then((response) => {
        console.log(response);
        const doctorsToReturn = doctors.filter(
          (doctor) => doctor.id !== doctorId
        );
        setDoctors(doctorsToReturn);
      });
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <AdminSidebar />
          <div class="col-sm p-4 vh-100">
            <h1>Doctors</h1>
            <div className="d-flex flex-row-reverse">
              <button type="button" class="btn btn-success  mt-4 mb-4">
                Add doctor
              </button>
            </div>

            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, key) => (
                  <tr>
                    <td>
                      <img
                        src="/images/doctor.png"
                        className="rouded-circle justify-content-start"
                      />
                    </td>
                    <td>{doctor.id}</td>
                    <td>
                      <div class=" align-items-center">
                        <div>
                          <p class="fw-bold mb-1">{doctor.name}</p>
                          <p class="text-muted mb-0">{doctor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class=" align-items-center">
                        <div>
                          <p class="">{doctor.Doctors[0].department}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="btn-group m-2">
                        <a
                          type="button"
                          class="btn btn-primary btn-sm"
                          href={`/doctors/${doctor.id}`}
                        >
                          View
                        </a>
                      </div>
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          onClick={() => deleteDoctor(doctor.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* hdfj */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
