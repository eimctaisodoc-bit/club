import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { X, Home, Sparkles, Image, CalendarDays, Phone, Menu } from "lucide-react";
import { AnimatedBorder } from "./animatedBorder";

const NAV_ITEMS = [
  { name: "Home", path: "/", icon: Home, id: "home" },
  { name: "Service", path: "#services", icon: Sparkles, id: "services" },
  { name: "Gallery", path: "#gallery", icon: Image, id: "gallery" },
  { name: "Menu", path: "#menu", icon: CalendarDays, id: "menu" },
  { name: "Testimonials", path: "#testi", icon: CalendarDays, id: "testi" },
  { name: "Contact Us", path: "#contact", icon: Phone, id: "contact" },
];

// ─── Memoized nav link ────────────────────────────────────────────────────────
const NavLink = memo(({ item, isActive, mobile, onNavClick }) => {
  const Icon = item.icon;

  if (mobile) {
    return (
      <li>
        <Link
          to={item.path}
          state={{ targetId: item.id }}
          onClick={(e) => onNavClick(e, item)}
          aria-current={isActive ? "page" : undefined}
          className={`group flex items-center gap-3 border-b border-white/5 px-7 py-4 text-[15px] font-medium transition duration-300
            ${isActive
              ? "bg-[#c49d52]/10 text-[#c49d52]"
              : "text-white/80 hover:bg-[#c49d52]/10 hover:text-[#e8c97a]"
            }`}
        >
          <Icon
            className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-[#c49d52]" : "text-[#c49d52]/60 group-hover:text-[#c49d52]"}`}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        to={item.path}
        state={{ targetId: item.id }}
        onClick={(e) => onNavClick(e, item)}
        aria-current={isActive ? "page" : undefined}
        className={`relative inline-flex items-center gap-2 font-['DM_Sans'] text-[14px] font-semibold tracking-wide transition duration-300
          ${isActive ? "text-[#c49d52]" : "text-white/80 hover:text-white"}`}
      >
        <Icon
          className={`h-4 w-4 transition-colors duration-300 ${isActive ? "text-[#c49d52]" : "text-[#c49d52]/70 group-hover:text-[#c49d52]"}`}
          aria-hidden="true"
        />
        {item.name}
        <span
          className={`absolute -bottom-1.5 left-0 h-[2px] bg-gradient-to-r from-[#c49d52] to-[#e8c97a] transition-all duration-300 ease-out
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
});

NavLink.displayName = "NavLink";

// ─── Main Component ───────────────────────────────────────────────────────────
const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const scrollYRef = useRef(0);

  const closeDrawer = useCallback(() => setOpenDrawer(false), []);
  const openDrawerFn = useCallback(() => setOpenDrawer(true), []);

  // ─── SMART NAVIGATION HANDLER ──────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e, item) => {
      if (location.pathname === item.path) {
        e.preventDefault();
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      }
      if (openDrawer) closeDrawer();
    },
    [location.pathname, openDrawer, closeDrawer]
  );

  // ─── BODY SCROLL LOCK WHEN DRAWER IS OPEN ─────────────────────────────────

  if (openDrawer) {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const handleScroll = () => {
      // console.log("Scroll Y Position:", window.scrollY);
    };

    // Attach the listener when the component loads
    window.addEventListener("scroll", handleScroll);

    // Clean it up when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (openDrawer) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore scroll position
      window.scrollTo(0, scrollYRef.current);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [openDrawer]);

  // ─── CROSS-PAGE SCROLL RESTORATION ────────────────────────────────────────
  useEffect(() => {
    if (location.state?.targetId) {
      const timer = setTimeout(() => {
        document.getElementById(location.state.targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // ─── ESCAPE KEY ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!openDrawer) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openDrawer, closeDrawer]);

  return (
    <>
      {/* ── NAVBAR ───────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 w-full border-b border-[#c49d52]/20 bg-[linear-gradient(to_right,rgba(2,4,10,0.95),rgba(10,17,40,0.95),rgba(2,4,10,0.95))] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-2 lg:px-12">
          {/* LOGO */}
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Go to homepage">
            <div className="flex h-[76px] w-[76px] sm:h-[84px] sm:w-[84px] items-center justify-center rounded-[3px] bg-white p-1 transition-transform duration-300 hover:scale-105">
              <img
                src={logo}
                alt="Durbar Rodhi Club Logo"
                width="76"
                height="76"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="h-full w-full object-contain relative z-50"
              />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:block" role="navigation">
            <ul className="flex items-center gap-8" role="list">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  onNavClick={handleNavClick}
                />
              ))}
            </ul>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex min-w-0 items-center gap-4"
        
             onClick={() => window.scrollTo({ top: document.getElementById("event").offsetTop, behavior: "smooth" })}
          >

            <AnimatedBorder>
              <span className="font-['DM_Sans'] text-[12px] uppercase tracking-[0.15em] font-bold text-white transition-colors hover:text-[#e8c97a]">
                Book Now
              </span>
            </AnimatedBorder>

            <button
              type="button"
              onClick={openDrawerFn}
              className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-[#c49d52]/30 bg-[#0a1128]/50 text-white transition hover:bg-[#c49d52]/10 hover:border-[#c49d52]/60 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={openDrawer}
              aria-controls="mobile-drawer"
            >
              <Menu size={22} className="text-[#c49d52]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${openDrawer ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        aria-hidden={!openDrawer}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={closeDrawer}
          aria-hidden="true"
        />

        {/* SIDEBAR PANEL */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[280px] sm:w-[320px] flex-col bg-[#0a1128] shadow-2xl transition-transform duration-300 ease-in-out border-l border-[#c49d52]/20 ${openDrawer ? "translate-x-0" : "translate-x-full"
            }`}
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#c49d52]/20 px-6 py-5">
            <span className="font-['DM_Sans'] text-lg font-bold text-white tracking-wider">
              MENU
            </span>
            <button
              type="button"
              onClick={closeDrawer}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-[#c49d52]/10 hover:text-[#c49d52]"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* MOBILE NAV LINKS */}
          <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
            <ul className="flex flex-col list-none" role="list">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  mobile={true}
                  onNavClick={handleNavClick}
                />
              ))}
            </ul>
          </div>

          {/* BOTTOM FOOTER */}
          <div className="border-t border-[#c49d52]/20 p-6">
            <p className="text-center text-xs text-white/40">
              © {new Date().getFullYear()} Durbar Rodhi Club
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(NavBar);