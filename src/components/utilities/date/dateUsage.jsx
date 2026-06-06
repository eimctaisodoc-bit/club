import React from "react";
import NepaliDatePicker from "./date";

export default function DateUsage({ onChange }) {
  // Extract the selected dates and pass them directly to the parent component
  const handleRangeSelect = (value) => {
    const updatedRange = {
      from: value?.[0]?.value || "",
      to: value?.[1]?.value || "",
    };
    
    if (onChange) {
      onChange(updatedRange);
    }
  };

  return (
    <NepaliDatePicker
      id="booking-range"
      options={{ range: false,mode: "dark" ,miniEnglishDates: true, }}
      minDate={new Date()} // Disable past dates
      onSelect={handleRangeSelect}
      placeholder="Select From & To Dates"
    />
  );
}