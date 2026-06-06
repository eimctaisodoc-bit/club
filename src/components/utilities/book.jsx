import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  User,
  Users,
  Calendar,
  Clock,
  Check,
  Loader2,
  Phone,
  Mail,
  Lock,
  ArrowRight
} from "lucide-react";
import DateUsage from "./date/dateUsage";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const TOTAL_TABLES = 20;
const CHAIRS_PER_TABLE = 9;
const TABLES = Array.from({ length: TOTAL_TABLES }, (_, i) => `T${i + 1}`);
const CHAIRS = Array.from({ length: CHAIRS_PER_TABLE }, (_, i) => `Chr${i + 1}`);

// ─── BACKGROUND COMPONENT ────────────────────────────────────────────────────
const NeonGalaxyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#030514]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#110a2b_0%,_#030514_100%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#4c1d95] opacity-20 blur-[120px] mix-blend-screen" style={{ animation: 'float 12s ease-in-out infinite' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#1e3a8a] opacity-20 blur-[150px] mix-blend-screen" style={{ animation: 'float 15s ease-in-out infinite reverse' }} />
      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#312e81] opacity-30 blur-[100px] mix-blend-screen" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_6px_1px_#ffffff]"
            style={{
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              width: `${size}px`, height: `${size}px`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.1,
            }}
          />
        );
      })}
    </div>
  );
};

// ─── TIME & DATE UTILITIES ───────────────────────────────────────────────────

// Linear time parser for overlap logic (relative to the business day)
const parseTime = (timeStr) => {
  if (!timeStr) return -1;
  const [h, m] = timeStr.split(':').map(Number);
  const adjustedHour = h < 12 ? h + 24 : h; 
  return adjustedHour * 60 + m;
};

// Generate the dropdown options with "Next Day" tags
const generateTimeOptions = () => {
  const options = [];
  for (let i = 20; i <= 28; i++) {
    for (let m of ['00', '30']) {
      if (i === 28 && m === '30') continue; // Stop exactly at 4:00 AM
      const hour24 = i % 24;
      const displayHour = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
      const ampm = i >= 24 ? 'AM' : 'PM';
      const isNextDay = i >= 24;
      const value = `${hour24.toString().padStart(2, '0')}:${m}`;
      options.push({ value, label: `${displayHour}:${m} ${ampm} ${isNextDay ? '(Next Day)' : ''}` });
    }
  }
  return options;
};

const TIME_OPTIONS = generateTimeOptions();

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function EventForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    totalPeople: "",
    date: "", // Will sync with the first date from DateUsage
    fromTime: "",
    toTime: "",
  });

  const [selectedDates, setSelectedDates] = useState({ from: "", to: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const totalGuests = parseInt(formData.totalPeople) || 0;
  const isMaxGuestsReached = totalGuests > 0 && selectedSeats.length >= totalGuests;

  // ─── API HANDLERS: GET (Fetch Unavailable Seats) ───
  const fetchUnavailableSeats = useCallback(async (selectedDate) => {
    if (!selectedDate) return [];
    
    // TODO: Replace this Mock Data with your actual GET request
    // Example: const response = await fetch(`/api/reservations?date=${selectedDate}`);
    // const data = await response.json();
    return [
      { date: selectedDate, fromTime: "20:00", toTime: "23:00", table: "T1", chr: "Chr1" },
      { date: selectedDate, fromTime: "20:00", toTime: "23:00", table: "T1", chr: "Chr2" },
      { date: selectedDate, fromTime: "22:00", toTime: "02:00", table: "T2", chr: "Chr5" },
      { date: selectedDate, fromTime: "01:00", toTime: "04:00", table: "T5", chr: "Chr9" },
    ];
  }, []);

  // ─── HANDLERS ───
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Catch date changes from the child NepaliDatePicker component
  const handleDateChange = (dates) => {
    console.log("Dates caught in parent:", dates);
    setSelectedDates(dates);
    setFormData((prev) => ({ 
      ...prev, 
      date: dates.from // Sync the 'from' date to form data for validation & API
    }));
  };

  // Calculate Overlaps for the Seating Grid
  useEffect(() => {
    const checkAvailability = async () => {
      if (!formData.date || !formData.fromTime || !formData.toTime) {
        setUnavailableSeats([]);
        return;
      }

      const reqStart = parseTime(formData.fromTime);
      const reqEnd = parseTime(formData.toTime);

      if (reqStart >= reqEnd) {
        setUnavailableSeats([]); 
        return;
      }

      // API Call happens here
      const currentBookings = await fetchUnavailableSeats(formData.date);
      
      const blocked = currentBookings.filter(res => {
        const resStart = parseTime(res.fromTime);
        const resEnd = parseTime(res.toTime);
        return reqStart < resEnd && reqEnd > resStart;
      }).map(res => `${res.table}-${res.chr}`);

      setUnavailableSeats(blocked);
      setSelectedSeats(prev => prev.filter(seat => !blocked.includes(seat)));
    };

    checkAvailability();
  }, [formData.date, formData.fromTime, formData.toTime, fetchUnavailableSeats]);

  // Trim seats if user reduces guest count
  useEffect(() => {
    if (selectedSeats.length > totalGuests) {
      setSelectedSeats(prev => prev.slice(0, totalGuests));
    }
  }, [totalGuests, selectedSeats.length]);

  const isTimeRangeValid = useMemo(() => {
    if (!formData.date || !formData.fromTime || !formData.toTime) return false;
    const reqStart = parseTime(formData.fromTime);
    const reqEnd = parseTime(formData.toTime);
    return reqStart < reqEnd;
  }, [formData.date, formData.fromTime, formData.toTime]);

  const isGridActive = formData.date && isTimeRangeValid && totalGuests > 0;

  const toggleChair = useCallback((tableId, chairId) => {
    const seatId = `${tableId}-${chairId}`;
    if (!isGridActive || unavailableSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      const isSelected = prev.includes(seatId);
      if (!isSelected && prev.length >= totalGuests) return prev;
      return isSelected ? prev.filter((id) => id !== seatId) : [...prev, seatId];
    });
  }, [unavailableSeats, isGridActive, totalGuests]);

  const toggleTableAll = useCallback((tableId) => {
    if (!isGridActive) return;
    
    const tableSeats = CHAIRS.map((chairId) => `${tableId}-${chairId}`);
    const availableTableSeats = tableSeats.filter(seat => !unavailableSeats.includes(seat));
    if (availableTableSeats.length === 0) return;

    setSelectedSeats((prev) => {
      const isAllAvailableSelected = availableTableSeats.every((seat) => prev.includes(seat));
      if (isAllAvailableSelected) {
        return prev.filter((seat) => !availableTableSeats.includes(seat));
      } else {
        const seatsToSelect = availableTableSeats.filter(seat => !prev.includes(seat));
        const remainingAllowed = totalGuests - prev.length;
        if (remainingAllowed <= 0) return prev;
        return [...prev, ...seatsToSelect.slice(0, remainingAllowed)];
      }
    });
  }, [unavailableSeats, isGridActive, totalGuests]);

  // ─── API HANDLERS: POST (Submit Reservation) ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTimeRangeValid || selectedSeats.length !== totalGuests) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Final Payload strictly structured for API submission
    const payload = {
      ...formData,
      rawDateRange: selectedDates,
      reservedSeats: selectedSeats,
      status: "pending"
    };

    try {
      console.log("Submitting API Payload:", payload);
      
     
      
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
    } catch (error) {
      console.error("Submission error", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTableSelectionState = useCallback((tableId) => {
    console.log("Calculating selection state for", tableId);
    const tableSeats = CHAIRS.map((chairId) => `${tableId}-${chairId}`);
    const availableSeats = tableSeats.filter(seat => !unavailableSeats.includes(seat));
    if (availableSeats.length === 0) return "unavailable";
    const selectedInTable = availableSeats.filter((seat) => selectedSeats.includes(seat)).length;
    
    if (selectedInTable === 0) return "none";
    if (selectedInTable === availableSeats.length) return "all";
    return "partial";
  }, [selectedSeats, unavailableSeats]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 font-['DM_Sans'] text-white">
      <NeonGalaxyBackground />

      <div className="relative z-10 w-full max-w-[1000px] overflow-hidden rounded-[4px] border border-[#c49d52]/30 bg-[#080C18]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] mt-12 sm:mt-0 flex flex-col">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c49d52] to-transparent shrink-0" />

        <div className="relative w-full h-[160px] sm:h-[220px] shrink-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1600&auto=format&fit=crop" alt="VIP Lounge" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/50 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-10">
            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold text-white leading-none drop-shadow-lg">
              Secure Your <span className="text-[#e8c97a]">Experience</span>
            </h1>
          </div>
        </div>

        <div className="p-5 sm:p-10 flex-1 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <section>
              <h2 className="mb-6 flex items-center gap-3 font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c49d52]/30 bg-[#c49d52]/20 font-sans text-xs text-[#c49d52]">1</span>
                Details & Schedule
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>

                {/* Contact */}
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input required type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Contact Number" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>

                {/* Email */}
                <div className="relative sm:col-span-2">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>

                {/* DateTime Row */}
                <div className="relative sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                  
                  {/* Custom Nepali DatePicker Integration */}
                  <div className="relative z-50">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60 z-10 pointer-events-none" />
                    {/* The component wraps the input internally, CSS applies to its outer wrapper or internal class */}
                    <div className="relative w-full">
                      <DateUsage onChange={handleDateChange} />
                    </div>
                  </div>

                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                    <select required name="fromTime" value={formData.fromTime} onChange={handleInputChange} className="w-full appearance-none rounded-[3px] border border-[#c49d52]/30 bg-black/40 py-3.5 pl-12 pr-8 text-[14px] text-white focus:border-[#c49d52] focus:outline-none cursor-pointer backdrop-blur-sm">
                      <option value="" disabled>From Time</option>
                      {TIME_OPTIONS.map(opt => (
                        <option key={`from-${opt.value}`} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative flex items-center">
                    <ArrowRight size={16} className="hidden sm:block absolute -left-3 text-[#c49d52]/50 z-10" />
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                    <select required name="toTime" value={formData.toTime} onChange={handleInputChange} className={`w-full appearance-none rounded-[3px] border ${!isTimeRangeValid && formData.toTime ? 'border-red-500' : 'border-[#c49d52]/30'} bg-black/40 py-3.5 pl-12 pr-8 text-[14px] text-white focus:border-[#c49d52] focus:outline-none cursor-pointer backdrop-blur-sm`}>
                      <option value="" disabled>To Time</option>
                      {TIME_OPTIONS.map(opt => {
                        // Prevent selecting a To Time that is earlier than the From Time
                        const fromTs = formData.fromTime ? parseTime(formData.fromTime) : 0;
                        const optTs = parseTime(opt.value);
                        const isBeforeFrom = formData.fromTime ? optTs <= fromTs : false;
                        
                        return <option key={`to-${opt.value}`} value={opt.value} disabled={isBeforeFrom}>{opt.label}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="relative sm:col-span-2">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input required type="number" min="1" max="180" name="totalPeople" value={formData.totalPeople} onChange={handleInputChange} placeholder="Total Number of Guests" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>
              </div>
            </section>

            <div className="h-px w-full bg-[#c49d52]/20" />

            <section>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-3 font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c49d52]/30 bg-[#c49d52]/20 font-sans text-xs text-[#c49d52]">2</span>
                  Select Seating
                </h2>
                
                {isGridActive && (
                  <div className={`inline-flex items-center justify-between rounded-[3px] border px-4 py-2 text-sm backdrop-blur-sm ${selectedSeats.length === totalGuests ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-[#c49d52]/30 bg-[#c49d52]/10 text-[#c49d52]"}`}>
                    <span>Seats Selected:</span>
                    <strong className="ml-2 text-lg text-white">
                      {selectedSeats.length} <span className="text-sm font-normal opacity-70">/ {totalGuests}</span>
                    </strong>
                  </div>
                )}
              </div>

              {!isGridActive ? (
                <div className="rounded-[4px] border border-[#c49d52]/20 bg-[#c49d52]/5 p-8 text-center backdrop-blur-sm">
                  <Users size={32} className="mx-auto mb-3 text-[#c49d52]/50" />
                  <p className="text-sm text-white/70">
                    Please provide your <strong className="text-[#c49d52]">Total Guests</strong>, <strong className="text-[#c49d52]">Date</strong>, and a valid <strong className="text-[#c49d52]">Time Range</strong> above to unlock table selection.
                  </p>
                </div>
              ) : (
                <div className="grid max-h-[45vh] grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-4 custom-scrollbar">
                  {TABLES.map((tableId) => {
                    const selectionState = getTableSelectionState(tableId);
                    const isFullyBooked = selectionState === "unavailable";

                    return (
                      <div key={tableId} className={`rounded-[4px] border p-4 transition-all duration-300 backdrop-blur-md ${isFullyBooked ? "border-red-500/20 bg-red-500/5 opacity-70 grayscale" : selectionState === "all" ? "border-[#c49d52]/60 bg-[#c49d52]/10" : selectionState === "partial" ? "border-[#c49d52]/40 bg-white/10" : "border-white/10 bg-white/5 hover:border-[#c49d52]/30"}`}>
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-lg font-bold tracking-wide text-white">{tableId}</span>
                          {!isFullyBooked && (
                            <button type="button" onClick={() => toggleTableAll(tableId)} disabled={isMaxGuestsReached && selectionState !== "all" && selectionState !== "partial"} className={`rounded-[2px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed ${selectionState === "all" || selectionState === "partial" ? "bg-[#c49d52] text-[#080C18]" : "bg-white/10 text-white/70 hover:bg-[#c49d52]/20 hover:text-[#c49d52]"}`}>
                              {(selectionState === "all" || selectionState === "partial") ? "Clear" : "Select"}
                            </button>
                          )}
                          {isFullyBooked && <span className="text-[10px] font-bold text-red-400 uppercase">Booked</span>}
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {CHAIRS.map((chairId) => {
                            const seatId = `${tableId}-${chairId}`;
                            const isSelected = selectedSeats.includes(seatId);
                            const isUnavailable = unavailableSeats.includes(seatId);
                            const isChairDisabled = isUnavailable || (!isSelected && isMaxGuestsReached);

                            return (
                              <button key={chairId} type="button" disabled={isChairDisabled} onClick={() => toggleChair(tableId, chairId)} className={`flex aspect-square min-h-[40px] items-center justify-center rounded-[3px] text-[11px] font-bold transition-all duration-200 ${isUnavailable ? "bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed" : isSelected ? "scale-105 bg-[#c49d52] text-[#080C18] shadow-[0_0_12px_rgba(196,157,82,0.5)] border border-[#c49d52]" : isChairDisabled ? "border border-white/5 bg-black/20 text-white/20 cursor-not-allowed" : "border border-white/5 bg-black/40 text-white/40 hover:border-[#c49d52]/50 hover:text-[#c49d52]"}`}>
                                {isUnavailable ? <Lock size={12} className="opacity-60" /> : isSelected ? <Check size={14} strokeWidth={3} /> : chairId.replace('Chr', '')}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {submitStatus === "success" && (
              <div className="rounded-[3px] border border-green-500/30 bg-green-500/10 p-4 text-center text-sm font-medium text-green-400">Booking request submitted successfully! We will contact you shortly.</div>
            )}
            
            {submitStatus === "error" && (
              <div className="rounded-[3px] border border-red-500/30 bg-red-500/10 p-4 text-center text-sm font-medium text-red-400">Failed to submit booking. Please try again.</div>
            )}

            <button type="submit" disabled={isSubmitting || submitStatus === "success" || !isGridActive || selectedSeats.length !== totalGuests} className="group relative flex w-full items-center justify-center gap-2 rounded-[3px] py-4 sm:py-5 text-[14px] font-bold uppercase tracking-[0.15em] text-[#02040a] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(216,166,58,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none" style={{ background: "linear-gradient(135deg, #fff3b5 0%, #d8a63a 35%, #b67c18 55%, #7a4d0d 100%)" }}>
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : "Confirm Reservation"}
            </button>

          </form>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(196, 157, 82, 0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(196, 157, 82, 0.6); }
        select option { background-color: #080C18; color: white; }
        
        /* Forces DatePicker to adopt theme styles smoothly */
        .ndp-panel { border-radius: 8px !important; }
        #booking-range {
          width: 100%;
          border-radius: 3px;
          border: 1px solid rgba(196, 157, 82, 0.3);
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.875rem 1rem 0.875rem 3rem; /* 3rem left padding leaves room for the absolute calendar icon */
          font-size: 14px;
          color: white;
          outline: none;
          backdrop-filter: blur(4px);
        }
        #booking-range:focus {
          border-color: #c49d52;
        }
      `}</style>
    </div>
  );
}