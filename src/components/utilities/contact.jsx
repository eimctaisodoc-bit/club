import React, { memo } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Music,
  Users,
  ArrowUpRight
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const attractions = [
  {
    icon: <Music size={20} aria-hidden="true" />,
    title: "Live DJ Nights",
    desc: "Enjoy electrifying DJ performances, immersive lighting, and premium sound systems every weekend in Kathmandu.",
  },
  {
    icon: <Sparkles size={20} aria-hidden="true" />,
    title: "Luxury Atmosphere",
    desc: "Elegant navy interiors, VIP lounge seating, and modern nightlife aesthetics crafted for unforgettable evenings.",
  },
  {
    icon: <Users size={20} aria-hidden="true" />,
    title: "Private Events",
    desc: "Host birthdays, corporate parties, and exclusive celebrations with personalized entertainment and premium hospitality.",
  },
];

const team = [
  { role: "Founder", name: "Ashok", image: "https://i.pravatar.cc/150?img=11" },
  { role: "CEO", name: "Dipak Khadka", image: "https://i.pravatar.cc/150?img=14" },
  { role: "Managing Director", name: "Bikash Thapa", image: "https://i.pravatar.cc/150?img=13" },
  { role: "Manager", name: "Rajan Giri", image: "https://i.pravatar.cc/150?img=15" },
];

const hours = [
  { day: "Monday", time: "09:00 PM – 02:00 AM", iso: "21:00-02:00" },
  { day: "Friday", time: "09:00 PM – 03:00 AM", iso: "21:00-03:00" },
  { day: "Saturday", time: "09:00 PM – 04:00 AM", iso: "21:00-04:00" },
];

// ─── COMPONENT: Team Avatar ──────────────────────────────────────────────────
const TeamAvatar = memo(({ name, role, image }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-5 h-24 w-24 shrink-0 sm:h-28 sm:w-28">
      {/* Animated Golden Border Ring */}
      <div 
        className="absolute -inset-1.5 rounded-full border-[3px] border-t-[#c49d52] border-r-[#c49d52]/60 border-b-[#c49d52]/10 border-l-[#c49d52]/60 animate-[spin_4s_linear_infinite] shadow-[0_0_15px_rgba(196,157,82,0.3)]" 
        aria-hidden="true" 
      />
      
      {/* Image Container */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-full bg-[#0a1128]">
        <img
          src={image}
          alt={`Profile photo of ${name}, ${role}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
        />
      </div>
      
      {/* Inner Shadow Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]" aria-hidden="true" />
    </div>

    <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-[26px] font-bold text-white mb-1">
      {name}
    </h3>
    <p className="font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c49d52]">
      {role}
    </p>
  </div>
));
TeamAvatar.displayName = "TeamAvatar";

// ─── COMPONENT: Info Block ───────────────────────────────────────────────────
const InfoBlock = ({ icon, title, children }) => (
  <div className="rounded-[3px] border border-[#c49d52]/20 bg-[#080C18]/60 p-5 backdrop-blur-xl transition-colors hover:bg-[#0a1128]/80">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#c49d52]/30 bg-gradient-to-br from-[#c49d52]/10 to-transparent text-[#c49d52]">
        {icon}
      </div>
      <h3 className="font-['DM_Sans'] text-sm font-semibold uppercase tracking-[0.15em] text-[#c49d52]">
        {title}
      </h3>
    </div>
    <div className="font-['DM_Sans'] text-[14px] leading-relaxed text-white/70">
      {children}
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ContactSection() {
  return (
    <section
      aria-labelledby="club-info-heading"
      className="relative w-full overflow-hidden bg-[#02040a] font-['DM_Sans'] text-white"
  id="contact"
  >
      {/* ─── THEME BACKGROUND GLOWS ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0a1128_0%,_#02040a_80%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#1e3a8a]/10 blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#c49d52]/5 blur-[120px] pointer-events-none" aria-hidden="true" />

      {/* Decorative Gold Top Border */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#c49d52]/50 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px]">
        
        {/* ─── HERO ─── */}
        <header className="px-5 py-16 md:px-10 lg:px-14 lg:py-24 text-center sm:text-left">
          <div className="max-w-4xl mx-auto sm:mx-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3.5 py-1.5 backdrop-blur-sm bg-black/20">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
                Kathmandu Premium Nightlife
              </span>
            </div>

            <h1 
              id="club-info-heading"
              className="font-['Cormorant_Garamond'] text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-0.01em] text-white"
            >
              Experience Luxury Nightlife &<br />
              <span className="text-[#e8c97a]">Premium DJ Entertainment</span>
            </h1>

            <div className="my-8 flex items-center justify-center sm:justify-start gap-3" aria-hidden="true">
              <div className="h-px w-14 bg-[#c49d52]/40" />
              <span className="text-[10px] tracking-[0.3em] text-[#c49d52]">✦</span>
              <div className="h-px w-14 bg-[#c49d52]/40" />
            </div>

            <p className="max-w-2xl text-[15px] sm:text-[16px] leading-[1.75] text-white/60 mx-auto sm:mx-0">
              Discover one of Kathmandu’s top nightlife destinations in Jamal featuring live DJs, VIP seating, luxury ambience, signature cocktails, and unforgettable party experiences.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-4">
              <button
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[3px] px-8 
                py-3.5 text-[13px] font-bold uppercase tracking-[0.15em] text-white cursor-pointer transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #fff3b5 0%, #d8a63a 35%, #b67c18 55%, #7a4d0d 100%)" }}
            onClick={() => window.scrollTo({ top: document.getElementById("event").offsetTop, behavior: "smooth" })}
            >
                Reserve  Table
              </button>

            
            </div>
          </div>
        </header>

        {/* ─── ATTRACTIONS ─── */}
        <div className="px-5 pb-16 md:px-10 lg:px-14">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,44px)] font-bold text-white leading-tight">
              Why Guests Love Us
            </h2>
            <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-[#c49d52] to-transparent mx-auto sm:mx-0" aria-hidden="true" />
          </div>

          {/* SEO FIX: Use semantic unordered list for features */}
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3" role="list">
            {attractions.map((item, i) => (
              <li key={i}>
                <article className="h-full rounded-[3px] border border-[#c49d52]/20 bg-[#080C18]/40 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#c49d52]/50 hover:bg-[#0a1128]/60 group">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[2px] border border-[#c49d52]/30 bg-gradient-to-br from-[#c49d52]/10 to-transparent text-[#c49d52] transition-transform duration-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-white/60">
                    {item.desc}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── TEAM (AVATARS) ─── */}
        <div className="border-t border-[#c49d52]/20 px-5 py-16 md:px-10 lg:px-14 bg-black/20 backdrop-blur-sm">
          <div className="mb-12 text-center sm:text-left">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c49d52]">
              Leadership
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,44px)] font-bold text-white leading-tight">
              Meet Our Management
            </h2>
            <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-[#c49d52] to-transparent mx-auto sm:mx-0" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <TeamAvatar key={i} {...member} />
            ))}
          </div>
        </div>

        {/* ─── CONTACT & MAP ─── */}
        <div id="contact" className="grid grid-cols-1 border-t border-[#c49d52]/20 lg:grid-cols-2">
          
          {/* MAP */}
          <div className="min-h-[350px] lg:min-h-full overflow-hidden bg-[#0a1128]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=85.3100%2C27.7020%2C85.3200%2C27.7080&layer=mapnik&marker=27.7050%2C85.3150"
              className="h-full min-h-[350px] w-full filter invert-[90%] hue-rotate-[180deg] contrast-[85%]"
              title="Map showing location of Durbar Rodhi Club in Jamal Kathmandu"
              loading="lazy"
              aria-hidden="false"
            />
          </div>

          {/* INFO */}
          <address className="bg-[#02040a]/90 not-italic p-6 sm:p-10 lg:p-14 backdrop-blur-md">
            <div className="mb-10 text-center sm:text-left">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c49d52]">
                Contact & Reservations
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,44px)] font-bold text-white leading-tight">
                Visit Our Club Tonight
              </h2>
              <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-[#c49d52] to-transparent mx-auto sm:mx-0" aria-hidden="true" />
            </div>

            <div className="space-y-5">
              <InfoBlock icon={<MapPin size={18} aria-hidden="true" />} title="Location">
                4th Floor, Bishwojyoti Mall<br />
                Jamal, Kathmandu, Nepal
              </InfoBlock>

              <InfoBlock icon={<Phone size={18} aria-hidden="true" />} title="Reservations">
                <a href="tel:+9779851090035" className="block transition-colors hover:text-[#c49d52]">
                  +977 985-1090035
                </a>
                <a href="tel:+9779708835635" className="mt-1 block transition-colors hover:text-[#c49d52]">
                  +977 970-8835635
                </a>
              </InfoBlock>

              <InfoBlock icon={<Mail size={18} aria-hidden="true" />} title="Email">
                <a href="mailto:ashokgiri123@gmail.com" className="transition-colors hover:text-[#c49d52]">
                  ashokgiri123@gmail.com
                </a>
              </InfoBlock>

              <InfoBlock icon={<Clock size={18} aria-hidden="true" />} title="Opening Hours">
                <ul className="space-y-2" role="list">
                  {hours.map(({ day, time, iso }) => (
                    <li key={day} className="flex items-center justify-between border-b border-[#c49d52]/10 pb-2 text-[14px]">
                      <span className="font-medium text-white/70">{day}</span>
                      <time dateTime={iso} className="text-[#e8c97a]">{time}</time>
                    </li>
                  ))}
                </ul>
              </InfoBlock>
            </div>
          </address>
        </div>

        {/* ─── FOOTER HIGHLIGHT ─── */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#c49d52]/20 bg-[#080C18]/80 px-6 py-6 md:flex-row md:px-10 lg:px-14 backdrop-blur-md">
          <p className="text-center text-[13px] tracking-wide text-white/50 md:text-left">
            Premium Night Club in Jamal, Kathmandu · Live DJ · VIP Lounge · Luxury Entertainment
          </p>
          {/* Subtle Radar Ping for live status indicator */}
          <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0" aria-label="We are open">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c49d52] opacity-75 duration-[2000ms]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c49d52] shadow-[0_0_8px_#c49d52]" />
          </span>
        </footer>

      </div>
    </section>
  );
}