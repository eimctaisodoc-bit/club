import { useState } from "react";
import { Test } from "./create";

export const TestProvider = ({ children }) => {
  const [value, setValue] = useState("Ranjan kharel");

  return (
    <Test.Provider value={{ value, setValue }}>
      {children}
    </Test.Provider>
  );
};