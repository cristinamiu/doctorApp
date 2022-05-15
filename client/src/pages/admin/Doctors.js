import React, { useEffect, useState, useContext } from "react";
import AdminSidebar from "./Sidebar";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/users`).then((response) => {
      setDoctors(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <AdminSidebar />
          <div class="col-sm p-4 vh-100">
            <h2>Doctors</h2>
            {/*  */}
            <ul class="list-group list-group-light">
              {doctors.map((doctor, key) => (
                <div>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <img
                        src="/images/doctor.png"
                        alt=""
                        class="rounded-circle"
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1" style={{ textAlign: "left" }}>
                          {doctor.name}
                        </p>
                        <p class="text-muted mb-0">{doctor.email}</p>
                      </div>
                    </div>
                    <p> {doctor.Doctors[0].department}</p>

                    <a
                      class="btn btn-primary btn-rounded btn-sm"
                      href="/"
                      role="button"
                    >
                      View
                    </a>
                  </li>
                </div>
              ))}
            </ul>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
