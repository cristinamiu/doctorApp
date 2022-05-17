import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewAppointment(props) {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [pacientName, setPacientName] = React.useState("");
  const [doctors, setDoctors] = React.useState([]);
  const [choiceId, setChoiceId] = React.useState("");

  const departments = [
    "cardiology",
    "neurology",
    "ophthalmology",
    "neurology",
    "dermatology",
    "urology",
    "oncology",
    "hepatology",
    "pneumology",
    "dentistry",
  ];

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("ok");
    console.log(choiceId);

    axios
      .post("http://localhost:5000/doctors/new-appointment", {
        title: title,
        PatientId: props.patientId,
        DoctorId: choiceId,
        date: date,
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/patients/my-appointments`);
      });
  };

  const handleChoice = (id) => {
    console.log(id);
    setChoiceId(id);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/auth/users2").then((response) => {
      setDoctors(response.data);
      console.log(response.data);
    });
  }, []);

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
        <label>Choose doctor</label>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(event) => handleChoice(event.target.value)}
        >
          <option selected>Open this select menu</option>

          {doctors.map((doctor, key) => (
            <option value={doctor.Doctors[0].id}>
              {doctor.name} ({doctor.Doctors[0].department})
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
}

export default NewAppointment;
