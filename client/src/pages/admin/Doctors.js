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
            {doctors.map((doctor, key) => (
              <div> {doctor.name}</div>
            ))}
            {/*  */}
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
