import React, { useState, useCallback, useEffect } from "react";
import {
  User,
  Users,
  Calendar,
  Check,
  Loader2,
  Phone,
  Mail,
  Lock,
  Star,
  EyeOff,
  Info,
  AlertCircle
} from "lucide-react";
import DateUsage from "./date/dateUsage";
import { table } from "framer-motion/client";
import { getAllOpenings, getAllReservation, booking } from "./calendar/api/api";

// ─── CUSTOM TABLE CONFIGURATION ──────────────────────────────────────────────
const createSeats = (count) =>
  Array.from({ length: count }, (_, i) => `S${i + 1}`);

const SEAT_DATA = [
  { table: "V1", comfort: true, secret: false, seats: createSeats(8) },
  { table: "V2", comfort: true, secret: false, seats: createSeats(8) },
  { table: "A", comfort: true, secret: false, seats: createSeats(8) },
  { table: "B", comfort: true, secret: false, seats: createSeats(8) },
  { table: "T1", comfort: false, secret: false, seats: createSeats(8) },
  { table: "T2", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T3", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T4", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T5", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T6", comfort: false, secret: false, seats: createSeats(6) },
  { table: "C", comfort: true, secret: false, seats: createSeats(6) },
  { table: "D", comfort: true, secret: false, seats: createSeats(6) },
  { table: "T7", comfort: true, secret: false, seats: createSeats(7) },
  { table: "T8", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T9", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T10", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T11", comfort: false, secret: false, seats: createSeats(6) },
  { table: "T12", comfort: false, secret: false, seats: createSeats(6) },
  { table: "V3", comfort: false, secret: true, seats: createSeats(8) },
  { table: "T16", comfort: true, secret: false, seats: createSeats(6) },
  { table: "T17", comfort: true, secret: false, seats: createSeats(6) }
];

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

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function EventForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    date: "",
  });

  const [selectedDates, setSelectedDates] = useState({ from: "", to: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Dynamic API State
  const [apiOpenings, setApiOpenings] = useState([]);
  const [apiReservations, setApiReservations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [unopenedSeats, setUnopenedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [availabilityStats, setAvailabilityStats] = useState(null);
  const [openSeatTimes, setOpenSeatTimes] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [ErrorMsg, setErrorMsg] = useState("")

  const isGridActive = Boolean(formData.date);

  // Load and Filter Live Data API
  const loadData = useCallback(async () => {
    setIsFetching(true);
    try {
      const [openingRes, reservationRes] = await Promise.all([
        getAllOpenings(),
        getAllReservation(),
      ]);

      // Flatten Openings 
      if (openingRes && openingRes.message) {
        const availableSeats = openingRes.message.flatMap(opening =>
          opening.tables.flatMap(table =>
            table.seats.map(seat => ({
              date: opening.date,
              table: table.table,
              seat: seat.seat,
              fromTime: seat.fromTime,
              toTime: seat.toTime
            }))
          )
        );
        setApiOpenings(availableSeats);
      }

      // Flatten Reservations
      if (reservationRes && reservationRes.data) {
        const reservedSeats = reservationRes.data.flatMap((reservation) =>
          reservation.reservedSeats.map((seat, index) => ({
            id: `BK_${index + 1}`,
            date: reservation.date,
            fromTime: reservation.fromTime,
            toTime: reservation.toTime,
            table: seat.table,
            seat: seat.seat,
          }))
        );
        setApiReservations(reservedSeats);
      }
    } catch (error) {
      console.error("Failed to load API data", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Fetch initial Data on Mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const fetchUnavailableSeats = useCallback(async (selectedDate) => {
    if (!selectedDate) return { unopened: [], booked: [], stats: null, times: {} };

    const [uY, uM, uD] = selectedDate.split(/[-/]/).map(Number);
    if (!uY || !uM || !uD) return { unopened: [], booked: [], stats: null, times: {} };

    // Compare with dynamic apiOpenings and apiReservations instead of Mock data
    const explicitOpen = apiOpenings.filter(slot => {
      const [sY, sM, sD] = slot.date.split(/[-/]/).map(Number);
      return uY === sY && uM === sM && uD === sD;
    });

    const explicitBooked = apiReservations.filter(slot => {
      const [sY, sM, sD] = slot.date.split(/[-/]/).map(Number);
      return uY === sY && uM === sM && uD === sD;
    });

    const allSeatIds = SEAT_DATA.flatMap(t => t.seats.map(s => `${t.table}-${s}`));

    let unopened = [];
    let booked = [];
    let explicitlyOpenCount = 0;
    let times = {};

    allSeatIds.forEach(seatId => {
      const openSlots = explicitOpen.filter(o => `${o.table}-${o.seat}` === seatId);
      const bookedSlots = explicitBooked.filter(b => `${b.table}-${b.seat}` === seatId);

      if (openSlots.length > 0) {
        explicitlyOpenCount++;
        times[seatId] = `${openSlots[0].fromTime} - ${openSlots[0].toTime}`;

        if (bookedSlots.length > 0) {
          booked.push(seatId);
        }
      } else {
        unopened.push(seatId);
      }
    });

    const stats = {
      totalOpen: explicitlyOpenCount,
      available: explicitlyOpenCount - booked.length,
      show: explicitlyOpenCount > 0
    };

    return { unopened, booked, stats, times };
  }, [apiOpenings, apiReservations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateData) => {
    let dateString = "";
    if (dateData && typeof dateData === "object") dateString = dateData.from || "";
    else if (typeof dateData === "string") dateString = dateData;

    setSelectedDates(dateData);
    setFormData((prev) => ({ ...prev, date: dateString }));
  };

  useEffect(() => {
    let isMounted = true;

    const checkAvailability = async () => {
      if (!formData.date) {
        if (isMounted) {
          setUnopenedSeats([]);
          setBookedSeats([]);
          setAvailabilityStats(null);
          setOpenSeatTimes({});
        }
        return;
      }

      const { unopened, booked, stats, times } = await fetchUnavailableSeats(formData.date);

      if (isMounted) {
        setUnopenedSeats(unopened);
        setBookedSeats(booked);
        setAvailabilityStats(stats);
        setOpenSeatTimes(times);

        // Deselect any seats that might have become unavailable
        setSelectedSeats(prev => prev.filter(seat => !unopened.includes(seat) && !booked.includes(seat)));
      }
    };

    checkAvailability();
    return () => { isMounted = false; };
  }, [formData.date, fetchUnavailableSeats]);

  const toggleChair = useCallback((tableId, seatName) => {
    const seatId = `${tableId}-${seatName}`;
    const isUnavailable = unopenedSeats.includes(seatId) || bookedSeats.includes(seatId);

    if (!isGridActive || isUnavailable) return;

    setSelectedSeats((prev) => {
      const isSelected = prev.includes(seatId);
      return isSelected ? prev.filter((id) => id !== seatId) : [...prev, seatId];
    });
  }, [unopenedSeats, bookedSeats, isGridActive]);

  const toggleTableAll = useCallback((tableObj) => {
    if (!isGridActive) return;

    const tableSeats = tableObj.seats.map((seatId) => `${tableObj.table}-${seatId}`);
    const availableTableSeats = tableSeats.filter(seat => !unopenedSeats.includes(seat) && !bookedSeats.includes(seat));

    if (availableTableSeats.length === 0) return;

    setSelectedSeats((prev) => {
      const isAllAvailableSelected = availableTableSeats.every((seat) => prev.includes(seat));
      if (isAllAvailableSelected) {
        return prev.filter((seat) => !availableTableSeats.includes(seat));
      } else {
        const seatsToSelect = availableTableSeats.filter(seat => !prev.includes(seat));
        return [...prev, ...seatsToSelect];
      }
    });
  }, [unopenedSeats, bookedSeats, isGridActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION: Fields & Selection
    if (
      !formData.fullName.trim() ||
      !formData.contactNumber.trim() ||
      !formData.email.trim() ||
      !formData.date ||
      selectedSeats.length === 0
    ) {
      setSubmitStatus("validation_error");
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMsg("");
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMsg("");

    // Double-check availability before submitting
    const { unopened, booked } = await fetchUnavailableSeats(formData.date);
    const combinedUnavailable = [...unopened, ...booked];
    const hasConflict = selectedSeats.some(seat => combinedUnavailable.includes(seat));

    if (hasConflict) {
      setSubmitStatus("conflict_error");
      setTimeout(() => setSubmitStatus(null), 2000);
      setIsSubmitting(false);
      setUnopenedSeats(unopened);
      setBookedSeats(booked);
      setSelectedSeats(prev => prev.filter(seat => !combinedUnavailable.includes(seat)));
      return;
    }

    // CONSTRUCT FINAL API PAYLOAD
    const payload = {
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      date: formData.date,
      totalPeople: selectedSeats.length,
      fromTime: "",
      toTime: "",
      reservedSeats: selectedSeats.map((seatId) => {
        const [table, seat] = seatId.split("-");
        const timeRange = openSeatTimes[seatId] || "";
        const [fromTime = "", toTime = ""] = timeRange.split(" - ");

        return {
          table,
          seat,
          fromTime: fromTime.trim(),
          toTime: toTime.trim(),
        };
      }),
    };

    try {
      const res = await booking(payload)
      console.log(res)
      setSubmitStatus("success");
      await loadData();

      setFormData({ fullName: "", contactNumber: "", email: "", date: "" });
      setSelectedSeats([]);

      setTimeout(() => setSubmitStatus(null), 2000);

    } catch (error) {
      if (error?.status === 409) {
        setErrorMsg(error?.message);
      } else {
        setSubmitStatus('error');
      }
      
      // Auto-disappear logic applied here
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMsg("");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTableSelectionState = useCallback((tableObj) => {
    const tableSeats = tableObj.seats.map((seatId) => `${tableObj.table}-${seatId}`);
    const availableSeats = tableSeats.filter(seat => !unopenedSeats.includes(seat) && !bookedSeats.includes(seat));

    if (availableSeats.length === 0) return "unavailable";

    const selectedInTable = availableSeats.filter((seat) => selectedSeats.includes(seat)).length;

    if (selectedInTable === 0) return "none";
    if (selectedInTable === availableSeats.length) return "all";
    return "partial";
  }, [selectedSeats, unopenedSeats, bookedSeats]);

  const isClubClosed = isGridActive && availabilityStats && availabilityStats.totalOpen === 0;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 font-['DM_Sans'] text-white"
    id="event"
    >
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

            {/* SECTION 1: Details */}
            <section>
              <h2 className="mb-6 flex items-center gap-3 font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c49d52]/30 bg-[#c49d52]/20 font-sans text-xs text-[#c49d52]">1</span>
                Details & Schedule
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>

                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Contact Number" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>

                <div className="relative sm:col-span-2">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full rounded-[3px] border border-[#c49d52]/30 bg-white/5 py-3.5 pl-12 pr-4 text-[14px] text-white focus:border-[#c49d52] focus:outline-none backdrop-blur-sm" />
                </div>

                <div className="relative sm:col-span-2">
                  <div className="relative z-50">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49d52]/60 z-10 pointer-events-none" />
                    <div className="relative w-full">
                      <DateUsage onChange={handleDateChange} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px w-full bg-[#c49d52]/20" />

            {/* SECTION 2: Seating */}
            <section>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-3 font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c49d52]/30 bg-[#c49d52]/20 font-sans text-xs text-[#c49d52]">2</span>
                  Select Seating
                </h2>

                {isGridActive && !isClubClosed && !isFetching && (
                  <div className={`inline-flex items-center justify-between rounded-[3px] border px-4 py-2 text-sm backdrop-blur-sm ${selectedSeats.length > 0 ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-[#c49d52]/30 bg-[#c49d52]/10 text-[#c49d52]"}`}>
                    <span>Seats Selected:</span>
                    <strong className="ml-2 text-lg text-white">
                      {selectedSeats.length}
                    </strong>
                  </div>
                )}
              </div>

              {isFetching ? (
                <div className="flex flex-col items-center justify-center rounded-[4px] border border-[#c49d52]/20 bg-[#c49d52]/5 p-12 text-center backdrop-blur-sm">
                  <Loader2 size={40} className="mb-4 text-[#c49d52] animate-spin" />
                  <h3 className="text-lg font-bold text-[#c49d52] mb-1">Syncing Live Availability</h3>
                  <p className="text-sm text-white/60">Fetching table structures and schedules...</p>
                </div>
              ) : !isGridActive ? (
                <div className="rounded-[4px] border border-[#c49d52]/20 bg-[#c49d52]/5 p-8 text-center backdrop-blur-sm">
                  <Users size={32} className="mx-auto mb-3 text-[#c49d52]/50" />
                  <p className="text-sm text-white/70 mb-4">
                    Please select a Date above to unlock table selection.
                  </p>
                </div>
              ) : isClubClosed ? (
                <div className="rounded-[4px] border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                  <AlertCircle size={36} className="mx-auto mb-4 text-red-400/80" />
                  <h3 className="text-lg font-bold text-red-400 mb-2">No Availability</h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto">
                    There are no open tables listed for this specific date. Please modify your schedule.
                  </p>
                </div>
              ) : (
                <>
                  {availabilityStats?.show && (
                    <div className="mb-6 flex items-center justify-center gap-2 rounded-[3px] border border-[#c49d52]/40 bg-[#c49d52]/10 p-3 text-sm text-[#e8c97a] shadow-[0_0_15px_rgba(196,157,82,0.1)]">
                      <Info size={16} />
                      <span>
                        Available <strong className="mx-1 text-white">{availabilityStats.available}</strong> out of <strong className="mx-1 text-white">{availabilityStats.totalOpen}</strong> total open bookings today.
                      </span>
                    </div>
                  )}

                  <div className="grid max-h-[45vh] grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-4 custom-scrollbar">
                    {SEAT_DATA.map((tableObj) => {
                      const tableId = tableObj.table;
                      const selectionState = getTableSelectionState(tableObj);
                      const isFullyUnavailable = selectionState === "unavailable";

                      const tableSeats = tableObj.seats.map(s => `${tableId}-${s}`);
                      const isCompletelyUnopened = tableSeats.every(seat => unopenedSeats.includes(seat));

                      // HIDE OUT-OF-RANGE TABLES COMPLETELY
                      if (isFullyUnavailable && isCompletelyUnopened) {
                        return null;
                      }

                      return (
                        <div key={tableId} className={`rounded-[4px] border p-4 transition-all duration-300 backdrop-blur-md flex flex-col
                          ${isFullyUnavailable
                            ? (isCompletelyUnopened ? "border-white/5 bg-white/5 opacity-50 grayscale" : "border-red-500/20 bg-red-500/5 opacity-80 grayscale")
                            : selectionState === "all" ? "border-[#c49d52]/60 bg-[#c49d52]/10"
                              : selectionState === "partial" ? "border-[#c49d52]/40 bg-white/10"
                                : "border-white/10 bg-white/5 hover:border-[#c49d52]/30"}`}>

                          <div className="mb-3 flex items-start justify-between border-b border-white/10 pb-3">
                            <div className="flex flex-col gap-1.5">
                              {/* EXPLICIT TABLE NAME */}
                              <span className="text-lg font-bold tracking-wide text-white leading-none">
                                Table {tableId}
                              </span>
                            </div>

                            {!isFullyUnavailable && (
                              <button type="button" onClick={() => toggleTableAll(tableObj)} className={`mt-1 rounded-[2px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${selectionState === "all" || selectionState === "partial" ? "bg-[#c49d52] text-[#080C18]" : "bg-white/10 text-white/70 hover:bg-[#c49d52]/20 hover:text-[#c49d52]"}`}>
                                {(selectionState === "all" || selectionState === "partial") ? "Clear" : "Select"}
                              </button>
                            )}
                            {isFullyUnavailable && (
                              <span className={`mt-1 text-[10px] font-bold uppercase ${isCompletelyUnopened ? 'text-white/40' : 'text-red-400'}`}>
                                {isCompletelyUnopened ? 'Closed' : 'Booked'}
                              </span>
                            )}
                          </div>

                          {/* EXPLICIT CHAIRS LABEL */}
                          <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2 font-semibold">
                            Chairs
                          </div>

                          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-auto">
                            {tableObj.seats.map((seatName) => {
                              const seatId = `${tableId}-${seatName}`;
                              const isSelected = selectedSeats.includes(seatId);
                              const isBooked = bookedSeats.includes(seatId);
                              const isUnopened = unopenedSeats.includes(seatId);
                              const isUnavailable = isBooked || isUnopened;

                              return (
                                <button
                                  key={seatName}
                                  type="button"
                                  disabled={isUnavailable}
                                  onClick={() => toggleChair(tableId, seatName)}
                                  className={`flex flex-col min-h-[54px] w-full py-1.5 px-1 items-center justify-center rounded-[3px] transition-all duration-200 
                                    ${isBooked ? "bg-red-500/10 border border-red-500/20 cursor-not-allowed"
                                      : isUnopened ? "border border-white/5 bg-black/60 text-white/20 cursor-not-allowed"
                                        : isSelected ? "scale-105 bg-[#c49d52] shadow-[0_0_12px_rgba(196,157,82,0.5)] border border-[#c49d52]"
                                          : "border border-white/5 bg-black/40 hover:border-[#c49d52]/50"}`}
                                >
                                  {/* RENDER CHAIR NAME EXPLICITLY (S1, S2, etc.) */}
                                  <span className={`text-[11px] font-bold flex items-center justify-center 
                                    ${isBooked ? "text-red-400"
                                      : isSelected ? "text-[#080C18]"
                                        : "text-white/70"}`}>
                                    {isBooked ? <Lock size={12} />
                                      : isUnopened ? <Lock size={12} className="opacity-40" />
                                        : isSelected ? <Check size={14} strokeWidth={3} />
                                          : seatName}
                                  </span>

                                  {/* TIME DISPLAY */}
                                  {!isUnopened && openSeatTimes[seatId] && (
                                    <span className={`text-[8.5px] mt-1 text-center font-normal tracking-tight flex flex-col gap-[1px]
                                      ${isSelected ? "text-[#080C18]/80"
                                        : isBooked ? "text-red-400/80"
                                          : "text-white/60"}`}>
                                      <span>{openSeatTimes[seatId].split(' - ')[0]}</span>
                                      <span>to {openSeatTimes[seatId].split(' - ')[1]}</span>
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>

            {/* DYNAMIC TIMEOUT MESSAGES */}
            {submitStatus === "validation_error" && (
              <div className="rounded-[3px] border border-yellow-500/30 bg-yellow-500/10 p-4 text-center text-sm font-medium text-yellow-400">Please complete all contact details and select at least one seat before proceeding.</div>
            )}

            {submitStatus === "conflict_error" && (
              <div className="rounded-[3px] border border-orange-500/30 bg-orange-500/10 p-4 text-center text-sm font-medium text-orange-400">One or more of your selected seats just became unavailable. Please select new seats.</div>
            )}

            {submitStatus === "success" && (
              <div className="rounded-[3px] border border-green-500/30 bg-green-500/10 p-4 text-center text-sm font-medium text-green-400">Booking request submitted successfully! We will contact you shortly.</div>
            )}

            {submitStatus === "error" && (
              <div className="rounded-[3px] border border-red-500/30 bg-red-500/10 p-4 text-center text-sm font-medium text-red-400">Failed to submit booking. Please try again.</div>
            )}
            
            {ErrorMsg && (
              <div className="rounded-[3px] border border-red-500/30 bg-red-500/10 p-4 text-center text-sm font-medium text-red-400">{ErrorMsg}</div>
            )}

            <button type="submit" disabled={isSubmitting || submitStatus === "success" || !isGridActive || isClubClosed || isFetching} className="group relative flex w-full items-center justify-center gap-2 rounded-[3px] py-4 sm:py-5 text-[14px] font-bold uppercase tracking-[0.15em] text-[#02040a] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(216,166,58,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none" style={{ background: "linear-gradient(135deg, #fff3b5 0%, #d8a63a 35%, #b67c18 55%, #7a4d0d 100%)" }}>
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
        
        .ndp-panel { border-radius: 8px !important; }
        #booking-range {
          width: 100%;
          border-radius: 3px;
          border: 1px solid rgba(196, 157, 82, 0.3);
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.875rem 1rem 0.875rem 3rem;
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