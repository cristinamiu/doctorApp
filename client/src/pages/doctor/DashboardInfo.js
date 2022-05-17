import React from "react";

function DashboardInfo(props) {
  return (
    <div class="col-md-6 mt-5">
      <div class="card  order-card" style={{ background: props.style }}>
        <div class="card-block">
          <h4 class="m-b-40">
            {props.status} <br />
          </h4>
          <h2 class="text-right">
            <i class="fa fa-cart-plus f-left"></i>
            <span>{props.number}</span>
          </h2>

          <a href={props.path} class="btn btn btn-outline-light">
            {props.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
