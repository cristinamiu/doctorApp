import React from "react";

function PrescriptionForm(props) {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new prescription
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Observations</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add new prescription"
                onChange={(event) => props.onChangeObs(event)}
              />
              <label>Medication</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add new prescription"
                onChange={(event) => props.onChangeMed(event)}
              />
              <label>Dose</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add new prescription"
                onChange={(event) => props.onChangeDose(event)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => props.onAddPrescriptionClick()}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionForm;
