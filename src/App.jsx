import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter } from "react-router-dom";
import heroImg from './assets/hero.png'
import './App.css'
import { Smoke } from './components/utilities/smoke'
import { NavBar } from './components/utilities/navbar'
import { TestProvider } from './components/context/provider'
import { Home_ } from './components/pages/home';
import { Contact } from './components/pages/contact';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './components/utilities/footer';



function App() {


  return (
    <>
    <AnimatePresence>

      <BrowserRouter>
        <TestProvider>
          <NavBar />
          <Home_ />
         <Contact/>
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
