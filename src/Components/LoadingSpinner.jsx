import React from "react";
// import { RingLoader } from "react-spinners";
import { RingLoader	 } from "react-spinners";


const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <RingLoader	 color="#C87167" loading={true} size={100} />
    </div>
  );
};

export default LoadingSpinner;
