import { useState, useEffect, useCallback, useRef, memo } from "react";
import { RotatingTriangle } from "./triangle";

// ─── PERFORMANCE FIX 1: Static data outside component ────────────────────────
const TABS = ["All", "Music", "Dance"];
const imageMap = import.meta.glob(
  "../../assets/gallery/*.{jpg,jpg,webp,png}",
  { eager: true, import: "default" }
);

const img = (name) => imageMap[`../../assets/gallery/${name}`] ?? "";
const galleryItems = [

  { id: 1,  title: "Music Show", category: "Music", height: "h-[220px] sm:h-[260px]", image: img('1.jpg') },
  { id: 2,  title: "Music Show", category: "Music", height: "h-[280px] sm:h-[340px]", image: img('2.jpg') },
  { id: 3,  title: "Dance Show", category: "Dance", height: "h-[240px] sm:h-[300px]", image: img('3.jpg') },
  { id: 4,  title: "Dance Show", category: "Dance", height: "h-[300px] sm:h-[380px]", image: img('4.jpg') },
  { id: 5,  title: "Dance Show", category: "Dance", height: "h-[250px] sm:h-[310px]", image: img('5.jpg') },
  { id: 6,  title: "Dance Show", category: "Dance", height: "h-[230px] sm:h-[270px]", image: img('6.jpg') },
  { id: 55, title: "Music Show", category: "Music", height: "h-[260px] sm:h-[320px]", image: img('55.jpg') },
  { id: 7,  title: "Dance Show", category: "Dance", height: "h-[260px] sm:h-[320px]", image: img('7.jpg') },
  { id: 8,  title: "Dance Show", category: "Dance", height: "h-[280px] sm:h-[350px]", image: img('8.jpg') },
  { id: 9,  title: "Dance Show", category: "Dance", height: "h-[240px] sm:h-[290px]", image: img('9.jpg') },
  { id: 10, title: "Dance Show", category: "Dance", height: "h-[300px] sm:h-[360px]", image: img('10.jpg') },
  { id: 11, title: "Music Show", category: "Music", height: "h-[230px] sm:h-[280px]", image: img('111.jpg') },
  { id: 22, title: "Music Show", category: "Music", height: "h-[270px] sm:h-[330px]", image: img('22.jpg') },
  { id: 33, title: "Music Show", category: "Music", height: "h-[250px] sm:h-[300px]", image: img('33.jpg') },
  { id: 44, title: "Music Show", category: "Music", height: "h-[310px] sm:h-[380px]", image: img('44.jpg') },
];

const preloadFirstImages = () => {
  galleryItems.slice(0, 2).forEach((item) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = item.image;
    document.head.appendChild(link);
  });
};

const useInView = (ref, rootMargin = "150px") => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          setInView(true); 
          observer.disconnect(); 
        } 
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
};

// ─── COMPONENT: Memoized Gallery Card ────────────────────────────────────────
const GalleryCard = memo(({ item, index, priority }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className={`
        break-inside-avoid mb-3 sm:mb-5 relative overflow-hidden rounded-[4px]
        border border-[#c49d52]/20 cursor-pointer group
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:border-[#c49d52]/80 hover:shadow-[0_12px_40px_rgba(196,157,82,0.15)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}
      `}
      id="gallery"
      style={{ transition: "opacity 0.55s ease, transform 0.55s ease" }}
    >
      <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#c49d52] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20" aria-hidden="true" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#c49d52] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#c49d52] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20" aria-hidden="true" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#c49d52] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20" aria-hidden="true" />

      <img
        src={item.image}
        alt={`${item.category} - ${item.title}`}
        width="800"
        height="600"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`w-full 
           object-cover brightness-[0.85] saturate-[0.9] transition-all duration-700 lg:group-hover:scale-[1.09] 
          lg:group-hover:brightness-[0.45] lg:group-hover:saturate-75 scale-[1.07] `}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,12,24,0.95)_0%,rgba(8,12,24,0.3)_50%,transparent_100%)] lg:bg-[linear-gradient(to_top,rgba(8,12,24,0.95)_0%,rgba(8,12,24,0.6)_60%,transparent_100%)] lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end px-4 py-4 sm:px-6 sm:py-6">
        <p className="text-[#c49d52] text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-semibold mb-1 lg:translate-y-2.5 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-400 delay-[50ms]">
          {item.category}
        </p>
        <h3 className="text-white font-['Cormorant_Garamond'] text-xl sm:text-2xl font-bold leading-tight lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-400 delay-100">
          {item.title}
        </h3>
        <div className="mt-2.5 h-[2px] w-8 bg-[#c49d52] origin-left lg:scale-x-0 lg:group-hover:scale-x-100 transition-transform duration-400 delay-150" aria-hidden="true" />
      </div>
    </div>
  );
});
GalleryCard.displayName = "GalleryCard";

// ─── COMPONENT: Memoized Tab Button ──────────────────────────────────────────
const TabBtn = memo(({ tab, active, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    aria-pressed={active}
    className={`
      px-6 py-2 sm:px-8 sm:py-2.5 rounded-[3px] text-[11px] sm:text-[12px] tracking-[0.15em] uppercase cursor-pointer
      border transition-all duration-300 font-['DM_Sans'] font-semibold
      ${active
        ? "bg-[#c49d52] text-[#0a0e1a] border-[#c49d52] shadow-[0_0_20px_rgba(196,157,82,0.25)]"
        : "bg-transparent border-white/20 text-white/65 hover:border-[#c49d52]/60 hover:text-white hover:bg-white/5"
      }
    `}
  >
    {tab}
  </button>
));
TabBtn.displayName = "TabBtn";

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Gallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [key, setKey] = useState(0);

  useEffect(() => { preloadFirstImages(); }, []);

  const handleTab = useCallback((tab) => {
    setActiveTab(tab);
    setKey((k) => k + 1); 
  }, []);

  const filtered = activeTab === "All"
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeTab);

  return (
    <section
      /* THEME FIX: Dark Navy / Deep Blue Conic Gradient. 
         Sharper color stops create a distinct "laser sweep" beam down the middle */
      className="relative min-h-screen py-20 lg:py-28 px-4 sm:px-8 overflow-hidden bg-[#02040a] bg-[conic-gradient(at_top,_#02040a_0%,_#02040a_30%,_#0a1128_40%,_#1e3a8a_48%,_#172554_50%,_#1e3a8a_52%,_#0a1128_60%,_#02040a_70%,_#02040a_100%)]"
      aria-label="Gallery section"
    >
      {/* Decorative Flashing Glows: 
          Using animate-pulse on dark blue orbs to simulate flashing club lights */}
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#1e3a8a]/15 blur-[120px] pointer-events-none animate-pulse duration-[3000ms]" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#172554]/25 blur-[100px] pointer-events-none animate-pulse duration-[4000ms]" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#1e3a8a]/5 blur-[150px] pointer-events-none animate-pulse duration-[5000ms]" aria-hidden="true" />

      {/* Decorative Triangles */}
      <div className="pointer-events-none absolute right-16 top-24 hidden lg:block opacity-40" aria-hidden="true">
        <RotatingTriangle wrapperClassName="rotate-12 scale-110" imgClassName="h-28 w-28" />
      </div>
      <div className="pointer-events-none absolute left-8 top-36 hidden xl:block opacity-30" aria-hidden="true">
        <RotatingTriangle wrapperClassName="-rotate-6 scale-90" imgClassName="h-20 w-20" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3.5 py-1.5 backdrop-blur-sm bg-black/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52] animate-pulse" aria-hidden="true" />
            <span className="font-['DM_Sans'] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
              Curated Collection
            </span>
          </div>
          
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold text-white tracking-[-0.01em] font-['Cormorant_Garamond'] leading-none">
            Our Gallery
          </h2>
          
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <div className="w-10 sm:w-14 h-px bg-[#c49d52]/40" />
            <span className="text-[10px] tracking-[0.3em] text-[#c49d52]">✦</span>
            <div className="w-10 sm:w-14 h-px bg-[#c49d52]/40" />
          </div>
          
          <p className="max-w-[420px] mx-auto font-['DM_Sans'] text-sm sm:text-base text-white/60 leading-relaxed">
            A visual journey through the rhythm, energy, and tradition of our Rodhi club nights.
          </p>
        </header>

        {/* Tabs */}
        <div
          className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16 relative z-20"
          role="group"
          aria-label="Filter gallery by category"
        >
          {TABS.map((tab) => (
            <TabBtn
              key={tab}
              tab={tab}
              active={activeTab === tab}
              onClick={handleTab}
            />
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          key={key}
          className="columns-2 lg:columns-3 gap-3 sm:gap-5 lg:gap-6 relative z-20"
          role="list"
          aria-label={`${activeTab} gallery items`}
        >
          {filtered.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Gallery);