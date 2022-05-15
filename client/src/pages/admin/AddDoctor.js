import React from "react";

function AddDoctor(props) {
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
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new doctor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={(event) => props.onChangeFName(event.target.value)}
              />

              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                onChange={(event) => props.onChangeLName(event.target.value)}
              />

              {/* <label>Department</label>
              <input
                type="text"
                className="form-control"
                placeholder="Choose department"
                onChange={(event) =>
                  props.onChangeDepartment(event.target.value)
                }
              /> */}
              <label>Department</label>
              <select
                class="form-select"
                aria-label="Default select example"
                required
                onChange={(event) =>
                  props.onChangeDepartment(event.target.value)
                }
                value={"cardiology"}
              >
                {departments.map((department) => (
                  <option value={department}>{department}</option>
                ))}
              </select>
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
                type="button"
                className="btn btn-primary"
                onClick={() => props.onAddDoctorClick()}
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

export default AddDoctor;
