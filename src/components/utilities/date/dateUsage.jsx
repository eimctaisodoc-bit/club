import React from "react";
import NepaliDatepicker from "./date"; 

export default function DateUsage({ onChange }) {
  const handleRangeSelect = (value) => {
    let finalDateString = "";

    // 1. If the library returns a plain string, use it
    if (typeof value === "string") {
      finalDateString = value;
    } 
    // 2. If the library returns an object, hunt for the date string inside it
    else if (typeof value === "object" && value !== null) {
      finalDateString = value.formattedDate || value.bsDate || value.value || value.adDate || Object.values(value)[0] || "";
    }

    console.log("Clean extracted date string in DateUsage:", finalDateString);

    // Pass the clean string inside the 'from' property
    if (onChange) {
      onChange({
        from: finalDateString,
        to: ""
      });
    }
  };

  return (
    <NepaliDatepicker
      id="booking-range"
      options={{ range: false, mode: "dark", miniEnglishDates: true }}
      onSelect={handleRangeSelect}
      placeholder="Select Date"
    />
  );
}