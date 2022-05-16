import React from "react";

function Status(props) {
  return (
    <>
      {props.status === "Pending" && (
        <span class="badge rounded-pill bg-warning text-dark">
          {props.status}
        </span>
      )}
      {props.status === "Approved" && (
        <span class="badge rounded-pill bg-success text-light">
          {props.status}
        </span>
      )}
      {props.status === "Complete" && (
        <span class="badge rounded-pill bg-primary text-light">
          {props.status}
        </span>
      )}
    </>
  );
}

export default Status;
