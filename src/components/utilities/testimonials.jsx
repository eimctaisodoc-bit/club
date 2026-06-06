import { useState, useCallback, memo, useEffect } from "react";
import { MessageSquare, MoveLeft, MoveRight, Quote, MapPin, Briefcase } from "lucide-react";

const content = [
  { name: "Aarav Shrestha",    position: "VIP Member",        location: "Kathmandu, Nepal",  image: "https://i.pravatar.cc/96?img=11", review: "Amazing nightlife experience with energetic music, premium ambience and professional hospitality. The atmosphere at Durbar Rodhi Club feels luxurious and vibrant every night."              },
  { name: "Sita Maharjan",     position: "Event Coordinator", location: "Lalitpur, Nepal",   image: "https://i.pravatar.cc/96?img=47", review: "The lighting, DJ performance and crowd management were outstanding. Perfect destination for enjoying premium nightlife with friends and colleagues."                                    },
  { name: "Bikram Thapa",      position: "Regular Guest",     location: "Bhaktapur, Nepal",  image: "https://i.pravatar.cc/96?img=13", review: "Highly impressed by the club environment and VIP service. Music system, interior design and staff behavior were all top-class every single visit."                                     },
  { name: "Priya Tamang",      position: "Brand Ambassador",  location: "Pokhara, Nepal",    image: "https://i.pravatar.cc/96?img=44", review: "Beautiful interior with stunning blue and golden vibes. The live performances and warm hospitality at Durbar Rodhi Club made every night unforgettable."                               },
  { name: "Rohan Gurung",      position: "Club Photographer", location: "Kathmandu, Nepal",  image: "https://i.pravatar.cc/96?img=15", review: "Professional management, secure environment and excellent customer service. One of the best nightlife destinations I have experienced in Nepal."                                     },
  { name: "Anisha Karki",      position: "Music Enthusiast",  location: "Chitwan, Nepal",    image: "https://i.pravatar.cc/96?img=49", review: "Elegant ambience with powerful sound system and premium seating arrangement. Durbar Rodhi Club is the perfect place for entertainment and celebration."                               },
  { name: "Suraj Pandey",      position: "Event Organiser",   location: "Butwal, Nepal",     image: "https://i.pravatar.cc/96?img=17", review: "The VIP section experience was truly exceptional. Stylish setup, friendly staff and energetic atmosphere throughout every night I visited."                                          },
  { name: "Nisha Rai",         position: "Loyal Guest",       location: "Biratnagar, Nepal", image: "https://i.pravatar.cc/96?img=45", review: "Music selection, crowd energy and luxury environment were beyond expectations. Durbar Rodhi Club delivers a truly premium nightlife experience."                                   },
];

const Avatar = memo(({ name, image }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="relative h-20 w-20 shrink-0">
      {/* Animated Golden Border Ring */}
      <div 
        className="absolute -inset-1.5 rounded-full border-[3px] border-t-[#c49d52] border-r-[#c49d52]/60 border-b-[#c49d52]/10 border-l-[#c49d52]/60 animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(196,157,82,0.4)]" 
        aria-hidden="true" 
      />
      
      <div className="relative h-full w-full rounded-full bg-[#0a1128] z-10 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            width="80"
            height="80"
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-full object-cover border-2 border-transparent"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-transparent bg-gradient-to-br from-[#0a1128] to-[#1e3a8a] text-2xl font-bold text-[#e8c97a]">
            {initials}
          </div>
        )}
      </div>
      <div className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(196,157,82,0.3)] pointer-events-none z-20" aria-hidden="true" />
    </div>
  );
});
Avatar.displayName = "Avatar";

const NavBtn = memo(({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="group flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#c49d52]/40 bg-[#0a1128]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#c49d52]/10 hover:border-[#c49d52] hover:shadow-[0_0_20px_rgba(196,157,82,0.35)] cursor-pointer"
  >
    {children}
  </button>
));
NavBtn.displayName = "NavBtn";

export default memo(function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("");

  const activeItem = content[currentIndex];

  const paginate = useCallback((newDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection > 0 ? "right" : "left");
    
    // Allow the fade out animation to finish before swapping content
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + newDirection + content.length) % content.length);
      setDirection(""); // Reset direction to trigger fade in
      
      // Unlock pagination after fade in finishes
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  }, [isAnimating]);

  const goPrev = useCallback(() => paginate(-1), [paginate]);
  const goNext = useCallback(() => paginate(1),  [paginate]);

  // Determine transition classes based on animation state
  const getTransitionClass = () => {
    if (direction === "right") return "opacity-0 -translate-x-12 scale-95";
    if (direction === "left") return "opacity-0 translate-x-12 scale-95";
    return "opacity-100 translate-x-0 scale-100";
  };

  return (
    <section 
      className="relative w-full overflow-hidden py-20 lg:py-28 font-['DM_Sans'] text-white" 
      aria-label="Client testimonials"
      id="testimonials"
    >
      {/* ─── PREMIUM DARK CLUB GRADIENT BACKGROUND ─── */}
      <div className="absolute inset-0 bg-[#02040a] bg-[radial-gradient(ellipse_at_bottom,_#1e3a8a_0%,_#0a1128_40%,_#02040a_100%)] pointer-events-none" aria-hidden="true" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[#1e3a8a]/10 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#c49d52]/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        
        {/* HEADER */}
        <header className="mb-14 sm:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3.5 py-1.5 backdrop-blur-sm bg-black/20 mb-6">
            <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] text-white tracking-[-0.01em] font-['Cormorant_Garamond']">
            Voices of the <span className="text-[#e8c97a]">Night</span>
          </h2>
          
          <div className="mt-6 h-[2px] w-24 bg-gradient-to-r from-[#c49d52] to-transparent mx-auto sm:mx-0" aria-hidden="true" />
          
          <p className="mt-6 max-w-[500px] text-[15px] sm:text-[16px] leading-[1.75] text-white/60 mx-auto sm:mx-0">
            Real experiences from our valued guests and partners at Durbar Rodhi Club, Kathmandu's premier nightlife destination.
          </p>
        </header>

        {/* TESTIMONIAL CARD & CONTROLS */}
        <div>
          {/* Card Container */}
          <div className="relative min-h-[380px] sm:min-h-[320px] lg:min-h-[280px]">
            <div 
              className={`absolute top-0 left-0 w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${getTransitionClass()}`}
              role="region"
              aria-label={`Testimonial ${currentIndex + 1} of ${content.length}`}
              aria-live="polite"
            >
              <div className="relative overflow-hidden rounded-[4px] border border-[#c49d52]/20 bg-[#080C18]/60 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] group">
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 rounded-[4px] bg-gradient-to-br from-[#c49d52]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
                <div className="absolute right-6 top-6 sm:right-10 sm:top-10 opacity-[0.07] pointer-events-none" aria-hidden="true">
                  <Quote size={80} className="text-[#c49d52]" />
                </div>

                <div className="flex flex-col gap-8 relative z-10">
                  {/* User row */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
                    <Avatar name={activeItem.name} image={activeItem.image} />
                    
                    <div className="flex flex-col gap-1.5 mt-1 sm:mt-2">
                      <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-[28px] font-bold text-white leading-none">
                        {activeItem.name}
                      </h3>
                      
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[12px] sm:text-[13px]">
                        <span className="flex items-center gap-1.5 font-medium text-[#c49d52] uppercase tracking-[0.05em]">
                          <Briefcase size={14} aria-hidden="true" />
                          {activeItem.position}
                        </span>
                        <span className="text-white/30" aria-hidden="true">|</span>
                        <span className="flex items-center gap-1.5 text-white/50">
                          <MapPin size={14} aria-hidden="true" className="text-[#c49d52]/60" />
                          {activeItem.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-[#c49d52]/15" aria-hidden="true" />

                  {/* Review Text */}
                  <blockquote>
                    <p className="max-w-4xl font-['Cormorant_Garamond'] text-xl sm:text-2xl leading-relaxed text-white/80 italic">
                      "{activeItem.review}"
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-20 flex items-center justify-center sm:justify-start gap-4">
            <NavBtn onClick={goPrev} label="Previous testimonial">
              <MoveLeft size={18} className="text-[#c49d52] transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            </NavBtn>
            
            <div
              className="rounded-[3px] border border-[#c49d52]/30 bg-black/40 px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-medium tracking-[0.15em] text-[#c49d52] backdrop-blur-md"
              aria-live="polite"
              aria-atomic="true"
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(content.length).padStart(2, '0')}
            </div>
            
            <NavBtn onClick={goNext} label="Next testimonial">
              <MoveRight size={18} className="text-[#c49d52] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </NavBtn>
          </div>
        </div>

      </div>
    </section>
  );
});