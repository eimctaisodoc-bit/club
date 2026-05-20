import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter } from "react-router-dom";
import heroImg from './assets/hero.png'
import './App.css'
import { NavBar } from './components/utilities/navbar'
import { TestProvider } from './components/context/provider'
import { Home_ } from './components/pages/home';
import { Contact } from './components/pages/contact';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './components/utilities/footer';
import { Gallery } from './components/utilities/gallery';
import { Testomonials } from './components/utilities/testimonials';
import { UpcomingEvent } from './components/utilities/event';
import RodhiServices from './components/utilities/service';
import ContactSection from './components/utilities/contact';




function App() {


  return (
    <>
    <AnimatePresence>

      <BrowserRouter>
        <TestProvider>
          {/* <Smoke> */}
          <NavBar />
          <Home_ />
          <Gallery/>
          <RodhiServices/>
          <UpcomingEvent/>
          <Testomonials/>
          <ContactSection/>
         {/* <Contact/> */}
         <Footer/>
         {/* </Smoke> */}
          {/* </Smoke> */}
        </TestProvider>
      </BrowserRouter>
    </AnimatePresence>
    </>
  )
}

export default App
