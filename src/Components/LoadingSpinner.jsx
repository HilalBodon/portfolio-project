import React from "react";
// import { RingLoader } from "react-spinners";
import { BarLoader } from "react-spinners";


const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <BarLoader color="#36D7B7" loading={true} size={150} />
    </div>
  );
};

export default LoadingSpinner;
