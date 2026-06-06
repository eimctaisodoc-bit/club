import { useEffect, useRef } from "react";
import React from 'react';
import "@sajanm/nepali-date-picker/dist/nepali.datepicker.v5.0.6.min.js";
import "@sajanm/nepali-date-picker/dist/nepali.datepicker.v5.0.6.min.css";

function NepaliDatepicker({
  options = {},
  onSelect = () => { },
  id,
  placeholder = "Select Date",
  className = ""
}) {
  const inputRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (inputRef.current && !initializedRef.current) {

      // Fetch today's Nepali Date to disable past and future dates
      let todayStr = "";
      if (window.NepaliFunctions) {
        const bsDate = window.NepaliFunctions.GetCurrentBsDate();
        todayStr = `${bsDate.year}-${String(bsDate.month).padStart(2, "0")}-${String(bsDate.day).padStart(2, "0")}`;
      }

      inputRef.current.NepaliDatePicker({
 
        disableBefore: todayStr,
        disableAfter: todayStr,
        ...options, 
        onSelect: (value) => {
          onSelect(value);
        },
      });

      initializedRef.current = true;
    }

    return () => {
      initializedRef.current = false;
    };
  }, [options, onSelect]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      placeholder={placeholder}

      autoComplete="off"
      // LUXURY THEME STYLING
      className={`w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder-white/40 backdrop-blur-md transition-all focus:border-[#c49d52] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#c49d52] ${className}`}

    />
  );
}

export default NepaliDatepicker;