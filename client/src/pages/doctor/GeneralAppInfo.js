import React from "react";

function GeneralAppInfo(props) {
  return (
    <div class="col-md-4 col-xl-3 m-5">
      <div class="card  order-card" style={{ background: props.style }}>
        <div class="card-block">
          <h4 class="m-b-40">
            {props.status} <br /> Appointments
          </h4>
          <h2 class="text-right">
            <i class="fa fa-cart-plus f-left"></i>
            <span>486</span>
          </h2>

          <a href={props.path} class="btn btn btn-outline-light">
            Go to appointments
          </a>
        </div>
      </div>
    </div>
  );
}

export default GeneralAppInfo;
