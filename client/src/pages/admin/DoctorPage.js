import React, { useParams } from "react";

function DoctorPage() {
  const { doctorId } = useParams();
  return <div>DoctorPage {doctorId}</div>;
}

export default DoctorPage;
