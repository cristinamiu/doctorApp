import React, { useState, useEffect } from "react";
import DoctorSidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router";
import Jumbotron from "../doctor/Jumbotron";

function Record() {
  const { recordId } = useParams();
  console.log(recordId);

  const [diagnostic, setDiagnostic] = useState({});
  const [prescriptionObject, setPrescriptionObject] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/doctors//get-diagnostics/by-app/${recordId}`)
      .then((resp) => {
        console.log(resp.data[0].Diagnostics[0]);
        setDiagnostic(resp.data[0].Diagnostics[0]);

        axios
          .get(
            `http://localhost:5000/doctors//get-prescriptions/by-app/${recordId}`
          )
          .then((result) => {
            console.log(result.data);
            setPrescriptionObject(result.data);
          });
      });
  }, []);

  return (
    <div class="row">
      <DoctorSidebar />
      <div class="col-md-10">
        <div>
          <Jumbotron title="Medical Records" />
        </div>
        <>
          {/* VIEW OF DIAGNOSTIC */}
          <div className="row mt-5">
            <div className="col">
              <div className="prescription">
                <div className="card">
                  <h5 className="card-header">DIAGNOSTIC</h5>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Cardiology: </span>
                      {diagnostic.cardiology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Ophthalmology: </span>
                      {diagnostic.ophthalmology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Neurology: </span>
                      {diagnostic.neurology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Dermatology: </span>
                      {diagnostic.dermatology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Urology: </span>
                      {diagnostic.urology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Oncology: </span>
                      {diagnostic.oncology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Hepatology: </span>
                      {diagnostic.hepatology}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Dentistry: </span>
                      {diagnostic.dentistry}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Pneumology: </span>
                      {diagnostic.pneumology}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              {/* VIEW OF PRESCRIPTIONS */}
              <div className="prescription">
                <div className="card">
                  <h5 className="card-header">PRESCRIPTIONS</h5>
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Observations: </span>
                      {prescriptionObject.observation}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Medication: </span>
                      {prescriptionObject.medication}
                    </p>
                    <p className="card-text">
                      <span style={{ fontWeight: "600" }}>Dose: </span>
                      {prescriptionObject.dose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Record;
