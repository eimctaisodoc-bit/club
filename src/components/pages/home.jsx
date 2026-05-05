import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import image from "../../assets/modal.jpg";
import { AnimatedBorder } from "../utilities/animatedBorder";

export const Home_ = () => {
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Little zoom on scroll
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    return (
        <AnimatePresence>
            <main className="min-h-screen overflow-hidden bg-transparent text-white">
                {/* HERO SECTION */}
                <section
                    ref={heroRef}
                    className="relative flex min-h-screen items-start justify-start overflow-hidden lg:items-center"
                >
                    {/* Background Image With Scroll Zoom */}
                    <motion.div
                        className="
                            absolute inset-0 
                            bg-cover 
                            bg-[position:72%_center] 
                            sm:bg-[position:78%_center]
                            md:bg-center
                        "
                        style={{
                            backgroundImage: `url(${image})`,
                            scale: imageScale,
                        }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 md:from-black/70 md:via-black/35 md:to-transparent" />

                    {/* Content */}
                    <div
                        className="
                            relative z-10 
                            mt-20 w-full max-w-[92%] px-5
                            sm:mt-24 sm:max-w-xl sm:px-8
                            md:mt-20 md:max-w-2xl md:px-16
                            lg:mt-0

                            min-h-[420px]
                            sm:min-h-[440px]
                            md:min-h-[460px]
                            flex flex-col justify-center
                        "
                    >
                        <span
                            className="
                                font-arimo 
                                text-sm font-medium uppercase tracking-[0.22em] 
                                text-purple-400
                                sm:text-base
                                md:text-xl
                                lg:text-2xl
                                leading-none
                            "
                        >
                            Hot Nights. Neon Lights.
                        </span>

                        <h2
                            className="
                                mt-4 font-space 
                                font-extrabold leading-[1.05]
                                sm:text-5xl
                                text-6xl
                                md:text-6xl
                                lg:text-6xl
                                max-w-[680px]
                            "
                        >
                            Feel The Pulse Of The Ultimate Night Club
                        </h2>

                        <p
                            className="
                                mt-5 max-w-xl 
                                font-arimo text-sm leading-7 tracking-wide text-white/75
                                sm:text-base
                                md:text-lg
                            "
                        >
                            Step into a glamorous{" "}
                            <span className="font-semibold text-white">
                                late-night party experience
                            </span>{" "}
                            with live DJs, glowing dance floors, premium vibes, and unforgettable energy all night long.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-6 sm:gap-4">
                            <AnimatedBorder onClick={() => {}}>
                                <span className="font-space text-xs font-semibold text-white sm:text-sm">
                                    Reserve Table
                                </span>
                            </AnimatedBorder>

                            <button
                                type="button"
                                className="
                                    rounded-full border border-white/40 
                                    bg-white/10 px-5 py-2.5 
                                    text-sm font-semibold 
                                    backdrop-blur-md transition 
                                    hover:bg-white/20
                                    sm:px-6 sm:py-3
                                "
                            >
                                Book VIP Lounge
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </AnimatePresence>
    );
};