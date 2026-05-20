import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    MessageSquare,
    MoveLeft,
    MoveRight,
    Quote,
    Link,
} from "lucide-react";

export const Testomonials = () => {
    const content = [
        {
            name: "Royal Night Club",
            review:
                "Amazing nightlife experience with energetic music, premium ambience and professional hospitality. The atmosphere feels luxurious and vibrant every night.",
            link: "#",
        },
        {
            name: "Velvet Lounge & Bar",
            review:
                "The lighting, DJ performance and crowd management were outstanding. Perfect destination for enjoying premium nightlife with friends.",
            link: "#",
        },
        {
            name: "Galaxy Dance Club",
            review:
                "Highly impressed by the club environment and VIP service. Music system, interior design and staff behavior were all top-class.",
            link: "#",
        },
        {
            name: "Midnight Palace Club",
            review:
                "Beautiful interior with stunning blue and golden vibes. The live performances and hospitality made the night unforgettable.",
            link: "#",
        },
        {
            name: "Luxury Vibes Lounge",
            review:
                "Professional management, secure environment and excellent customer service. One of the best nightlife destinations we’ve experienced.",
            link: "#",
        },
        {
            name: "Blue Moon Restro & Club",
            review:
                "Elegant ambience with powerful sound system and premium seating arrangement. Perfect place for entertainment and celebration.",
            link: "#",
        },
        {
            name: "Diamond VIP Club",
            review:
                "The VIP section experience was exceptional. Stylish setup, friendly staff and energetic atmosphere throughout the night.",
            link: "#",
        },
        {
            name: "Golden Beats Night Club",
            review:
                "Music selection, crowd energy and luxury environment were beyond expectations. Truly a premium nightlife experience.",
            link: "#",
        },
    ];
    const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

    const paginate = (newDirection) => {
        setCurrentIndex(([prev]) => {
            const nextIndex =
                (prev + newDirection + content.length) % content.length;
            return [nextIndex, newDirection];
        });
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 120 : -120,
            opacity: 0,
            scale: 0.96,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction > 0 ? -120 : 120,
            opacity: 0,
            scale: 0.96,
        }),
    };

    const activeItem = content[currentIndex];

    return (
        <section className="relative  w-full overflow-hidden py-10">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#07152e] to-[#0f2d5c]" />

            {/* Glow Effects */}
            <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#1d4ed8]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#0b1730]/70 px-5 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                    <MessageSquare
                        size={16}
                        className="text-[#d4af37]"
                    />
                    <span className="text-sm tracking-wide text-white">
                        Client Testimonials
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6"
                >
                    <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#c49d52] sm:text-5xl lg:text-6xl">
                        Voices of the Night
                        <span className="block mt-3 h-1 w-40 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f7d774] opacity-95" />
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Professional social media marketing, branding and business growth
                        solutions trusted by multiple brands and businesses.
                    </p>
                </motion.div>

                {/* Card */}
                <div className="mt-14">
                    <div className="relative min-h-[340px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="relative overflow-hidden rounded-lg border border-[#d4af37]/20 bg-white/5 p-8 backdrop-blur-2xl  sm:p-10 lg:p-14"
                            >
                                {/* Golden Border Glow */}
                                <div className="absolute inset-0 rounded-lg border border-[#d4af37]/10 pointer-events-none" />

                                {/* Quote Icon */}
                                <div className="absolute right-8 top-8 opacity-10">
                                    <Quote
                                        size={90}
                                        className="text-[#d4af37]"
                                    />
                                </div>

                                <div className="flex flex-col gap-8">
                                    {/* User */}
                                    <div className="flex items-center gap-5">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40 bg-gradient-to-br from-[#0f172a] to-[#102a56] text-xl font-bold text-[#f5d06f] shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                                            {activeItem.name
                                                .split(" ")
                                                .map((word) => word[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-white sm:text-2xl">
                                                {activeItem.name}
                                            </h3>

                                            <a
                                                href={activeItem.link}
                                                target="_blank"
                                                className="mt-1 inline-flex items-center gap-2 text-sm text-[#d4af37] transition-all hover:text-[#f7d774]"
                                            >
                                                <Link size={15} />
                                                View Review
                                            </a>
                                        </div>
                                    </div>

                                    {/* Review */}
                                    <p className="max-w-4xl text-lg leading-9 text-slate-300 italic sm:text-xl">
                                        “{activeItem.review}”
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => paginate(-1)}
                                className="group flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#07152e]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                            >
                                <MoveLeft
                                    size={18}
                                    className="text-[#d4af37] transition-transform duration-300 group-hover:-translate-x-1"
                                />
                            </button>

                            <div className="rounded-full border border-[#d4af37]/20 bg-[#07152e]/70 px-5 py-2 text-sm tracking-wide text-white/80 backdrop-blur-xl">
                                {currentIndex + 1} / {content.length}
                            </div>

                            <button
                                onClick={() => paginate(1)}
                                className="group flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#07152e]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                            >
                                <MoveRight
                                    size={18}
                                    className="text-[#d4af37] transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};