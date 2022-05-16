import React, { useState, useContext, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import axios from "axios";
import Jumbotron from "./Jumbotron";

function Patients() {
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div class="row">
        <DoctorSidebar />

        <div class="col">
          <div>
            <Jumbotron title="My Patients" />
          </div>
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              class="btn btn-success mb-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
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
              {/* {doctors.map((doctor, key) => ( */}
              <tr>
                <td>
                  <img
                    src="/images/doctor.png"
                    className="rouded-circle justify-content-start"
                    alt=""
                  />
                </td>
                {/* <td>{doctor.id}</td> */}
                <td>
                  <div class=" align-items-center">
                    <div>
                      {/* <p class="fw-bold mb-1">{doctor.name}</p> */}
                      {/* <p class="text-muted mb-0">{doctor.email}</p> */}
                    </div>
                  </div>
                </td>
                <td>
                  <div class=" align-items-center">
                    <div>
                      {/* <p class="">{doctor.Doctors[0].department}</p> */}
                    </div>
                  </div>
                </td>
                <td>
                  <div class="btn-group m-2">
                    <a
                      type="button"
                      class="btn btn-primary btn-sm"
                      // href={`/doctors/${doctor.id}`}
                    >
                      View
                    </a>
                  </div>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      // onClick={() => deleteDoctor(doctor.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Patients;
