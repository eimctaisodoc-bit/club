import React from "react";
import { MailCheck, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { RotatingTriangle } from "./triangle"; // Assumes you still have this component
import logo from '../../assets/logo.png';
import modal1 from "../../assets/modal1.jpg";
import modal2 from "../../assets/modal2.jpg";
import modal3 from "../../assets/modal3.jpg";

const instagramFeeds = [
  { img: modal1, alt: "Club Night Crowd" },
  { img: modal2, alt: "Live DJ Performance" },
  { img: modal3, alt: "VIP Lounge Area" },
  { img: modal1, alt: "Signature Cocktails" },
  { img: modal2, alt: "Cultural Dance" },
  { img: modal3, alt: "Durbar Rodhi Interior" },
];

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const FacebookSvg = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M15.12 8.03H13.2c-.67 0-.8.32-.8.79v1.04h2.67l-.35 2.7H12.4V19.5H9.62v-6.94H7.3v-2.7h2.32v-1.2c0-2.3 1.4-3.56 3.46-3.56.99 0 1.84.08 2.09.11v2.42l-.05.4Z" />
  </svg>
);

const InstagramSvg = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
  </svg>
);

const YoutubeSvg = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.7 28.7 0 0 0 1.96 12a28.7 28.7 0 0 0 .46 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.7 28.7 0 0 0 22.04 12a28.7 28.7 0 0 0-.46-4.81ZM9.96 15.27V8.73L15.43 12l-5.47 3.27Z" />
  </svg>
);

// ─── REUSABLE TITLE COMPONENT ────────────────────────────────────────────────
const FooterTitle = ({ title }) => (
  <div className="mb-8">
    <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white tracking-wide">{title}</h3>
    <div className="mt-3 flex items-center gap-2" aria-hidden="true">
      <div className="h-[1.5px] w-8 bg-[#c49d52]" />
      <span className="text-[8px] text-[#c49d52]">✦</span>
      <div className="h-[1.5px] w-16 bg-[#c49d52]/30" />
    </div>
  </div>
);

// ─── MAIN FOOTER COMPONENT ───────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#02040a] font-['DM_Sans'] text-white"
    id="footer"
    >
      
      {/* ─── THEME BACKGROUND GLOWS ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0a1128_0%,_#02040a_80%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#1e3a8a]/10 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#c49d52]/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Decorative Gold Top Border */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#c49d52]/50 to-transparent" aria-hidden="true" />

      {/* Decorative Rotating Background Element */}
      <div className="pointer-events-none absolute right-10 top-20 opacity-20 sm:right-44">
        <RotatingTriangle />
      </div>

      {/* ─── MAIN CONTENT GRID (Mobile First Layout) ─── */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-14 lg:py-24">
        
        {/* 1. Logo & About */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold leading-tight text-white">
              Top Durbar Rodhi <span className="text-[#c49d52]">Club</span>
            </h2>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c49d52]">
              Set Yourself Free
            </p>
          </div>

          <p className="max-w-[280px] text-[14px] leading-[1.8] text-white/60">
            Experience authentic nightlife hospitality, where premium entertainment and traditional vibes meet.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              to="https://www.facebook.com/durbarrodhigharbishowjyotimall4thmall/about"
              aria-label="Visit our Facebook page"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#c49d52]/30 bg-black/40 text-[#c49d52] transition-all duration-300 hover:-translate-y-1 hover:border-[#c49d52] hover:bg-[#c49d52]/10 hover:shadow-[0_0_15px_rgba(196,157,82,0.2)]"
            >
              <FacebookSvg />
            </Link>

            <Link
              to="#"
              aria-label="Visit our Instagram page"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#c49d52]/30 bg-black/40 text-[#c49d52] transition-all duration-300 hover:-translate-y-1 hover:border-[#c49d52] hover:bg-[#c49d52]/10 hover:shadow-[0_0_15px_rgba(196,157,82,0.2)]"
            >
              <InstagramSvg />
            </Link>

            <Link
              to="https://www.youtube.com/@rockonmusic"
              aria-label="Visit our YouTube channel"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#c49d52]/30 bg-black/40 text-[#c49d52] transition-all duration-300 hover:-translate-y-1 hover:border-[#c49d52] hover:bg-[#c49d52]/10 hover:shadow-[0_0_15px_rgba(196,157,82,0.2)]"
            >
              <YoutubeSvg />
            </Link>
          </div>
        </div>

        {/* 2. Gallery Feed */}
        <div>
          <FooterTitle title="Club Gallery" />
          {/* SEO: Using unordered list for gallery items */}
          <ul className="grid max-w-[280px] grid-cols-3 gap-2 sm:gap-3" role="list">
            {instagramFeeds.map((feed, index) => (
              <li key={index} className="group aspect-square overflow-hidden rounded-[2px] bg-white/5 relative border border-white/5">
                <img
                  src={feed.img}
                  alt={feed.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#080C18]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Get In Touch (SEO Semantic Address) */}
        <div>
          <FooterTitle title="Get In Touch" />
          <address className="not-italic space-y-6 text-[14px]">
            {/* Address */}
            <div className="flex items-start gap-4 group">
              <div className="mt-1 flex shrink-0 items-center justify-center rounded-full bg-[#c49d52]/10 p-2 text-[#c49d52] transition-colors group-hover:bg-[#c49d52] group-hover:text-[#02040a]">
                <MapPin size={16} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-white tracking-wide mb-1">Location</h4>
                <p className="leading-relaxed text-white/60">
                  Jamal, 4th Floor Bishwojyoti Mall,<br />
                  Kathmandu, Nepal, 44600
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 group">
              <div className="mt-1 flex shrink-0 items-center justify-center rounded-full bg-[#c49d52]/10 p-2 text-[#c49d52] transition-colors group-hover:bg-[#c49d52] group-hover:text-[#02040a]">
                <Phone size={16} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-white tracking-wide mb-1">Reservations</h4>
                <div className="flex flex-col space-y-1">
                  <Link to="tel:+9779851090035" className="text-white/60 transition-colors hover:text-[#c49d52]">
                    +977 985-1090035
                  </Link>
                  <Link to="tel:+9779708835635" className="text-white/60 transition-colors hover:text-[#c49d52]">
                    +977 970-8835635
                  </Link>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="mt-1 flex shrink-0 items-center justify-center rounded-full bg-[#c49d52]/10 p-2 text-[#c49d52] transition-colors group-hover:bg-[#c49d52] group-hover:text-[#02040a]">
                <MailCheck size={16} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-white tracking-wide mb-1">Email Us</h4>
                <Link to="mailto:ashokgiri123@gmail.com" className="text-white/60 transition-colors hover:text-[#c49d52]">
                  ashokgiri123@gmail.com
                </Link>
              </div>
            </div>
          </address>
        </div>

        {/* 4. Opening Hours */}
        <div>
          <FooterTitle title="Opening Hours" />
          <ul className="space-y-3 text-[14px] text-white/60" role="list">
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Sunday</span>
              <time dateTime="21:00-02:00">08:30 PM - 04:00 AM</time>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Monday</span>
              <time dateTime="21:00-03:00">08:30 PM - 04:00 AM</time>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Tuesday</span>
              <time dateTime="21:00-04:00">08:30 PM - 04:00 AM</time>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Wednesday</span>
              <time dateTime="21:00-04:00">08:30 PM - 04:00 AM</time>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Thrusday</span>
              <time dateTime="21:00-04:00">08:30 PM - 04:00 AM</time>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Friday</span>
              <time dateTime="21:00-04:00">08:30 PM - 04:00 AM</time>
            </li>
            <li className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-medium">Saturday</span>
              <time dateTime="21:00-04:00">08:30 PM - 04:00 AM</time>
            </li>
          </ul>

          {/* Highlight Box */}
          <div className="mt-6 rounded-[3px] border border-[#c49d52]/30 bg-gradient-to-br from-[#0a1128] to-[#02040a] px-5 py-5 text-center shadow-[0_0_20px_rgba(196,157,82,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#c49d52]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#c49d52]">
              Every Sunday Happy Hour
            </p>
            <time dateTime="19:00-03:00" className="mt-1 block font-['Cormorant_Garamond'] text-xl font-bold text-white">
              07:00 PM - 03:00 AM
            </time>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR & HIDDEN ADMIN LINK ─── */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 px-6 py-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <p className="text-[12px] text-white/40 tracking-wider">
            Copyright © {new Date().getFullYear()} RockOn. All Rights Reserved.
          </p>

          {/* 
            HIDDEN ADMIN LINK:
            Appears as a tiny faint dot. Hovering over the invisible container area 
            expands the dot and reveals the text.
          */}
          <div className="group relative flex cursor-pointer items-center justify-end h-6 w-24">
  <Link 
    to="/ab" 
    aria-label="Admin Portal" 
    className="flex items-center gap-2 outline-none"
  >
    {/* Text: slides in and fades in on hover */}
    <span className="text-[16px] font-bold uppercase tracking-[0.2em] text-[#c49d52] opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
      Admin
    </span>
    
    {/* ─── PINGING DOT CONTAINER ─── */}
    <span className="relative flex h-2 w-2 items-center justify-center">
      {/* 1. The expanding wave (ping) */}
      <span 
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c49d52] opacity-75 duration-[2000ms]" 
        aria-hidden="true" 
      />
      {/* 2. The solid core dot (always visible) */}
      <span 
        className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c49d52] shadow-[0_0_8px_#c49d52]" 
        aria-hidden="true" 
      />
    </span>
    
  </Link>
</div>
        </div>
      </div>
    </footer>
  );
}