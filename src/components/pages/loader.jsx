import React from "react";
import { RotatingTriangles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        height:'100vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 9999,
      }}
    >
      <RotatingTriangles
        visible={true}
        height="100"
        width="100"
        color="#000000"
        ariaLabel="rotating-triangles-loading"
      />
    </div>
  );
};

export default Loader;