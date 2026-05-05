import React from "react";
import image from "../../assets/triangel.png";

export const RotatingTriangle = () => {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <img
        src={image}
        alt="Rotating Triangle"
        className="h-24 w-24 object-contain"
        style={{
          background: "transparent",
          animation: "smoothRotate 8s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes smoothRotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};