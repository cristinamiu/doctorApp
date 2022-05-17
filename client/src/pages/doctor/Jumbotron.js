import React from "react";

function Jumbotron(props) {
  return (
    <div class="jumbotron jumbotron-cover-image">
      <div class="container">
        <h1 style={{ textAlign: "center" }}>{props.title}</h1>
        <h3 style={{ textAlign: "center" }}>{props.subtitle}</h3>
      </div>
    </div>
  );
}

export default Jumbotron;
