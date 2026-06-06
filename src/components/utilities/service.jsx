import { useState } from "react";
import { Music2, Wine, Drum, Sparkles, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: <Music2 size={24} aria-hidden="true" />,
    title: "Live Dohori Music",
    desc: "Authentic Nepali dohori performances blended with modern nightlife energy and live entertainment.",
  },
  {
    icon: <Wine size={24} aria-hidden="true" />,
    title: "Premium Lounge",
    desc: "Luxury seating, premium drinks, ambient lighting, and elite hospitality designed for unforgettable nights.",
  },
  {
    icon: <Drum size={24} aria-hidden="true" />,
    title: "Cultural Events",
    desc: "Traditional dance shows, folk music nights, festive celebrations, and immersive Nepali cultural experiences.",
  },
  {
    icon: <Sparkles size={24} aria-hidden="true" />,
    title: "Private Parties",
    desc: "Birthdays, VIP gatherings, and special occasions with fully customized nightlife experiences.",
  },
];

// ─── COMPONENT: Spinning Border Button ───────────────────────────────────────


// ─── COMPONENT: Service Card ─────────────────────────────────────────────────
function ServiceCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    // SEO FIX: Using <article> inside the list item denotes a self-contained piece of content
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-[1.5px] rounded-2xl h-full transition-transform duration-500 hover:-translate-y-2 group flex flex-col"
    >
      {/* Animated Conic Border */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl z-0 opacity-100 transition-opacity duration-500"
        style={{
          padding: "1.5px",
          background:
            "conic-gradient(from var(--card-angle, 0deg), transparent 0deg, transparent 200deg, rgba(196,157,82,0.1) 260deg, rgba(196,157,82,0.7) 320deg, rgba(232,201,122,1) 346deg, rgba(196,157,82,0.4) 355deg, transparent 360deg)",
          animation: "spinAngle 4.5s linear infinite",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex flex-col h-full rounded-[15px] border border-white/[0.05] p-6 sm:p-7 backdrop-blur-xl transition-colors duration-500 ${
          hovered ? "bg-[#080C18]/80" : "bg-white/[0.03]"
        }`}
      >
        {/* Hover Inner Glow */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[15px] bg-gradient-to-br from-[#c49d52]/15 via-transparent to-[#1e3a8a]/15 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col flex-1">
          <header>
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#c49d52]/30 bg-gradient-to-br from-[#c49d52]/15 to-transparent text-[#c49d52] shrink-0 transition-transform duration-500 group-hover:scale-110">
              {icon}
            </div>

            {/* Title */}
            <h3 className="mt-5 sm:mt-6 font-['Cormorant_Garamond'] text-2xl sm:text-[26px] font-bold text-white tracking-wide">
              {title}
            </h3>
          </header>

          {/* Divider */}
          <div className="mt-4 h-[1px] w-12 bg-[#c49d52]/40 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#c49d52]/70 group-hover:to-transparent" aria-hidden="true" />

          {/* Description */}
          <p className="mt-4 font-['DM_Sans'] text-[14px] sm:text-[15px] leading-[1.7] text-white/65 flex-1 group-hover:text-white/85 transition-colors duration-300">
            {desc}
          </p>

          
        </div>
      </div>
    </article>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function RodhiServices() {
  return (
    <section
      // MOBILE FIRST: Starts with py-16 px-4, scales up to py-32 px-12
      // THEME: Deep navy/black base with a subtle radial glow in the center
      className="relative overflow-hidden bg-[#02040a] bg-[radial-gradient(ellipse_at_center,_#0a1128_0%,_#02040a_80%)] py-16 sm:py-24 lg:py-32 text-white"
      aria-labelledby="services-heading"
      id="services"
    >
      {/* ─── FLASHING STAR SPARKS BACKGROUND ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Generates 40 stars with randomized positions, colors, and animation delays */}
        {Array.from({ length: 40 }).map((_, i) => {
          const isGold = i % 4 === 0;
          return (
            <div
              key={i}
              className={`absolute aspect-square rounded-sm ${
                isGold ? "bg-[#c49d52] shadow-[0_0_12px_2px_#c49d52]" : "bg-white shadow-[0_0_10px_2px_#fff]"
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1.5}px`,
                animation: `sparkle ${1 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          );
        })}
      </div>

      {/* Decorative Blur Orbs for depth */}
      <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#1e3a8a]/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#c49d52]/10 blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* SEO FIX: Use <header> for the section's introduction */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3 py-1.5 backdrop-blur-sm bg-black/40">
            {/* The dot pulses to mimic a flashing club light */}
            <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52] animate-pulse" aria-hidden="true" />
            <span className="font-['DM_Sans'] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
              Premium Services
            </span>
          </div>

          <h2
            id="services-heading"
            // MOBILE FIRST typography clamp
            className="font-['Cormorant_Garamond'] text-[clamp(36px,7vw,64px)] font-bold leading-[1.05] text-white tracking-[-0.01em]"
          >
            Traditional Vibes
            <br />
            <span className="text-[#e8c97a]">Modern Nightlife</span>
          </h2>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3 my-6 sm:my-7" aria-hidden="true">
            <div className="h-px w-10 sm:w-14 bg-[#c49d52]/40" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#c49d52]">✦</span>
            <div className="h-px w-10 sm:w-14 bg-[#c49d52]/40" />
          </div>

          <p className="mx-auto max-w-[500px] font-['DM_Sans'] text-[14px] sm:text-[16px] leading-[1.65] sm:leading-[1.75] text-white/65">
            Authentic dohori music, luxury lounges, and immersive Nepali culture — crafted for unforgettable modern celebrations.
          </p>
        </header>

        {/* SEO FIX: Using an unordered list role="list" for semantic screen-reader indexing */}
        <ul 
          className="mt-12 sm:mt-20 lg:mt-24 grid gap-5 sm:gap-6 lg:gap-8 items-stretch grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" 
          role="list"
        >
          {services.map((service, i) => (
            <li key={i} className="flex h-full">
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      </div>

      {/* Global Section Keyframes */}
      <style>{`
        /* Registers custom CSS properties for the spinning border gradient */
        @property --card-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @property --btn-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spinAngle {
          to {
            --card-angle: 360deg;
            --btn-angle: 360deg;
          }
        }
        /* Sparkle animation: scales from 0 to 1 while rotating 45deg to create a diamond spark */
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(45deg); }
          100% { opacity: 0; transform: scale(0) rotate(90deg); }
        }
      `}</style>
    </section>
  );
}