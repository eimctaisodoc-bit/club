import React, { Suspense, lazy } from "react";

const Home_ = lazy(() => import("../pages/home"));
const Gallery = lazy(() => import("../utilities/gallery"));
const Testomonials = lazy(() => import("../utilities/testimonials"));
const Menu = lazy(() => import("../utilities/menu"));
const RodhiServices = lazy(() => import("../utilities/service"));
const ContactSection = lazy(() => import("../utilities/contact"));
const EventForm = lazy(() => import("../utilities/book.jsx"));

export default function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home_ />
      <Gallery />
      <Menu />
      <RodhiServices />
      <EventForm />
      <Testomonials />
      <ContactSection />
    </Suspense>
  );
}