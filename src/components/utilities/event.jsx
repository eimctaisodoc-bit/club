import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowUpRight,

} from "lucide-react";

// ─── BACKGROUND COMPONENT: Glowing Galaxy Sky ────────────────────────────────
const GalaxyBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#02040a] bg-[radial-gradient(ellipse_at_top,_#0a1128_0%,_#02040a_100%)]" />

      {/* Nebula Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3b0764] opacity-20 blur-[120px] mix-blend-screen animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#1e3a8a] opacity-20 blur-[150px] mix-blend-screen animate-pulse duration-[8000ms]" />
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#c49d52] opacity-5 blur-[100px] mix-blend-screen" />

      {/* Twinkling Stars */}
      {Array.from({ length: 80 }).map((_, i) => {
        const isGold = i % 5 === 0;
        const size = Math.random() * 2 + 1;
        return (
          <div
            key={i}
            className={`absolute rounded-full ${isGold
              ? "bg-[#fff3b5] shadow-[0_0_8px_1px_#fff3b5]"
              : "bg-white shadow-[0_0_6px_1px_#ffffff]"
              }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        );
      })}
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function UpcomingEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Countdown Logic ---
  const calculateTimeLeft = () => {
    const targetDate = new Date("2027-11-12T20:30:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-labelledby="event-title"
      id="upcoming-event"
      className="relative flex min-h-screen 
      w-full items-center justify-center overflow-hidden px-4 py-20 font-['DM_Sans']"
    >
      <GalaxyBackground />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] overflow-hidden rounded-[4px] border border-[#c49d52]/30 bg-[#080C18]/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Golden Top Border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c49d52] to-transparent" />

        <div className="grid gap-14 p-6 sm:p-10 lg:grid-cols-2 lg:p-16 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-between">
            <header>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-[2px] border border-[#c49d52]/50 bg-[#c49d52]/10 px-3.5 py-1.5 backdrop-blur-sm">
                <span
                  className="mr-2 h-1.5 w-1.5 rounded-full bg-[#c49d52] animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c49d52]">
                  Premium Night Event
                </span>
              </div>

              {/* Heading */}
              <h1
                id="event-title"
                className="font-['Cormorant_Garamond'] text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] tracking-[-0.01em] text-white"
              >
                Where Music,
                <br />
                Culture &
                <br />
                <span className="text-[#e8c97a]">Nightlife Unite</span>
              </h1>

              {/* Divider */}
              <div className="flex items-center gap-3 my-7" aria-hidden="true">
                <div className="h-px w-14 bg-[#c49d52]/50" />
                <span className="text-[10px] tracking-[0.3em] text-[#c49d52]">
                  ✦
                </span>
                <div className="h-px w-14 bg-[#c49d52]/50" />
              </div>

              {/* Description */}
              <p className="max-w-[500px] text-[15px] sm:text-[16px] leading-[1.75] text-white/70">
                Experience an unforgettable evening filled with live
                performances, premium entertainment, cultural vibes, luxury
                ambiance, and nonstop nightlife energy.
              </p>

              {/* Features Grid */}
              <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
                {[
                  "Live DJ & Music",
                  "Luxury Lounge Experience",
                  "Traditional + Modern Vibes",
                  "Food, Drinks & Networking",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-[3px] border border-[#c49d52]/20 bg-white/5 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-[#c49d52]/60 hover:bg-white/10"
                  >
                    <div
                      className="h-1.5 w-1.5 rounded-full bg-[#c49d52]"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] font-medium text-white/90 uppercase tracking-[0.05em]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </header>

            {/* Countdown */}
            <div className="mt-14">



            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center">
            {/* Event Image */}
            <div className="relative overflow-hidden rounded-[3px] border border-[#c49d52]/30 group">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop"
                alt="Night Club Event showing a DJ booth and vibrant lights"
                className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                <div className="inline-flex items-center rounded-[2px] border border-[#c49d52]/40 bg-black/60 px-4 py-2 backdrop-blur-md">
                  <span
                    className="mr-2 h-1.5 w-1.5 rounded-full bg-[#c49d52] animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8c97a]">
                    Limited VIP Tables Available
                  </span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 border-b border-[#c49d52]/20 pb-8">
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#c49d52]">
                  Event Date
                </p>
                <time
                  dateTime="2027-11-12"
                  className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white"
                >
                  November 12, 2027
                </time>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#c49d52]">
                  Time & Venue
                </p>
                <p className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white">
                  8:30 PM • 571 Parkview Dr.
                </p>
              </div>
            </div>

            {/* CTA Booking Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isModalOpen}
                className="group relative inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-[3px] px-8 py-4 font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[0.15em] text-[#02040a] transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(216,166,58,0.25)]"
                style={{
                  background:
                    "linear-gradient(135deg, #fff3b5 0%, #d8a63a 35%, #b67c18 55%, #7a4d0d 100%)",
                }}
              >
                <span className="relative z-10">Reserve Your Table</span>
                <ArrowUpRight
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

//

