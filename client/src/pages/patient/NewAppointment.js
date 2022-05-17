import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewAppointment(props) {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [pacientName, setPacientName] = React.useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/doctors/new-appointment", {
        title: title,
        PatientId: props.patientId,
        DoctorId: 1,
        date: date,
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/patients/my-appointments`);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mt-2">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
      </div>
      <div className="form-group mt-2">
        <label>Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        ></input>
      </div>
      <div className="form-group mt-2">
        <label>Patient Name</label>
        <input
          type="text"
          className="form-control"
          value={pacientName}
          onChange={(e) => setPacientName(e.target.value)}
          required
        ></input>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
}

export default NewAppointment;
