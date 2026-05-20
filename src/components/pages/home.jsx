import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpg";
import image5 from "../../assets/5.jpg";
import image6 from "../../assets/6.jpg";

import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const slides = [
  {
    image: image1,
    tag: "Welcome",
    title: "Top Durbar\nRodhi Club",
    desc: "Keep Our Traditional Alive Through Music And Unity",
    detail:
      "Experience comfort, elegance, and tradition in the heart of our community.",
    name: "Randi Dancer",
    music: "Traditional Dohori",
  },
  {
    image: image2,
    tag: "Live Performance",
    title: "Feel The Real\nNepali Vibes",
    desc: "Celebrate Music, Culture And Entertainment",
    detail:
      "Traditional Rodhi experience blended with modern nightlife energy.",
    name: "Sarina Artist",
    music: "Folk Remix",
  },
  {
    image: image3,
    tag: "Traditional Nights",
    title: "Music That\nConnects Hearts",
    desc: "Feel Unity Through Dance And Melody",
    detail:
      "A premium Rodhi club experience full of energy and culture.",
    name: "Nepali Queen",
    music: "Club Dohori",
  },
  {
    image: image4,
    tag: "Celebration",
    title: "Tradition\nMeets Luxury",
    desc: "Experience Music Beyond Imagination",
    detail:
      "Dance, celebrate and enjoy premium hospitality every night.",
    name: "Club Dancer",
    music: "Modern Folk",
  },
  {
    image: image5,
    tag: "Exclusive Events",
    title: "Where Culture\nComes Alive",
    desc: "Traditional Music With Club Experience",
    detail:
      "Elegant atmosphere with live entertainment every single night.",
    name: "Rodhi Star",
    music: "Live Performance",
  },
  {
    image: image6,
    tag: "Heritage",
    title: "Feel Music\nLike Never Before",
    desc: "Celebrate Every Night With Energy",
    detail:
      "Traditional community spirit elevated with modern luxury.",
    name: "Night Queen",
    music: "DJ Folk Mix",
  },
];

const pad = (n) => String(n + 1).padStart(2, "0");

export const Home_ = () => {
  const heroRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5500);

    return () => clearInterval(t);
  }, []);

  const go = (dir) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setCurrent(
      (p) => (p + dir + slides.length) % slides.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const slide = slides[current];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080C18] text-white font-['Cormorant_Garamond']">
      <section
        ref={heroRef}
        className="relative flex min-h-screen"
      >
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
            }}
            style={{
              scale: imageScale,
              backgroundImage: `url(${slide.image})`,
            }}
            className="absolute inset-0 bg-cover bg-center"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-[linear-gradient(105deg,rgba(8,12,24,0.96)_0%,rgba(8,12,24,0.72)_55%,rgba(8,12,24,0.15)_100%)]" />

        {/* Gold Top Border */}
        <div className="absolute left-0 right-0 top-0 h-px bg-[#c49d52]/50" />

        {/* Layout */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-between gap-12 px-6 py-20 lg:px-12">
          {/* LEFT CONTENT */}
          <motion.div
            key={`left-${current}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="max-w-[560px]"
          >
            {/* Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3.5 py-1.5">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52]" />

              <span className="font-['DM_Sans'] text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-7 whitespace-pre-line
            
            text-[clamp(48px,6vw,88px)] font-bold leading-[1] tracking-[-0.01em] text-[#e8c97a]">
              {slide.title}
            </h1>

            {/* Divider */}
            <div className="mb-7 flex items-center gap-3">
              <div className="h-px w-14 bg-[#c49d52]" />

              <span className="text-[10px] tracking-[0.3em] text-[#c49d52]">
                ✦
              </span>

              <div className="h-px w-14 bg-[#c49d52]/35" />
            </div>

            {/* Sub Heading */}
            <h2 className="mb-4 text-[clamp(16px,1.8vw,22px)]
             font-semibold uppercase leading-[1.45] tracking-[0.06em] text-white">
              {slide.desc}
            </h2>

            {/* Description */}
            <p className="mb-10 max-w-[420px]
             font-['DM_Sans'] text-[clamp(14px,1.3vw,16px)] 
             leading-[1.75] text-white/60">
              {slide.detail}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2.5 rounded-[3px] bg-[#c49d52] px-7 py-3.5 font-['DM_Sans'] 
              text-[13px] font-bold uppercase tracking-[0.12em] text-[#0a0e1a] transition-all duration-300 hover:bg-[#ddb86a]">
                Join Our Family

                <ArrowUpRight size={16} />
              </button>

              <button className="inline-flex items-center gap-2 rounded-[3px] border border-white/20 bg-transparent px-6 py-3.5 font-['DM_Sans'] text-[13px] font-medium uppercase tracking-[0.08em] text-white/65 transition-all duration-300 hover:border-white/45 hover:text-white">
                View Events
              </button>
            </div>

            {/* Counter */}
            <div className="mt-12 flex items-center gap-3 font-['DM_Sans']">
              <span className="text-xl font-semibold text-[#c49d52]">
                {pad(current)}
              </span>

              <div className="h-px w-10 bg-white/20" />

              <span className="text-[13px] text-white/35">
                {pad(slides.length - 1)}
              </span>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <div className="relative hidden shrink-0 lg:block">
            {/* PREV */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute left-[-22px] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c49d52] hover:bg-[#c49d52]/25"
            >
              <ChevronLeft size={20} />
            </button>

            {/* CARD */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current}`}
                initial={{
                  opacity: 0,
                  x: 50,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                }}
                className="w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              >
                <div className="relative">
                  <img
                    src={slide.image}
                    alt="Performer"
                    className="block h-[460px] w-full object-cover"
                  />

                  <div className="absolute left-0 right-0 top-0 h-px bg-[#c49d52]/60" />
                </div>

                {/* Footer */}
                <div className="border-t border-[#c49d52]/20 bg-[#080C18]/92 px-6 py-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mb-1 font-['DM_Sans'] text-[11px] uppercase tracking-[0.18em] text-[#c49d52]">
                        Performer
                      </p>

                      <h3 className="text-lg font-bold text-white">
                        {slide.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="mb-1 font-['DM_Sans'] text-[11px] uppercase tracking-[0.18em] text-[#c49d52]">
                        Genre
                      </p>

                      <p className="font-['DM_Sans'] text-sm font-medium text-white/75">
                        {slide.music}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* NEXT */}
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute right-[-22px] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c49d52] hover:bg-[#c49d52]/25"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-4">
          {/* Mobile Prev */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-[3px] rounded-sm transition-all duration-300 ${
                  i === current
                    ? "w-7 bg-[#c49d52]"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Mobile Next */}
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
};