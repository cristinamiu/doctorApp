import React, { useEffect, useState } from "react";
import AdminSidebar from "./Sidebar";
import AddDoctor from "./AddDoctor";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [department, setDepartment] = useState("cardiology");

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/users`).then((response) => {
      setDoctors(response.data);
    });
  }, []);

  const handleFName = (fName) => {
    setfName(fName);
  };

  const handleLName = (lName) => {
    setlName(lName);
  };

  const handleDepartment = (department) => {
    setDepartment(department);
  };

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

  const addDoctor = () => {
    console.log(department);
    axios
      .post("http://localhost:5000/doctors/new", {
        fName: fName,
        lName: lName,
        department: department,
      })
      .then((response) => {
        if (response.data.error) {
          alert("Error");
        } else {
          axios.get(`http://localhost:5000/auth/users`).then((response) => {
            setDoctors(response.data);
          });
        }
      })
      .catch((err) => {
        alert("Error: " + err.data.error);
      });
  };

  return (
    <div>
      <div class="container-fluid d-flex flex-column p-0">
        <div class="row">
          <AdminSidebar />
          <div class="col-sm p-4 vh-100">
            <h1>Doctors</h1>
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
                {doctors.map((doctor, key) => (
                  <tr>
                    <td>
                      <img
                        src="/images/doctor.png"
                        className="rouded-circle justify-content-start"
                        alt=""
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
          </div>
        </div>
      </div>

      <AddDoctor
        onChangeFName={handleFName}
        onChangeLName={handleLName}
        onChangeDepartment={handleDepartment}
        onAddDoctorClick={addDoctor}
      />
    </div>
  );
}

export default Doctors;
