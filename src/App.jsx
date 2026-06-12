import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/mainLayout/layout";
import Loader from "./components/pages/loader";

const NavBar = lazy(() => import("./components/utilities/navbar"));
const DynamicCalendar = lazy(() =>
  import("./components/utilities/calendar/calenUI.jsx")
);
const Footer = lazy(() => import("./components/utilities/footer"));

function App() {
  return (
    <BrowserRouter>
      
          <Suspense fallback={<Loader />}>
            <NavBar />

            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/ab" element={<DynamicCalendar />} />
            </Routes>

            <Footer />
          </Suspense>
     
    </BrowserRouter>
  );
}

export default App;