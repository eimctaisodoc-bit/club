import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  // Facebook,
  // Instagram,
  // Youtube,
} from "lucide-react";

export const Contact = () => {
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* Background Glow */}
      <section className="relative min-h-screen px-4 py-24 sm:px-6 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.3),transparent_35%)]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-purple-400 font-semibold">
              Contact Us
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold">
              Get In{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-7">
              Have questions about events, booking, tickets, or party nights?
              Send us a message and our team will contact you soon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

                <div className="space-y-5">
                  <ContactInfo
                    icon={<MapPin />}
                    title="Location"
                    text="Kathmandu, Nepal"
                  />

                  <ContactInfo
                    icon={<Phone />}
                    title="Phone"
                    text="+977 9800000000"
                  />

                  <ContactInfo
                    icon={<Mail />}
                    title="Email"
                    text="info@example.com"
                  />

                  <ContactInfo
                    icon={<Clock />}
                    title="Opening Hours"
                    text="Sunday - Friday, 10:00 AM - 6:00 PM"
                  />
                </div>

                {/* Social Icons */}
                {/* <div className="mt-8 flex items-center gap-4">
                  <SocialIcon icon={<Facebook size={18} />} />
                  <SocialIcon icon={<Instagram size={18} />} />
                  <SocialIcon icon={<Youtube size={18} />} />
                </div> */}
              </div>

              {/* Map Box */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="h-64 w-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 via-[#071344] to-blue-900/50">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-3 text-purple-300" size={34} />
                    <p className="text-sm text-slate-300">Map Location Here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Send Message</h2>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Full Name" type="text" placeholder="Your name" />
                  <Input label="Phone Number" type="text" placeholder="Your phone" />
                </div>

                <Input label="Email Address" type="email" placeholder="Your email" />

                <Input label="Subject" type="text" placeholder="Message subject" />

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-200">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:scale-[1.02] hover:shadow-purple-500/40"
                >
                  Send Message
                  <Send
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ContactInfo = ({ icon, title, text }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-300">{text}</p>
      </div>
    </div>
  );
};

const SocialIcon = ({ icon }) => {
  return (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-500/20"
    >
      {icon}
    </button>
  );
};

const Input = ({ label, type, placeholder }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 placeholder:text-slate-400"
      />
    </div>
  );
};