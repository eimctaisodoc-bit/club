import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export const UpcomingEvent = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2027-11-12T08:30:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    return {
      days: Math.max(
        0,
        Math.floor(diff / (1000 * 60 * 60 * 24))
      ),
      hours: Math.max(
        0,
        Math.floor((diff / (1000 * 60 * 60)) % 24)
      ),
      minutes: Math.max(
        0,
        Math.floor((diff / (1000 * 60)) % 60)
      ),
      seconds: Math.max(
        0,
        Math.floor((diff / 1000) % 60)
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-labelledby="event-title"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#020617] via-[#07152e] to-[#0f2d5c] px-4 py-10 font-['DM_Sans']"
    >
      {/* Background Glow */}
      <div className="absolute left-10 top-16 hidden h-32 w-32 rounded-full bg-[#d4af37]/20 blur-3xl md:block"></div>

      <div className="absolute bottom-20 right-10 hidden h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl md:block"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_30%)]"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl overflow-hidden rounded-lg border border-[#d4af37]/20 bg-white/[0.04]  backdrop-blur-2xl">
        {/* Golden Top Border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

        <div className="grid gap-14 p-5 sm:p-8 lg:grid-cols-2 lg:p-14">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="mb-5 inline-flex items-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f5d06f]">
                Premium Night Event
              </div>

              {/* Heading */}
              <h1
                id="event-title"
                className="font-['Cormorant_Garamond'] text-3xl font-semibold leading-tight text-[#e6ae48] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Where Music,
                <br />
                Culture &
                <br />
                Nightlife Unite
              </h1>

              {/* Divider */}
              <div className="mt-6 h-[2px] w-32 bg-gradient-to-r from-[#d4af37] via-[#f5d06f] to-transparent"></div>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
                Experience an unforgettable evening filled with
                live performances, premium entertainment,
                networking, cultural vibes, luxury ambiance,
                and nonstop nightlife energy crafted for
                unforgettable memories.
              </p>

              {/* Features */}
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  "Live DJ & Music Performance",
                  "Luxury Lounge Experience",
                  "Traditional + Modern Vibes",
                  "Food, Drinks & Networking",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-[#d4af37]/15 bg-white/[0.03] px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-[#d4af37]/40 hover:bg-white/[0.05]"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#d4af37]"></div>

                    <p className="text-sm text-slate-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-12">
              <div className="mb-5 flex items-center">
                <h2 className="text-lg font-semibold text-white">
                  Event Starts In
                </h2>

                <div className="ml-4 h-[1px] flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                {[
                  {
                    label: "Days",
                    value: timeLeft.days,
                  },
                  {
                    label: "Hours",
                    value: timeLeft.hours,
                  },
                  {
                    label: "Minutes",
                    value: timeLeft.minutes,
                  },
                  {
                    label: "Seconds",
                    value: timeLeft.seconds,
                  },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex h-[90px] w-[80px] flex-col items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-slate-900/40 backdrop-blur-xl shadow-lg sm:h-[105px] sm:w-[95px] lg:h-[120px] lg:w-[110px]">
                      <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                        {item.value}
                      </h2>

                      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-400 sm:text-sm">
                        {item.label}
                      </p>
                    </div>

                    {index !== 3 && (
                      <span className="hidden text-4xl font-light text-slate-600 sm:block">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center">
            {/* Event Image */}
            <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/20">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop"
                alt="Night Club Event"
                className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[400px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="inline-flex items-center rounded-full border border-[#d4af37]/20 bg-black/30 px-4 py-2 backdrop-blur-md">
                  <span className="mr-2 h-2 w-2 rounded-full bg-[#d4af37]"></span>

                  <span className="text-xs uppercase tracking-[0.2em] text-[#f5d06f]">
                    Limited VIP Entry
                  </span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="mt-10 space-y-6">
              <div className="grid gap-6 border-b border-slate-700/40 pb-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm text-slate-400">
                    Event Date
                  </p>

                  <time
                    dateTime="2027-11-12"
                    className="text-xl font-semibold text-white"
                  >
                    November 12, 2027
                  </time>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-400">
                    Event Time
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    8:30 PM - 2:00 AM
                  </h3>
                </div>
              </div>

              <div className="grid gap-6 border-b border-slate-700/40 pb-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm text-slate-400">
                    VIP Pass
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    $85 / Person
                  </h3>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-400">
                    Standard Entry
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    $50 / Person
                  </h3>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-slate-400">
                  Venue Location
                </p>

                <h3 className="text-xl font-semibold text-white">
                  571 Parkview Drive
                </h3>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                aria-label="Book Event Tickets"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c49d52] to-[#f5d06f] px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#081120] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-[1.02]"
              >
                Book Now

                <ArrowUpRight size={16} />
              </button>

             
            </div>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
      </div>
    </section>
  );
};