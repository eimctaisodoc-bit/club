import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Music,
  Users,
} from "lucide-react";

const attractions = [
  {
    icon: <Music size={18} />,
    title: "Live DJ Nights",
    desc: "Enjoy electrifying DJ performances, immersive lighting, and premium sound systems every weekend in Kathmandu.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Luxury Club Atmosphere",
    desc: "Elegant navy interiors, VIP lounge seating, and modern nightlife aesthetics crafted for unforgettable evenings.",
  },
  {
    icon: <Users size={18} />,
    title: "Private Events & Celebrations",
    desc: "Host birthdays, corporate parties, and exclusive celebrations with personalized entertainment and premium hospitality.",
  },
];

const team = [
  { role: "Founder", name: "Ashok" },
  { role: "Manager", name: "Rajan Giri" },
  { role: "CEO", name: "Dipak Khadka" },
];

const hours = [
  { day: "Monday", time: "09:00 PM – 02:00 AM" },
  { day: "Friday", time: "09:00 PM – 03:00 AM" },
  { day: "Saturday", time: "09:00 PM – 04:00 AM" },
];

export default function ContactSection() {
  return (
    <section
      className="relative w-full overflow-hidden rounded-lg border border-white/10 
      bg-gradient-to-br from-[#020617] via-[#07152e] to-[#123d7a] text-white"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#1d4ed8]/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#0ea5e9]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_35%)]" />
      </div>

      {/* HERO */}
      <div className="relative z-10 px-5 py-14 md:px-10 lg:px-14 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
            Kathmandu Premium Nightlife
          </p>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Experience Luxury Nightlife &
            <span className="block bg-gradient-to-r from-[#d4af37] to-[#f7d774] bg-clip-text text-transparent">
              Premium DJ Entertainment
            </span>
          </h1>

          <div className="mt-6 h-[2px] w-44 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7d774] to-transparent" />

          <p className="mt-7 max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
            Discover one of Kathmandu’s top nightlife destinations in Jamal
            featuring live DJs, VIP seating, luxury ambience, cocktails,
            dance floors, private celebrations, and unforgettable party
            experiences.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="tel:+9779851090035"
              className="rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f7d774] px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Reserve VIP Table
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-[#d4af37]/20 bg-white/5 px-6 py-3 text-sm font-medium text-[#f7d774] backdrop-blur-md transition-all duration-300 hover:bg-white/10"
            >
              Visit Tonight
            </a>
          </div>
        </div>
      </div>

      {/* ATTRACTIONS */}
      <div className="relative z-10 px-5 pb-14 md:px-10 lg:px-14">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            Club Highlights
          </p>

          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Why Guests Love Our Night Club
          </h2>

          <div className="mt-4 h-[2px] w-36 rounded-full bg-gradient-to-r from-[#d4af37] to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {attractions.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af37]/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/20 to-[#f7d774]/10 text-[#f7d774]">
                {item.icon}
              </div>

              <h3 className="mb-3 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div
        id="contact"
        className="relative z-10 grid grid-cols-1 border-t border-white/10 lg:grid-cols-2"
      >
        {/* MAP */}
        <div className="min-h-[320px] overflow-hidden">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=85.3100%2C27.7020%2C85.3200%2C27.7080&layer=mapnik&marker=27.7050%2C85.3150"
            className="h-full min-h-[320px] w-full"
            title="Night Club in Jamal Kathmandu"
            loading="lazy"
          />
        </div>

        {/* INFO */}
        <div className="bg-gradient-to-br from-[#081225]/90 via-[#0b1b36]/90 to-[#123d7a]/80 p-6 md:p-10">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Contact & Reservations
            </p>

            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Visit Our Club Tonight
            </h2>

            <div className="mt-4 h-[2px] w-36 rounded-full bg-gradient-to-r from-[#d4af37] to-transparent" />
          </div>

          <div className="space-y-6">
            <InfoBlock icon={<MapPin size={16} />} title="Location">
              4th Floor, Bishwojyoti Mall
              <br />
              Jamal, Kathmandu, Nepal
            </InfoBlock>

            <InfoBlock icon={<Phone size={16} />} title="Reservations">
              <a
                href="tel:+9779851090035"
                className="block transition-colors hover:text-[#f7d774]"
              >
                +977 985-1090035
              </a>

              <a
                href="tel:+9779708835635"
                className="block transition-colors hover:text-[#f7d774]"
              >
                +977 970-8835635
              </a>
            </InfoBlock>

            <InfoBlock icon={<Mail size={16} />} title="Email">
              <a
                href="mailto:ashokgiri123@gmail.com"
                className="transition-colors hover:text-[#f7d774]"
              >
                ashokgiri123@gmail.com
              </a>
            </InfoBlock>

            <InfoBlock icon={<Clock size={16} />} title="Opening Hours">
              <div className="space-y-2">
                {hours.map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between border-b border-white/5 pb-2 text-sm"
                  >
                    <span className="text-slate-400">{day}</span>

                    <span className="text-[#f7d774]">{time}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="relative z-10 border-t border-white/10 px-5 py-14 md:px-10 lg:px-14">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            Leadership Team
          </p>

          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Meet Our Management
          </h2>

          <div className="mt-4 h-[2px] w-36 rounded-full bg-gradient-to-r from-[#d4af37] to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {team.map(({ role, name }) => (
            <div
              key={role}
              className="rounded-lg border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af37]/40"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/20 to-[#f7d774]/10 text-lg font-bold text-[#f7d774]">
                {name.charAt(0)}
              </div>

              <h3 className="mb-1 text-lg font-semibold text-white">
                {name}
              </h3>

              <p className="text-sm uppercase tracking-[0.12em] text-[#d4af37]">
                {role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 bg-gradient-to-r from-[#07152e]/80 to-[#123d7a]/60 px-5 py-5 md:flex-row md:px-10 lg:px-14">
        <p className="text-center text-sm text-slate-400 md:text-left">
          Premium Night Club in Jamal, Kathmandu · Live DJ · VIP Lounge ·
          Luxury Entertainment
        </p>

        <div className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
      </footer>
    </section>
  );
}

function InfoBlock({ icon, title, children }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/20 to-[#f7d774]/10 text-[#f7d774]">
          {icon}
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#d4af37]">
          {title}
        </h3>
      </div>

      <div className="text-sm leading-7 text-slate-300">
        {children}
      </div>
    </div>
  );
}