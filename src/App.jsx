import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Layout from "./components/mainLayout/layout";



function App() {

  const NavBar = lazy(() => import("./components/utilities/navbar"));
  const DynamicCalendar = lazy(() => import("./components/utilities/calendar/calenUI.jsx"));
  const Footer = lazy(() => import("./components/utilities/footer"));

  
  return (
    <>

      <BrowserRouter>

        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
        </Suspense>

       
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/ab" element={
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicCalendar />
            </Suspense>

          } />
        </Routes>

        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>

      </BrowserRouter>


    </>
  )
}

export default App
