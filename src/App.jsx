import React, { Suspense, lazy } from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import heroImg from './assets/hero.png'
import './App.css'

import DynamicCalendar from "./components/utilities/calendar/calenUI";
// import EventForm from "./components/utilities/book";

function App() {

  const NavBar = lazy(() => import("./components/utilities/navbar"));
  const Home_ = lazy(() => import("./components/pages/home"));
  const Gallery = lazy(() => import("./components/utilities/gallery"));
  const RodhiServices = lazy(() => import("./components/utilities/service"));
  // const EventForm = lazy(() => import("./components/utilities/book"));
  const DynamicCalendar = lazy(() => import("./components/utilities/calendar/calenUI.jsx"));
  const Testomonials = lazy(() => import("./components/utilities/testimonials"));
  const ContactSection = lazy(() => import("./components/utilities/contact"));
  const Footer = lazy(() => import("./components/utilities/footer"));
  const Menu = lazy(() => import("./components/utilities/menu"));
  // const DynamicCalendar = lazy(() => import("./components/utilities/calendar/calenUI.jsx"));
  return (
    <>

      <BrowserRouter>

         <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Home_ />
      </Suspense> 


        {/* <DynamicCalendar /> */}

         <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Menu />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <RodhiServices />
      </Suspense>

        <Routes>
          <Route path='/ab' element={<>Contact</>} />
        </Routes> 

        <Suspense fallback={<div>Loading...</div>}>
          {/* <EventForm /> */}
          <DynamicCalendar />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
        <Testomonials />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ContactSection />
      </Suspense>


      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense> 

      </BrowserRouter>


    </>
  )
}

export default App
