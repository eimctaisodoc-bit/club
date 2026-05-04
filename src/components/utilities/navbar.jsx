import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Home, Search, X } from "lucide-react";
import { AnimatedBorder } from "./animatedBorder";
import { Home_ } from "../pages/home";

export const NavBar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
    const searchInputRef = useRef(null);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Service", path: "/services" },
        { name: "Gallery", path: "/gallery" },
        { name: "Blog", path: "/blog" },
        { name: "Events", path: "/events" },
        { name: "Contact Us", path: "/contact" },
    ];

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const openSearch = () => {
        setOpenSearchDrawer(true);
    };

    const closeSearch = () => {
        setOpenSearchDrawer(false);
    };

    useEffect(() => {
        if (openSearchDrawer) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 250);
        }
    }, [openSearchDrawer]);

    useEffect(() => {
        const shouldLock = openDrawer || openSearchDrawer;
        document.body.style.overflow = shouldLock ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [openDrawer, openSearchDrawer]);

    return (
        <>
            <style>
                {`
          @keyframes searchBounceIn {
            0% {
              opacity: 0;
              transform: translateY(-18px) scale(0.88);
            }
            55% {
              opacity: 1;
              transform: translateY(4px) scale(1.04);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .search-bounce {
            animation: searchBounceIn 0.65s cubic-bezier(1,0,.89,1) both;
          }

          .search-bounce-delay {
            animation: searchBounceIn 0.7s cubic-bezier(1,0,.89,1) 0.08s both;
          }
        `}
            </style>

            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b  border-white/10  backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3  py-3 lg:px-8">
                    {/* Logo */}
                    <Link to="/" className="flex shrink-0 items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1 shadow-md">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <ul className="flex items-center gap-6">
                            {navItems.map((item) => (
                                <li key={item.path} className="group relative">
                                    <Link
                                        to={item.path}
                                        className="relative inline-block font-space text-md font-medium text-slate-100 transition hover:text-purple-500"
                                    >
                                        {item.name}

                                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-purple-500 transition-all duration-300 ease-out group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Search Trigger + Book Now + Mobile Drawer Button */}
                    <div className="flex min-w-0 items-center gap-4">
                        {/* Search Trigger Only */}
                        <button
                            type="button"
                            onClick={openSearch}
                            className="group inline-flex h-10 shrink-0 
                            items-center justify-center gap-2 rounded-full border
                             border-white/15 bg-white/10 px-3 font-space
                              text-xs 
                             font-medium text-slate-100 outline-none transition
                              hover:border-purple-400/70 hover:bg-white/15
                               hover:text-purple-300 focus:ring-2
                                focus:ring-purple-400/30 sm:px-4 sm:text-sm"
                            aria-label="Open search"
                        >
                            <Search
                                size={17}
                                className="text-white transition-transform  duration-500 
                                ease-[cubic-bezier(1,0,.89,1)] group-hover:scale-125 group-hover:rotate-12"
                            />
                            <span className="hidden lg:flex">Search here</span>
                        </button>

                        {/* Book Now */}
                        <Link to="/book-now" className="shrink-0">
                            <AnimatedBorder onClick={() => { }} >
                                <span className="font-space text-xs font-semibold text-white sm:text-sm">
                                    Book Now
                                </span>
                            </AnimatedBorder>
                        </Link>

                        {/* Drawer Button - Mobile Only */}
                        <button
                            type="button"
                            onClick={() => setOpenDrawer(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
                            aria-label="Open menu"
                        >
                            <div className="group flex w-6 flex-col gap-1.5 cursor-pointer">
                                <span className={`ml-auto block h-0.5  rounded-full bg-white transition-all duration-300  ${openDrawer?"w-[90%]":"w-full"}`}/>
                                <span className={`ml-auto block h-0.5  rounded-full bg-white transition-all duration-300  ${openDrawer?"w-[70%]":"w-full"}`} />
                                <span className={`ml-auto block h-0.5  rounded-full bg-white transition-all duration-300  ${openDrawer?"w-[85%]":"w-full"}`}/>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>


            <div
                onClick={closeSearch}
                className={`fixed inset-0 cursor-pointer z-70 bg-black/55 backdrop-blur-sm transition-all duration-700 ${openSearchDrawer
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            />
            <section
                className={`fixed left-0 top-0 z-[80] h-screen w-full transform border-b border-white/10 shadow-2xl transition-all duration-700 ${openSearchDrawer
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
                    }`}
                style={{
                    background:
                        "linear-gradient(180deg, #4b0058 0%, #3b075e 35%, #211353 68%, #071344 100%)",
                }}
            >
                <div className="flex h-full w-full items-center justify-center px-4">
                    <div className="grid w-full max-w-4xl grid-cols-[1fr_auto] items-center gap-4">
                        {/* Search Box Animation Only */}
                        <div
                            className={`flex justify-center ${openSearchDrawer ? "drawer-content-animate" : ""
                                }`}
                        >
                            <div className="relative w-full max-w-2xl">
                                <Search
                                    size={22}
                                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    ref={searchInputRef}
                                    type="search"
                                    placeholder="Search here..."
                                    className="h-14 w-full rounded-full border border-white/15 bg-white/10 pl-14 pr-5 font-space text-sm font-medium text-white outline-none backdrop-blur-md transition placeholder:text-purple-100/70 focus:border-purple-300 focus:bg-white/15 focus:ring-4 focus:ring-purple-400/20 sm:h-16 sm:text-base"
                                />
                            </div>
                        </div>

                        {/* X Button Animation Only */}
                        <button
                            type="button"
                            onClick={closeSearch}
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 ${openSearchDrawer ? "drawer-content-delay" : ""
                                }`}
                            aria-label="Close search"
                        >
                            <X
                                size={22}
                                className="text-white transition-transform duration-500 ease-[cubic-bezier(1,0,.89,1)] hover:rotate-[360deg] hover:scale-110"
                            />
                        </button>
                    </div>
                </div>
            </section>

            {/* Mobile Menu Overlay */}
            {openDrawer && (
                <div
                    onClick={closeDrawer}
                    className="fixed inset-0 z-50 bg-black/50 transition duration-500 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Mobile Drawer - No Logo, No Search Bar */}
            <aside
                className={`fixed left-0 top-0 z-[60] h-full w-[82%] max-w-xs transform shadow-2xl 
                    transition-transform duration-700 lg:hidden ${openDrawer ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{
                    background:
                        "linear-gradient(180deg, #4b0058 0%, #3b075e 35%, #211353 68%, #071344 100%)",
                }}
            >
                <div className="flex h-full flex-col">
                    {/* Close Button Only */}
                    <div className="flex items-center justify-end border-b border-white/10 p-3">
                        <button
                            type="button"
                            onClick={closeDrawer}
                            className="flex h-9 w-9 cursor-pointer items-center 
                            justify-center rounded-lg bg-white/10 text-white 
                            transition hover:bg-white/20"
                            aria-label="Close menu"
                        >
                            <X
                                size={18}
                                className="text-white transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                            />
                        </button>
                    </div>

                    {/* Drawer Menu Only */}
                    <ul className="flex-1 overflow-y-auto px-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={closeDrawer}
                                    className="block border-b border-white/10 px-7 py-4 text-base font-medium text-white transition hover:bg-white/10"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </aside>

        </>
    );
};