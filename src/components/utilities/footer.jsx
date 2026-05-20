import React from "react";
import { MailCheck, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedBorder } from "./animatedBorder";
import { RotatingTriangle } from "./triangle";
import logo from '../../assets/logo.png';
import modal1 from "../../assets/modal1.jpg";
import modal2 from "../../assets/modal2.jpg";
import modal3 from "../../assets/modal3.jpg";

const instagramFeeds = [
  { img: modal1 },
  { img: modal2 },
  { img: modal3 },
  { img: modal1 },
  { img: modal2 },
  { img: modal3 },
];

const FacebookSvg = ({ className = "h-6 w-6" }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M15.12 8.03H13.2c-.67 0-.8.32-.8.79v1.04h2.67l-.35 2.7H12.4V19.5H9.62v-6.94H7.3v-2.7h2.32v-1.2c0-2.3 1.4-3.56 3.46-3.56.99 0 1.84.08 2.09.11v2.42l-.05.4Z" />
    </svg>
  );
};

const InstagramSvg = ({ className = "h-6 w-6" }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </svg>
  );
};

const YoutubeSvg = ({ className = "h-7 w-7" }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.7 28.7 0 0 0 1.96 12a28.7 28.7 0 0 0 .46 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.7 28.7 0 0 0 22.04 12a28.7 28.7 0 0 0-.46-4.81ZM9.96 15.27V8.73L15.43 12l-5.47 3.27Z" />
    </svg>
  );
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(145deg,#061022_0%,#0b1838_45%,#13214f_100%)] text-white">
      {/* Right Glow Line */}
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d4af37] via-[#f5c546] to-[#d4af37]" />

      {/* Subscribe Top Box */}
          <div className="pointer-events-none absolute  right-44 top-0
         ">
           <RotatingTriangle />
          </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-12  sm:px-10">
      
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
        {/* Logo / About */}
        <div>
          <div className="mb-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
              Top Durbar Rodhi <span className="text-[#d4af37]">Club</span>
            </h2>

            <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-white/70">
              Set Yourself Free
            </p>
          </div>

          <p className="max-w-xs text-[15px] leading-7 text-slate-400">
            We try to give our best Hospitality and Entertainment to our Guests.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to="https://www.facebook.com/durbarrodhigharbishowjyotimall4thmall/about"
              className="grid h-12 w-12 place-items-center rounded-md border border-[#d4af37]/40 bg-white/5 text-[#d4af37] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 hover:text-[#d4af37]"
            >
              <FacebookSvg className="h-6 w-6" />
            </Link>

            <Link
              to="#"
              className="grid h-12 w-12 place-items-center rounded-md border border-[#d4af37]/40 bg-white/5 text-[#d4af37] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 hover:text-[#d4af37]"
            >
              <InstagramSvg className="h-6 w-6" />
            </Link>

            <Link
              to="https://www.youtube.com/@rockonmusic"
              className="grid h-12 w-12 place-items-center rounded-md border border-[#d4af37]/40 bg-white/5 text-[#d4af37] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 hover:text-[#d4af37]"
            >
              <YoutubeSvg className="h-7 w-7" />
            </Link>
          </div>
        </div>

        {/* Instagram Feeds */}
        <div>
          <FooterTitle title="Facebook Gallery" />

          <div className="mt-10 grid max-w-[260px] grid-cols-3 gap-3">
            {instagramFeeds.map((img, index) => (
              <div
                key={index}
                className="group h-[78px] overflow-hidden rounded-sm bg-white/10"
              >
                <img
                  src={img.img}
                  alt={`Instagram Feed ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Get In Touch */}
        <div>
          <FooterTitle title="Get In Touch" />

          <div className="mt-10 space-y-6 text-slate-400">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-[#d4af37]" size={25} />
              <div>
                <h4 className="font-semibold text-slate-300">Address</h4>
                <p className="mt-1 leading-6">
                  Jamal, 4th Floor of Bishwojyoti Mall,
                  <br />
                  Kathmandu, Nepal, 44600
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-1 shrink-0 text-[#d4af37]" size={23} />
              <div>
                <h4 className="font-semibold text-slate-300">Call Us</h4>
                <div className="mt-1 leading-6 space-y-1">
                  <Link
                    to="tel:+9779851090035"
                    className="inline-block text-slate-400 transition hover:text-white hover:underline"
                  >
                    +977 985-1090035
                  </Link>
                  <br />
                  <Link
                    to="tel:+9779708835635"
                    className="inline-block text-slate-400 transition hover:text-white hover:underline"
                  >
                    +977 970-8835635
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MailCheck className="mt-1 shrink-0 text-[#d4af37]" size={23} />
              <div>
                <h4 className="font-semibold text-slate-300">Email</h4>
                <Link
                  to="mailto:ashokgiri123@gmail.com"
                  className="mt-1 inline-block leading-6 text-slate-400 transition hover:text-white hover:underline"
                >
                  ashokgiri123@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <FooterTitle title="Opening Hours" />

          <div className="mt-10 space-y-3 text-[15px] text-slate-400">
            <div className="flex justify-between gap-6">
              <span>Monday</span>
              <span>09:00PM - 02:00 AM</span>
            </div>

            <div className="flex justify-between gap-6">
              <span>Friday</span>
              <span>09:00PM - 03:00 AM</span>
            </div>

            <div className="flex justify-between gap-6">
              <span>Saturday</span>
              <span>09:00PM - 04:00 AM</span>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-[#d4af37]/40 bg-white/5 px-5 py-5 text-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <p className="text-base font-semibold text-white">
              Every Sunday Happy Hour
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              07:00PM - 03:00AM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 px-6 py-5 text-center">
        <p className="text-sm text-slate-500">
          Copyright © 2026 RockOn. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

const FooterTitle = ({ title }) => {
  return (
    <div>
      <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
      <div className="mt-3 h-[2px] w-[100px] bg-gradient-to-r from-[#d4af37] to-[#f5c546]" />
    </div>
  );
};