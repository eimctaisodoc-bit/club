import { useState, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Briefcase, MapPin, Calendar, Phone, Sparkles } from "lucide-react";
import { artists } from "./artist";

// Golden styled icon button
const IconButton = memo(({ onClick, disabled, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-md
      ${disabled 
        ? "border-white/10 text-white/30 cursor-not-allowed bg-white/5" 
        : "border-[#FFD700]/40 text-[#FFD700] bg-[#FFD700]/10 hover:bg-[#FFD700]/20 hover:border-[#FFD700] hover:text-white hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105 active:scale-95"
      }`}
  >
    {children}
  </button>
));
IconButton.displayName = "IconButton";

export default function NavyGoldStaffTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeArtist = artists[currentIndex];

  const handleNavigate = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === "next") return (prev + 1) % artists.length;
        if (direction === "prev") return (prev - 1 + artists.length) % artists.length;
        return prev;
      });
      setIsAnimating(false);
    }, 300); 
  }, [isAnimating]);

  return (
    <section className="relative w-full bg-[#020A1A] py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-sans flex justify-center items-center min-h-[100dvh] overflow-hidden text-white"
    id="testi">
      
      {/* --- DARK NAVY BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Deep space base layer */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen" />
        
        {/* Dark Blue glowing nebula - Bottom Left */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[#0B2046] blur-[100px] md:blur-[150px] opacity-80" />
        
        {/* Deep Navy glowing nebula - Top Right */}
        <div className="absolute -top-[10%] -right-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-[#0A192F] blur-[80px] md:blur-[130px] opacity-90" />
        
        {/* Core Dark Blue - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-[#001133] blur-[120px] opacity-70" />
      </div>

      <div className="relative w-full max-w-5xl z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-8 md:mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/40 px-4 py-1.5 bg-[#FFD700]/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,215,0,0.15)]">
            <Sparkles size={14} className="text-[#FFD700]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FFD700]">
              Staff Testimonials
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Our Brilliant <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEA70] via-[#FFD700] to-[#B8860B] drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">Office Staff</span>
          </h2>
          
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto font-light text-sm md:text-base px-4">
            Discover the experiences, stories, and driving forces behind the extraordinary professionals who make our workplace stellar.
          </p>
        </header>

        {/* --- MAIN INTERACTIVE AREA --- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative w-full">
          
          {/* Desktop Left Handle */}
          <div className="hidden md:block shrink-0">
            <IconButton onClick={() => handleNavigate("prev")} ariaLabel="Previous staff member">
              <ChevronLeft size={24} strokeWidth={2} />
            </IconButton>
          </div>

          {/* Glowing Card Container */}
          <div className="w-full max-w-[600px] bg-black/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden relative flex flex-col justify-center min-h-[480px] md:min-h-[380px] group transition-all duration-500 hover:border-[#FFD700]/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]">
            
            {/* Inner dynamic card glow (Dark Blue to Navy) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B2046]/30 to-[#0A192F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden="true" />
            
            {/* Animated Transition Wrapper */}
            <div className={`w-full h-full p-6 sm:p-8 md:p-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isAnimating ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`}>
              
              {/* Mobile-first layout: Column default, Row on medium screens */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start h-full">
                
                {/* Image Section */}
                <div className="shrink-0 relative">
                  {/* Golden halo behind image */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#B8860B] blur-md opacity-40 scale-105" aria-hidden="true" />
                  
                  <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-2 border-[#FFD700]/30 bg-[#020A1A] shadow-inner z-10">
                    <img 
                      src={activeArtist.img} 
                      alt={activeArtist.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full flex flex-col text-center md:text-left">
                  
                  {/* Name & Title */}
                  <div className="mb-6 pb-6 relative">
                    {/* Golden divider line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent md:from-[#FFD700]/50 via-[#B8860B]/50 to-transparent" />
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-[#FFEA70] tracking-wide mb-3 drop-shadow-md">
                      {activeArtist.name}
                    </h3>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold uppercase tracking-widest shadow-[0_0_10px_rgba(255,215,0,0.1)]">
                      <Briefcase size={12} strokeWidth={2.5} />
                      {activeArtist.position}
                    </span>
                  </div>

                  {/* Details Grid (Mobile: 1 col, SM: 2 col) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-300 w-full">
                    
                    <div className="flex items-center justify-start gap-3 w-full group/item">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover/item:border-[#FFD700]/50 group-hover/item:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all">
                        <MapPin size={16} className="text-[#FFD700]" />
                      </div>
                      <span className="text-sm font-light truncate">{activeArtist.address}</span>
                    </div>
                    
                    <div className="flex items-center justify-start gap-3 w-full group/item">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover/item:border-[#FFD700]/50 group-hover/item:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all">
                        <Calendar size={16} className="text-[#FFD700]" />
                      </div>
                      <span className="text-sm font-light truncate">{activeArtist.dob}</span>
                    </div>

                    <div className="flex items-center justify-start gap-3 w-full group/item">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover/item:border-[#FFD700]/50 group-hover/item:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all">
                        <Phone size={16} className="text-[#FFD700]" />
                      </div>
                      <span className="text-sm font-light tracking-wide truncate">{activeArtist.contact}</span>
                    </div>
                    
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Desktop Right Handle */}
          <div className="hidden md:block shrink-0">
            <IconButton onClick={() => handleNavigate("next")} ariaLabel="Next staff member">
              <ChevronRight size={24} strokeWidth={2} />
            </IconButton>
          </div>

        </div>

        {/* --- MOBILE CONTROLS & PAGINATION --- */}
        <div className="mt-8 flex items-center justify-between md:justify-center px-2 w-full max-w-[600px] mx-auto relative z-20">
          
          <div className="md:hidden">
            <IconButton onClick={() => handleNavigate("prev")} ariaLabel="Previous">
              <ChevronLeft size={20} />
            </IconButton>
          </div>
          
          {/* Glowing Pagination Indicator */}
          <div className="flex items-center justify-center md:mx-6 bg-[#020A1A]/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#FFD700]/20 shadow-[inset_0_0_15px_rgba(255,215,0,0.05)]">
            <span className="text-sm font-bold tracking-widest text-[#FFD700] drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-gray-500 mx-2 text-sm">/</span>
            <span className="text-sm font-medium tracking-widest text-gray-400">
              {String(artists.length).padStart(2, '0')}
            </span>
          </div>
          
          <div className="md:hidden">
            <IconButton onClick={() => handleNavigate("next")} ariaLabel="Next">
              <ChevronRight size={20} />
            </IconButton>
          </div>
          
        </div>

      </div>
    </section>
  );
}