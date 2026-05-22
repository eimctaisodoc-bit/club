import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { X, Home, Info, Sparkles, Image, CalendarDays, Phone } from "lucide-react";
import { AnimatedBorder } from "./animatedBorder";

export const NavBar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const navItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: Info },
        { name: "Service", path: "/services", icon: Sparkles },
        { name: "Gallery", path: "/gallery", icon: Image },
        { name: "Events", path: "/events", icon: CalendarDays },
        { name: "Contact Us", path: "/contact", icon: Phone },
    ];

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    useEffect(() => {
        if (openDrawer) {
            if (window.scrollY > 0) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto",
                });
            }

            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [openDrawer]);

    return (
        <>
            <style>
                {`
          .gold-glow {
            box-shadow: 0 0 20px rgba(212,175,55,0.22);
          }
        `}
            </style>

            {/* NAVBAR */}
            <nav
                className="
          sticky top-0 z-50 w-full
          border-b border-[#d1a645]
          bg-[#111f39]
          backdrop-blur-xl
        "
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-1 lg:px-8">

                    {/* LOGO */}
                    <Link to="/" className="flex shrink-0 items-center gap-3">
                        <div
                            className="
                flex h-21 w-21 items-center justify-center
                rounded-xl bg-white/95 p-1
                shadow-xl gold-glow
              "
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:block">
                        <ul className="flex items-center gap-6">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.path} className="group relative">
                                        <Link
                                            to={item.path}
                                            className="
                      relative inline-flex items-center gap-2
                      font-space text-md font-medium
                      text-[#d1a645]
                      transition duration-300
                    "
                                        >
                                            {Icon && (
                                                <Icon className="h-4 w-4 text-[#d1a645] transition group-hover:text-white" />
                                            )}
                                            {item.name}

                                            <span
                                                className="
                        absolute -bottom-1 left-0
                        h-[2px] w-0
                        bg-[#d1a645]
                        transition-all duration-300 ease-out
                        group-hover:w-full
                      "
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex min-w-0 items-center gap-4">

                        {/* BOOK NOW */}
                        <Link to="/book-now" className="shrink-0">
                            <AnimatedBorder onClick={() => { }}>
                                <span className="font-space text-xs font-semibold text-[#d1a645] sm:text-sm">
                                    Book Now
                                </span>
                            </AnimatedBorder>
                        </Link>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            type="button"
                            onClick={() => setOpenDrawer(true)}
                            className="
                flex h-10 w-10 items-center justify-center
                rounded-lg
                border border-[#D4AF37]/20
                bg-[#0D1B4C]/40
                text-white
                transition hover:bg-[#D4AF37]/10
                lg:hidden
              "
                            aria-label="Open menu"
                        >
                            <div className="group flex w-6 flex-col gap-1.5 cursor-pointer">
                                <span
                                    className={`
                    ml-auto block h-0.5 rounded-full bg-[#d1a645]
                    transition-all duration-300
                    ${openDrawer ? "w-[90%]" : "w-full"}
                  `}
                                />
                                <span
                                    className={`
                    ml-auto block h-0.5 rounded-full bg-[#d1a645]
                    transition-all duration-300
                    ${openDrawer ? "w-[70%]" : "w-full"}
                  `}
                                />
                                <span
                                    className={`
                    ml-auto block h-0.5 rounded-full bg-[#d1a645]
                    transition-all duration-300
                    ${openDrawer ? "w-[85%]" : "w-full"}
                  `}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE OVERLAY */}
            {openDrawer && (
                <div
                    onClick={closeDrawer}
                    className="
            fixed inset-0 z-50
            bg-black/60
            backdrop-blur-sm
            transition duration-500
            lg:hidden
          "
                />
            )}

            {/* MOBILE DRAWER */}
            <aside
                className={`
          fixed left-0 top-0 z-[60]
          h-full w-[82%] max-w-xs
          transform shadow-2xl transition-transform duration-700
          bg-[linear-gradient(135deg,#020617_0%,#0D1B4C_35%,#172554_65%,#7A2E2A_100%)]
          lg:hidden
          ${openDrawer ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex h-full flex-col">

                    {/* CLOSE */}
                    <div className="flex items-center justify-end border-b border-[#D4AF37]/10 p-3">
                        <button
                            type="button"
                            onClick={closeDrawer}
                            className="
                flex h-9 w-9 cursor-pointer
                items-center justify-center
                rounded-lg
                bg-white/10
                text-white
                transition hover:bg-[#D4AF37]/10
              "
                            aria-label="Close menu"
                        >
                            <X
                                size={18}
                                className="
                  text-[#d1a645]
                  transition-transform duration-500
                  ease-in-out hover:rotate-[360deg]
                "
                            />
                        </button>
                    </div>

                    {/* NAV ITEMS */}
                    <ul className="flex-1 overflow-hidden px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={closeDrawer}
                                        className="
                    flex items-center gap-3
                    border-b border-white/10
                    px-7 py-4
                    text-base font-medium text-white
                    transition duration-300
                    hover:bg-[#D4AF37]/10
                    hover:text-[#d1a645]
                  "
                                    >
                                        {Icon && (
                                            <Icon className="h-5 w-5 text-[#d1a645]" />
                                        )}
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </>
    );
};