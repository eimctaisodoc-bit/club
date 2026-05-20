import React from "react";
import image from "../../assets/triangel.png";

export const RotatingTriangle = ({ wrapperClassName = "", imgClassName = "", imgStyle = {} }) => {
  return (
    <div className={`flex items-center justify-center bg-transparent ${wrapperClassName}`}>
      <img
        src={image}
        alt="Rotating Triangle"
        className={`h-24 w-24 object-contain ${imgClassName}`}
        style={{
          background: "transparent",
          animation: "smoothRotate 8s linear infinite",
          ...imgStyle,
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