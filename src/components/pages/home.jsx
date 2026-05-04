import React from "react";
import image from "../../assets/modal.jpg";
import { Smoke } from "../utilities/smoke";
import { AnimatedBorder } from "../utilities/animatedBorder";

export const Home_ = () => {
    return (
        <main className="min-h-screen bg-transparent text-white ">
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-start  lg:items-center lg:mt-0 mt-12 justify-start md:justify-start overflow-hidden">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-[position:85%_center] md:bg-center"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 max-w-2xl px-6 md:px-16">

                    <span className="text-xl font-arimo md:text-2xl
            tracking-wider font-medium text-purple-400 uppercase">
                        Unleashing the Power of Rock
                    </span>
                    <h2 className=" font-space text-5xl md:text-6xl font-extrabold leading-tight ">
                        Discover The Best Music Events In The City
                    </h2>

                    <p className="text-white/70 font-arimo tracking-wide  text-lg">
                        Join us for an electrifying <span className="text-white font-semibold">Rock On Music Party</span> where the beats are loud,
                        the vibes are high, and the night is unforgettable.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="">

                            <AnimatedBorder onClick={() => { }} >
                                <span className="font-space text-xs font-semibold text-white sm:text-sm">
                                    Buy Tickets
                                </span>
                            </AnimatedBorder>

                        </button>

                        <button className="px-6 py-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
                            Book VIP
                        </button>
                    </div>
                </div>

            </section>
            {/* <Smoke/> */}

        </main>
    );
};