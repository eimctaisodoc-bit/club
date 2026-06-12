import React, { Suspense, lazy } from "react";


export default function Layout() {
    const Home_ = lazy(() => import("../pages/home"));
    const Gallery = lazy(() => import("../utilities/gallery"));
    const Testomonials = lazy(() => import("../utilities/testimonials"));
    const Menu = lazy(() => import("../utilities/menu"));
    const RodhiServices = lazy(() => import("../utilities/service"));
    const ContactSection = lazy(() => import("../utilities/contact"));
    const EventForm = lazy(() => import("../utilities/book.jsx"));
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Home_ />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <Gallery />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <Menu />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <RodhiServices />
            </Suspense>
            
            <Suspense fallback={<div>Loading...</div>}>
                <EventForm />
            </Suspense>


            <Suspense fallback={<div>Loading...</div>}>
                <Testomonials />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <ContactSection />
            </Suspense>


        </>
    );
}