import React, { useRef, useState, useEffect, useCallback, memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// ─── PERFORMANCE FIX 1: Images as public paths ───────────────
const imageMap = import.meta.glob(
  "../../assets/*.{jpg,jpeg,webp,png}",
  { eager: true, import: "default" }
);

const img = (name) => imageMap[`../../assets/${name}`] ?? "";

const slides = [
  { image: img("1.jpg"), tag: "Welcome",            title: "Top Durbar\nRodhi Club",      desc: "Keep Our Traditional Alive Through Music And Unity",       detail: "Experience comfort, elegance, and tradition in the heart of our community.", name: "Randi Dancer",  music: "Traditional Dohori" },
  { image: img("2.jpg"), tag: "Live Performance",  title: "Feel The Real\nNepali Vibes",  desc: "Celebrate Music, Culture And Entertainment",               detail: "Traditional Rodhi experience blended with modern nightlife energy.",         name: "Sarina Artist", music: "Folk Remix"         },
  { image: img("3.jpg"), tag: "Traditional Nights",title: "Music That\nConnects Hearts",  desc: "Feel Unity Through Dance And Melody",                      detail: "A premium Rodhi club experience full of energy and culture.",              name: "Nepali Queen",  music: "Club Dohori"        },
  { image: img("4.jpg"), tag: "Celebration",       title: "Tradition\nMeets Luxury",      desc: "Experience Music Beyond Imagination",                      detail: "Dance, celebrate and enjoy premium hospitality every night.",              name: "Club Dancer",   music: "Modern Folk"        },
  { image: img("5.jpg"), tag: "Exclusive Events",  title: "Where Culture\nComes Alive",    desc: "Traditional Music With Club Experience",                   detail: "Elegant atmosphere with live entertainment every single night.",           name: "Rodhi Star",    music: "Live Performance"   },
  { image: img("6.jpg"), tag: "Heritage",          title: "Feel Music\nLike Never Before", desc: "Celebrate Every Night With Energy",                        detail: "Traditional community spirit elevated with modern luxury.",                name: "Night Queen",   music: "DJ Folk Mix"        },
];

const pad = (n) => String(n + 1).padStart(2, "0");

// ─── PERFORMANCE FIX 2: Preload ────────────────────
const preloadImages = () => {
  slides.forEach((slide, i) => {
    const link = document.createElement("link");
    link.rel = i === 0 ? "preload" : "prefetch";
    link.as = "image";
    link.href = slide.image;
    document.head.appendChild(link);
  });
};

// ─── PERFORMANCE FIX 3: Memoized slide dots ────────────────
const SlideDots = memo(({ total, current, onSelect }) => (
  <div className="flex gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Go to slide ${i + 1}`}
        aria-current={i === current ? "true" : undefined}
        className={`h-[3px] rounded-sm transition-all duration-300 ${
          i === current ? "w-7 bg-[#c49d52]" : "w-2 bg-white/30"
        }`}
      />
    ))}
  </div>
));
SlideDots.displayName = "SlideDots";

// ─── PERFORMANCE FIX 4: Memoized nav button ────────────────
const NavBtn = memo(({ onClick, label, children, className }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={className}
  >
    {children}
  </button>
));
NavBtn.displayName = "NavBtn";

// ─── PERFORMANCE FIX 5: Separate card component ────────
const PerformerCard = memo(({ slide, onPrev, onNext }) => (
  <div className="relative hidden shrink-0 lg:block">
    <NavBtn
      onClick={onPrev}
      label="Previous slide"
      className="absolute left-[-22px] cursor-pointer top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c49d52] hover:bg-[#c49d52]/25"
    >
      <ChevronLeft size={20} aria-hidden="true" />
    </NavBtn>

    <AnimatePresence mode="wait">
      <m.div
        key={`card-${slide.image}`}
        initial={{ opacity: 0, x: 50, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -30, scale: 0.97 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <div className="relative">
          <img
            src={slide.image}
            alt={`${slide.name} performing ${slide.music}`}
            width="360"
            height="460"
            loading="lazy"
            decoding="async"
            className="block h-[460px] w-full object-cover"
          />
          <div className="absolute left-0 right-0 top-0 h-px bg-[#c49d52]/60" />
        </div>

        <div className="border-t border-[#c49d52]/20 bg-[#080C18]/92 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 font-['DM_Sans'] text-[11px] uppercase tracking-[0.18em] text-[#c49d52]">Performer</p>
              <h3 className="text-lg font-bold text-white">{slide.name}</h3>
            </div>
            <div className="text-right">
              <p className="mb-1 font-['DM_Sans'] text-[11px] uppercase tracking-[0.18em] text-[#c49d52]">Genre</p>
              <p className="font-['DM_Sans'] text-sm font-medium text-white/75">{slide.music}</p>
            </div>
          </div>
        </div>
      </m.div>
    </AnimatePresence>

    <NavBtn
      onClick={onNext}
      label="Next slide"
      className="absolute right-[-22px] cursor-pointer top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c49d52] hover:bg-[#c49d52]/25"
    >
      <ChevronRight size={20} aria-hidden="true" />
    </NavBtn>
  </div>
));
PerformerCard.displayName = "PerformerCard";

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Home_ = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => { preloadImages(); }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5500);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const go = useCallback((dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((p) => (p + dir + slides.length) % slides.length);
    resetTimer();
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, resetTimer]);

  const goTo = useCallback((i) => {
    if (isAnimating || i === current) return;
    setIsAnimating(true);
    setCurrent(i);
    resetTimer();
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, current, resetTimer]);

  const goPrev = useCallback(() => go(-1), [go]);
  const goNext = useCallback(() => go(1), [go]);

  const slide = slides[current];

  return (
    <LazyMotion features={domAnimation} strict>
      <main
        className="min-h-screen overflow-hidden bg-[#080C18] text-white font-['Cormorant_Garamond']"
        aria-label="Hero section"
        id="home"
      >
        <section
          /* RESPONSIVE FIX: Used 100dvh for mobile toolbars */
          className="relative flex min-h-[100dvh]" 
          aria-roledescription="carousel"
          aria-label="Featured performers"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1100ms] ease-in-out"
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={slide.tag}
          />

          {/* Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-[linear-gradient(105deg,rgba(8,12,24,0.96)_0%,rgba(8,12,24,0.85)_50%,rgba(8,12,24,0.25)_100%)] lg:bg-[linear-gradient(105deg,rgba(8,12,24,0.96)_0%,rgba(8,12,24,0.72)_55%,rgba(8,12,24,0.15)_100%)]" />

          {/* Gold Top Border */}
          <div className="absolute left-0 right-0 top-0 h-px bg-[#c49d52]/50" aria-hidden="true" />

          {/* Layout - added pb-28 to clear absolute bottom controls on mobile */}
          <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1280px] items-center justify-between gap-12 px-6 pt-24 pb-28 lg:px-12 lg:py-20">

            {/* LEFT CONTENT */}
            <AnimatePresence mode="wait">
              <m.div
                key={`left-${current}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="w-full max-w-[600px] lg:max-w-[560px]"
              >
                {/* Tag */}
                <div
                  className="mb-5 inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3 py-1.5 md:mb-6 md:px-3.5"
                  aria-label={`Category: ${slide.tag}`}
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52]" aria-hidden="true" />
                  <span className="font-['DM_Sans'] text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
                    {slide.tag}
                  </span>
                </div>

                {/* RESPONSIVE FIX: Tweaked clamp minimums so it doesn't break on extremely narrow phones */}
                <h1 className="mb-6 whitespace-pre-line text-[clamp(40px,9vw,88px)] font-bold leading-[1.05] tracking-[-0.01em] text-[#e8c97a]">
                  {slide.title}
                </h1>

                {/* Divider */}
                <div className="mb-6 flex items-center gap-3" aria-hidden="true">
                  <div className="h-px w-10 md:w-14 bg-[#c49d52]" />
                  <span className="text-[10px] tracking-[0.3em] text-[#c49d52]">✦</span>
                  <div className="h-px w-10 md:w-14 bg-[#c49d52]/35" />
                </div>

                <h2 className="mb-4 text-[clamp(15px,2.5vw,22px)] font-semibold uppercase leading-[1.45] tracking-[0.06em] text-white">
                  {slide.desc}
                </h2>

                <p className="mb-8 max-w-[420px] font-['DM_Sans'] text-[clamp(14px,1.5vw,16px)] leading-[1.65] md:leading-[1.75] text-white/60">
                  {slide.detail}
                </p>

                {/* RESPONSIVE FIX: Mobile Performer Details
                    Since the right-side card is hidden on mobile, this ensures mobile users still see the performer info. */}
                <div className="mb-8 flex items-center justify-between border-y border-white/10 py-3 lg:hidden font-['DM_Sans']">
                  <div>
                    <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-[#c49d52]">Performer</p>
                    <p className="text-base font-bold text-white">{slide.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-[#c49d52]">Genre</p>
                    <p className="text-sm font-medium text-white/75">{slide.music}</p>
                  </div>
                </div>

                {/* RESPONSIVE FIX: Full-width stacked buttons on mobile, inline on sm+ */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    to="/book-now"
                    className="inline-flex w-full sm:w-auto justify-center cursor-pointer items-center gap-2.5 rounded-[3px] bg-[#c49d52] px-7 py-3.5 md:py-4 font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[0.12em] text-[#0a0e1a] transition-all duration-300 hover:bg-[#ddb86a]"
                  >
                    Join Our Family
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>

                  <Link
                    to="/events"
                    className="inline-flex w-full sm:w-auto justify-center cursor-pointer items-center gap-2 rounded-[3px] border border-white/20 bg-transparent px-6 py-3.5 md:py-4 font-['DM_Sans'] text-[13px] font-medium uppercase tracking-[0.08em] text-white/65 transition-all duration-300 hover:border-white/45 hover:text-white"
                  >
                    View Events
                  </Link>
                </div>

                {/* Counter */}
                <div className="mt-10 md:mt-12 flex items-center gap-3 font-['DM_Sans']" aria-label={`Slide ${current + 1} of ${slides.length}`}>
                  <span className="text-xl font-semibold text-[#c49d52]">{pad(current)}</span>
                  <div className="h-px w-10 bg-white/20" aria-hidden="true" />
                  <span className="text-[13px] text-white/35">{pad(slides.length - 1)}</span>
                </div>
              </m.div>
            </AnimatePresence>

            {/* RIGHT CARD — Only visible on Large screens (lg+) */}
            <PerformerCard slide={slide} onPrev={goPrev} onNext={goNext} />
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-4">
            <NavBtn
              onClick={goPrev}
              label="Previous"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </NavBtn>

            <SlideDots total={slides.length} current={current} onSelect={goTo} />

            <NavBtn
              onClick={goNext}
              label="Next"
              className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </NavBtn>
          </div>
        </section>
      </main>
    </LazyMotion>
  );
};

export default memo(Home_);