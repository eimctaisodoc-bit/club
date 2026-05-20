import { useState } from "react";
import { Music2, Wine, Drum, Sparkles, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: <Music2 size={24} />,
    title: "Live Dohori Music",
    desc: "Authentic Nepali dohori performances blended with modern nightlife energy and live entertainment.",
  },
  {
    icon: <Wine size={24} />,
    title: "Premium Lounge",
    desc: "Luxury seating, premium drinks, ambient lighting, and elite hospitality designed for unforgettable nights.",
  },
  {
    icon: <Drum size={24} />,
    title: "Cultural Events",
    desc: "Traditional dance shows, folk music nights, festive celebrations, and immersive Nepali cultural experiences.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Private Parties",
    desc: "Birthdays, VIP gatherings, and special occasions with fully customized nightlife experiences.",
  },
];

function SpinningBorderButton({ children }) {
  return (
    <button className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden">
      {/* spinning conic border — sits behind label via z-index */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from var(--btn-angle, 0deg), transparent 0deg, transparent 280deg, rgba(212,175,55,0.25) 310deg, rgba(255,255,255,0.9) 348deg, transparent 360deg)",
          animation: "spinAngle 3.5s linear infinite",
        }}
      />
      {/* solid inner fill — masks the conic centre so only border shows */}
      <span className="absolute inset-[1.5px] rounded-full bg-gradient-to-br from-slate-950 via-[#162033] to-slate-800 z-10" />
      {/* label on top */}
      <span className="relative z-20 flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase text-white rounded-full whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}



export function ServiceCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-[1.5px] rounded-[22px] h-full transition-transform duration-500 hover:-translate-y-2"
    >
      {/* Animated Border Only */}
      <span
        className="pointer-events-none absolute inset-0 rounded-lg z-0"
        style={{
          padding: "1.5px", // This controls the thickness of the animated border
          background:
            "conic-gradient(from var(--card-angle, 0deg), transparent 0deg, transparent 200deg, rgba(212,175,55,0.15) 260deg, rgba(212,175,55,0.75) 320deg, rgba(255,255,255,0.95) 346deg, rgba(212,175,55,0.4) 355deg, transparent 360deg)",
          animation: "spinAngle 4s linear infinite",
          // The magic happens here: this masks out the inner content area
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        className={`relative z-10 flex flex-col h-full rounded-lg border border-white/[0.07] p-6 backdrop-blur-xl transition-colors duration-500 ${
          hovered ? "bg-white/[0.07]" : "bg-white/[0.03]"
        }`}
      >
        {/* Hover glow — purely cosmetic, pointer-events-none */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-[#d4af37]/5 via-transparent to-cyan-500/5 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 flex flex-col flex-1">
          {/* Icon */}
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/10 to-white/5 text-[#f5d06f] shrink-0">
            {icon}
          </div>

          {/* Title */}
          <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>

          {/* Divider */}
          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#d4af37]/40 to-transparent" />

          {/* Description — flex-1 pushes button to bottom */}
          <p className="mt-4 text-sm leading-7 text-slate-400 flex-1">{desc}</p>

          {/* CTA Button — always at the bottom */}
          <div className="mt-7">
            {/* Replace with your actual SpinningBorderButton component */}
            <button className="flex items-center gap-2 text-white">
              Explore <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RodhiServices() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#07152e] to-[#0f2d5c] py-20 sm:py-28 text-white"
      aria-labelledby="rodhi-heading"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 7}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5d06f] backdrop-blur-md">
            Premium Rodhi Club Services
          </p>

          <h2
            id="rodhi-heading"
            className="font-serif text-4xl font-semibold leading-tight text-[#f5d06f] sm:text-5xl lg:text-6xl"
          >
            Traditional Vibes
            <br />
            Modern Nightlife
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          <p className="mt-6 text-sm leading-7 text-slate-300 sm:text-base">
            Authentic dohori music, luxury lounges, and immersive Nepali
            culture — crafted for unforgettable modern celebrations.
          </p>
        </header>

        {/* Grid — items-stretch ensures equal card heights per row */}
        <ul className="mt-16 grid gap-6 items-stretch sm:grid-cols-2 xl:grid-cols-4" role="list">
          {services.map((service, i) => (
            <li key={i} className="flex">
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      </div>

      {/* Keyframes */}
      <style>{`
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}