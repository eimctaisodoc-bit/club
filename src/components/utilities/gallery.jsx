import { useState, useEffect } from "react";
import { RotatingTriangle } from "./triangle";

const galleryItems = [
  {
    id: 1,
    title: "Live Concert",
    category: "Music",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800",
    height: "h-[260px]",
  },
  {
    id: 2,
    title: "Dance Show",
    category: "Dance",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    height: "h-[340px]",
  },
  {
    id: 3,
    title: "DJ Night",
    category: "Music",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    height: "h-[300px]",
  },
  {
    id: 4,
    title: "Street Dance",
    category: "Dance",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    height: "h-[380px]",
  },
  {
    id: 5,
    title: "Guitar Session",
    category: "Music",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    height: "h-[310px]",
  },
  {
    id: 6,
    title: "Cultural Dance",
    category: "Dance",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
    height: "h-[270px]",
  },
];

const TABS = ["All", "Music", "Dance"];

const GalleryCard = ({ item, index }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`
        break-inside-avoid mb-4 relative overflow-hidden rounded-2xl
        border border-[#c9a84c]/30 cursor-pointer group
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:scale-[1.015]
        hover:border-[#c9a84c] hover:shadow-[0_12px_40px_rgba(201,168,76,0.2)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}
      `}
      style={{ transition: "opacity 0.55s ease, transform 0.55s ease" }}
    >
      {/* Corner brackets */}
      <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
      <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Image */}
      <img
        src={`${item.image}?auto=format&fit=crop&w=700&q=80`}
        alt={item.title}
        className={`w-full ${item.height} object-cover brightness-[0.82] saturate-90 transition-all duration-700 group-hover:scale-[1.07] group-hover:brightness-[0.55] group-hover:saturate-75`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/90 via-[#0a0f1e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end px-5 py-5">
        {/* Category */}
        <p className="text-[#c9a84c] text-[10px] tracking-[3px] uppercase font-medium mb-1.5 translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-[50ms]">
          {item.category}
        </p>

        {/* Title */}
        <h3 className="text-[#f5ecd7] text-xl font-semibold leading-tight translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100">
          {item.title}
        </h3>

        {/* Gold bar */}
        <div className="mt-2.5 h-[2px] w-7 bg-[#c9a84c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 delay-150" />
      </div>
    </div>
  );
};

export const Gallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [key, setKey] = useState(0);

  const filtered =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeTab);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setKey((k) => k + 1);
  };

  return (
    <section className="relative min-h-screen py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#07152e] to-[#0f2d5c]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#1d4ed8]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-16 top-24 hidden lg:block">
        <RotatingTriangle wrapperClassName="rotate-12 scale-110" imgClassName="h-28 w-28" />
      </div>
      <div className="pointer-events-none absolute left-8 top-36 hidden xl:block">
        <RotatingTriangle wrapperClassName="-rotate-6 scale-90" imgClassName="h-20 w-20" />
      </div>
      <div className="pointer-events-none absolute left-24 bottom-32 hidden 2xl:block">
        <RotatingTriangle wrapperClassName="rotate-6 scale-125" imgClassName="h-32 w-32" />
      </div>
      <div className="pointer-events-none absolute right-10 bottom-10 hidden lg:block">
        <RotatingTriangle wrapperClassName="-rotate-12 scale-75" imgClassName="h-20 w-20" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[#c9a84c] text-[11px] tracking-[4px] uppercase mb-4 font-medium">
            Curated Collection
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f5ecd7] tracking-wide"
              style={{ fontFamily: "'Cinzel', serif" }}>
            Gallery
          </h2>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-14 h-px bg-[#c9a84c]/35" />
            <div className="w-1.5 h-1.5 bg-[#c9a84c] rotate-45" />
            <div className="w-14 h-px bg-[#c9a84c]/35" />
          </div>

          <p className="text-[#c9a84c]/60 text-[12px] tracking-[3px] uppercase font-light">
            Music &amp; Dance
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-10 sm:mb-14">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`
                px-6 py-2 rounded-full text-[12px] tracking-[2px] uppercase cursor-pointer
                border transition-all duration-350 font-medium
                ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#c9a84c] to-[#a87c30] text-[#0a0f1e] border-transparent shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
                    : "border-[#c9a84c]/35 text-[#c9a84c]/65 hover:border-[#c9a84c] hover:text-[#e2c06e] hover:bg-[#c9a84c]/10"
                }
              `}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div
          key={key}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
        >
          {filtered.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};