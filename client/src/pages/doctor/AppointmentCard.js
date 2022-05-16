import React from "react";
import Status from "./Status";

function AppointmentCard(props) {
  return (
    <div className="col-sm-3">
      <div className="m-2 card appointment-card">
        <img src="../../images/doctor.png" alt="Appointment" />
        <div className="m-3 card-title">
          <h5>{props.appointment.title}</h5>
        </div>
        <div className="appointment-body card-body">
          <p>
            <strong>Date: </strong> {props.appointment.date}
          </p>
          <p>
            <strong>Patient: </strong> {props.appointment.Patient.name}
          </p>
          <p>
            <strong>Status: </strong>{" "}
            <Status status={props.appointment.status} />
          </p>
          <div class="container">
            <div class="row">
              {!props.appointment.isComplete && (
                <div class="col-12 col-md-6">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.onDelete(props.appointment.id)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div class="col-12 col-md-6">
                <button
                  class="btn btn-success"
                  type="button"
                  // onClick={() =>
                  // navigate(
                  //   `/doctors/my-appointments/appointment/${props.appointment.id}`,
                  //   { state: { appointment: props.appointment.title } }
                  // )
                  // }
                  onClick={() => props.onShow(props.appointment)}
                >
                  Show
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
