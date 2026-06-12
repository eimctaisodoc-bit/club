import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  getBsDisplayData,
  getMonthDays,
  getPreviousBsMonth,
  getNextBsMonth,
} from "./calendar.js";
import { saveSeatOpenings, getAllOpenings, getAllReservation } from "./api/api.js";

// ─── DYNAMIC TABLES SETUP ───
const createSeats = (count) =>
  Array.from({ length: count }, (_, i) => `S${i + 1}`);

const tables = [
  { table: "V1", comfort: true, seats: createSeats(8) },
  { table: "V2", comfort: true, seats: createSeats(8) },
  { table: "A", comfort: true, seats: createSeats(8) },
  { table: "B", comfort: true, seats: createSeats(8) },
  { table: "T1", comfort: false, seats: createSeats(6) },
  { table: "T2", comfort: false, seats: createSeats(6) },
  { table: "T3", comfort: false, seats: createSeats(6) },
  { table: "T4", comfort: false, seats: createSeats(6) },
  { table: "T5", comfort: false, seats: createSeats(6) },
  { table: "T6", comfort: false, seats: createSeats(6) },
  { table: "C", comfort: true, seats: createSeats(6) },
  { table: "D", comfort: true, seats: createSeats(6) },
  { table: "T7", comfort: true, seats: createSeats(7) },
  { table: "T8", comfort: false, seats: createSeats(6) },
  { table: "T9", comfort: false, seats: createSeats(6) },
  { table: "T10", comfort: false, seats: createSeats(6) },
  { table: "T11", comfort: false, seats: createSeats(6) },
  { table: "T12", comfort: false, seats: createSeats(6) },
  { table: "V3", secret: true, seats: createSeats(8) },
  { table: "T16", comfort: true, seats: createSeats(6) },
  { table: "T17", comfort: true, seats: createSeats(6) }
];

const TOTAL_SEATS = tables.reduce((acc, t) => acc + t.seats.length, 0);

const tableStructures = tables.map((t) => ({
  tableId: t.table,
  comfort: t.comfort,
  secret: t.secret,
  seats: t.seats.map((s) => ({
    id: s,
    compositeId: `${t.table}-${s}`,
  })),
}));

// ─── TIME OPTIONS & VALIDATION ───
const TIME_OPTIONS = [
  "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
  "12:00 AM (Next Day)", "12:30 AM (Next Day)", "01:00 AM (Next Day)", "01:30 AM (Next Day)",
  "02:00 AM (Next Day)", "02:30 AM (Next Day)", "03:00 AM (Next Day)", "03:30 AM (Next Day)",
  "04:00 AM (Next Day)", "04:30 AM (Next Day)",
];

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const isNextDay = timeStr.includes("(Next Day)");
  const cleanStr = timeStr.replace(" (Next Day)", "");
  const [time, modifier] = cleanStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (hours === 12) {
    hours = modifier === "AM" ? 0 : 12;
  } else if (modifier === "PM") {
    hours += 12;
  }
  return (hours * 60) + minutes + (isNextDay ? 1440 : 0);
};

// HELPER: Calculates exact duration/expiry from start and end times
const calculateDuration = (fromStr, toStr) => {
  if (!fromStr || !toStr || fromStr === "N/A" || toStr === "N/A") return "N/A";
  const fromMins = parseTimeToMinutes(fromStr);
  const toMins = parseTimeToMinutes(toStr);
  let diff = toMins - fromMins;
  if (diff <= 0) return "Invalid";
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  return `${hrs}h ${mins}m`;
};

// HELPER: Flattens API reservations and cross-references openings for time slots
const flattenBookings = (apiReservations, apiOpenings) => {
  const flat = [];
  
  apiReservations.forEach((booking) => {
    const dayConfig = apiOpenings.find(o => o.date === booking.date);

    booking.reservedSeats.forEach((rs) => {
      let seatFromTime = booking.fromTime;
      let seatToTime = booking.toTime;

      // Look up the exact configured time in the openings API data if missing
      if (dayConfig) {
        const tableConfig = dayConfig.tables.find(t => t.table === rs.table);
        if (tableConfig) {
          const seatConfig = tableConfig.seats.find(s => s.seat === rs.seat);
          if (seatConfig) {
            if (!seatFromTime) seatFromTime = seatConfig.fromTime;
            if (!seatToTime) seatToTime = seatConfig.toTime;
          }
        }
      }

      flat.push({
        id: `${booking._id}-${rs.table}-${rs.seat}`,
        name: booking.fullName,
        contact: booking.contactNumber || "N/A",
        email: booking.email,
        date: booking.date,
        totalPeople: booking.totalPeople,
        fromTime: seatFromTime || "N/A",
        toTime: seatToTime || "N/A",
        table: rs.table,
        seat: rs.seat,
        compositeId: `${rs.table}-${rs.seat}`
      });
    });
  });
  return flat;
};

const DynamicCalendar = () => {
  const initialData = useMemo(() => getBsDisplayData(), []);

  const [year, setYear] = useState(initialData.today.bsYear);
  const [monthIndex, setMonthIndex] = useState(initialData.today.bsMonthIndex);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewingGridBookings, setViewingGridBookings] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  // ─── API STATE ───
  const [apiOpenings, setApiOpenings] = useState([]);
  const [apiReservations, setApiReservations] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ─── DRAFT STATE (For Drawer) ───
  const [draftSelection, setDraftSelection] = useState([]);
  const [draftSeatTimes, setDraftSeatTimes] = useState({});

  // Global defaults for fast batch assignment
  const [globalTimeFrom, setGlobalTimeFrom] = useState("08:30 PM");
  const [globalTimeTo, setGlobalTimeTo] = useState("04:00 AM (Next Day)");

  // ─── DATA FETCHING ───
  const loadData = async () => {
    setIsFetching(true);
    try {
      const [openingRes, reservationRes] = await Promise.all([
        getAllOpenings(),
        getAllReservation(),
      ]);

      if (openingRes && openingRes.message) {
        setApiOpenings(openingRes.message); 
      }
      if (reservationRes && reservationRes.data) {
        setApiReservations(reservationRes.data); 
      }
    } catch (error) {
      console.error("Failed to load API data", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = viewingGridBookings ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [viewingGridBookings]);

  const monthDays = useMemo(() => {
    const isCurrentMonth = year === initialData.today.bsYear && monthIndex === initialData.today.bsMonthIndex;
    const todayBsDate = isCurrentMonth ? initialData.today.bsDate : null;
    return getMonthDays(year, monthIndex, todayBsDate);
  }, [year, monthIndex, initialData.today]);

  // ─── DERIVED CALENDAR STATS ───
  const calendarStatsForMonth = useMemo(() => {
    return monthDays.reduce((acc, day) => {
      const dateStr = day.bsDateFormatted;
      
      const dayOpening = apiOpenings.find(o => o.date === dateStr);
      const openedIds = [];
      const seatTimeData = {};
      
      if (dayOpening && dayOpening.tables) {
        dayOpening.tables.forEach(t => {
          t.seats.forEach(s => {
            const compId = `${t.table}-${s.seat}`;
            openedIds.push(compId);
            seatTimeData[compId] = { from: s.fromTime, to: s.toTime };
          });
        });
      }

      const dayReservations = apiReservations.filter(r => r.date === dateStr);
      const bookedIds = [];
      dayReservations.forEach(r => {
        r.reservedSeats.forEach(rs => {
          bookedIds.push(`${rs.table}-${rs.seat}`);
        });
      });

      acc[dateStr] = {
        isOpen: openedIds.length > 0,
        openedCount: openedIds.length,
        bookedCount: bookedIds.length,
        openedIds: openedIds,
        bookedIds: bookedIds,
        seatTimeData: seatTimeData 
      };
      return acc;
    }, {});
  }, [monthDays, apiOpenings, apiReservations]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setDraftSelection([]);
      setDraftSeatTimes({});
    }, 300);
  };

  const handleDateClick = (dayItem) => {
    const stats = calendarStatsForMonth[dayItem.bsDateFormatted];
    
    setDraftSelection([...stats.openedIds]);
    
    const initializedTimes = {};
    stats.openedIds.forEach(id => {
      initializedTimes[id] = stats.seatTimeData[id] || { from: "08:30 PM", to: "04:00 AM (Next Day)" };
    });
    setDraftSeatTimes(initializedTimes);

    setGlobalTimeFrom("08:30 PM");
    setGlobalTimeTo("04:00 AM (Next Day)");

    setSelectedDate(dayItem);
    setIsDrawerOpen(true);
  };

  // ─── TOGGLE CONTROLS ───
  const toggleSeatOpening = (compositeId, isAlreadyBooked) => {
    if (isAlreadyBooked) return;

    const isCurrentlyOpened = draftSelection.includes(compositeId);
    if (isCurrentlyOpened) {
      setDraftSelection(prev => prev.filter(id => id !== compositeId));
    } else {
      setDraftSelection(prev => [...prev, compositeId]);
      setDraftSeatTimes(prev => ({
        ...prev,
        [compositeId]: { from: globalTimeFrom, to: globalTimeTo }
      }));
    }
  };

  const toggleTableOpening = (tableSeats, bookedSeatsList) => {
    const availableToToggle = tableSeats.map(s => s.compositeId).filter(id => !bookedSeatsList.includes(id));
    if (availableToToggle.length === 0) return;

    const allAvailableAreOpened = availableToToggle.every((id) => draftSelection.includes(id));

    if (allAvailableAreOpened) {
      setDraftSelection(prev => prev.filter(id => !availableToToggle.includes(id)));
    } else {
      setDraftSelection(prev => Array.from(new Set([...prev, ...availableToToggle])));
      setDraftSeatTimes(prev => {
        const nt = { ...prev };
        availableToToggle.forEach(id => {
          if (!nt[id]) nt[id] = { from: globalTimeFrom, to: globalTimeTo };
        });
        return nt;
      });
    }
  };

  const handleIndividualSeatTimeChange = (compositeId, field, value) => {
    setDraftSeatTimes(prev => ({
      ...prev,
      [compositeId]: {
        ...prev[compositeId],
        [field]: value
      }
    }));
  };

  const hasAnyTimeError = draftSelection.some(id => {
    const st = draftSeatTimes[id];
    if (!st) return false;
    return parseTimeToMinutes(st.to) <= parseTimeToMinutes(st.from);
  });

  // ─── SAVE HANDLER ───
  const handleSaveOpenings = async () => {
    if (!selectedDate || hasAnyTimeError) return;

    setIsSaving(true);
    const targetDate = selectedDate.bsDateFormatted;

    const bookedSeatsList = calendarStatsForMonth[targetDate]?.bookedIds || [];
    const finalSelection = Array.from(new Set([...draftSelection, ...bookedSeatsList]));

    const tableGroupMap = {};

    finalSelection.forEach((compositeId) => {
      const [tableName, seatName] = compositeId.split("-");

      if (!tableGroupMap[tableName]) {
        tableGroupMap[tableName] = {
          table: tableName,
          seats: [],
        };
      }

      tableGroupMap[tableName].seats.push({
        seat: seatName,
        fromTime: draftSeatTimes[compositeId]?.from || "08:30 PM",
        toTime: draftSeatTimes[compositeId]?.to || "04:00 AM (Next Day)",
      });
    });

    const exportedData = {
      date: targetDate,
      totalSeatsConfigured: finalSelection.length,
      tables: Object.values(tableGroupMap), 
    };

    try {
      const result = await saveSeatOpenings(targetDate, exportedData);
      await loadData();
      closeDrawer();
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save configuration to database.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderCellOpeningBadge = (stats) => {
    if (!stats.isOpen) {
      return (
        <div className="text-slate-500 font-semibold text-[10px] sm:text-[11px] bg-slate-800/40 text-center py-1 rounded border border-slate-700/50 mt-auto z-10">
          Closed
        </div>
      );
    }

    return (
      <div className="space-y-1 text-[10px] sm:text-[11px] mt-auto z-10 flex flex-col">
        <div className="flex justify-between text-[#48C9B0] items-center bg-[#48C9B0]/10 px-1.5 py-0.5 rounded border border-[#48C9B0]/20">
          <span>Opened:</span>
          <span className="font-bold">{stats.openedCount} <span className="text-[8px] font-normal text-slate-500">/ {TOTAL_SEATS}</span></span>
        </div>

        {stats.bookedCount > 0 && (
          <div className="flex flex-col bg-[#D4AF37]/10 rounded border border-[#D4AF37]/20 overflow-hidden">
            <div className="flex w-full justify-between text-[#D4AF37] items-center px-1.5 py-0.5">
              <span>Booked:</span>
              <span className="font-bold">{stats.bookedCount} <span className="text-[8px] font-normal text-[#D4AF37]/70">/ {stats.openedCount}</span></span>
            </div>
            {/* Task 1: Showing specific booked seats strictly with respect to their grid date */}
            <div className="px-1.5 pb-1 text-[8px] text-[#D4AF37]/80 truncate w-full" title={stats.bookedIds.join(", ")}>
              {stats.bookedIds.join(", ")}
            </div>
          </div>
        )}
      </div>
    );
  };

  const monthName = monthDays?.[0]?.bsMonthName || "";
  const cells = [...Array(monthDays?.[0]?.dayIndex || 0).fill(null), ...monthDays];
  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] w-full bg-[#0B132B] rounded-2xl border border-[#1C2541] shadow-2xl">
        <div className="w-12 h-12 border-4 border-[#1C2541] border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
        <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm animate-pulse">Syncing Database...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#0B132B] text-slate-100 rounded-2xl border border-[#1C2541] shadow-2xl p-4 sm:p-6 font-sans">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#1C2541] pb-6 mb-6 gap-4 sm:gap-0">
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => { closeDrawer(); const prev = getPreviousBsMonth(year, monthIndex); setYear(prev.bsYear); setMonthIndex(prev.monthIndex); }} className="px-4 py-2.5 text-sm font-semibold border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
            &larr; Prev
          </button>
          <button onClick={() => { closeDrawer(); setYear(initialData.today.bsYear); setMonthIndex(initialData.today.bsMonthIndex); }} className="px-4 py-2.5 text-sm font-semibold border border-[#48C9B0]/40 rounded-lg text-[#48C9B0] hover:bg-[#48C9B0]/10 transition-all duration-300">
            Today
          </button>
        </div>

        <div className="text-center order-first sm:order-none w-full sm:w-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F1E5AC] via-[#D4AF37] to-[#F1E5AC]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {monthName} {year}
          </h2>
          <p className="text-[10px] sm:text-xs tracking-widest text-slate-400 uppercase mt-1">Admin Seat Opening Dashboard</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              const activeDay = selectedDate || monthDays.find(d => d.isToday) || monthDays[0];
              if (activeDay) {
                setFilterDate(activeDay.bsDateFormatted);
                setViewingGridBookings(true);
              }
            }}
            className="px-3 py-2.5 border border-[#D4AF37]/40 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="Preview Bookings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button onClick={() => { closeDrawer(); const next = getNextBsMonth(year, monthIndex); setYear(next.bsYear); setMonthIndex(next.monthIndex); }} className="px-5 py-2.5 text-sm font-semibold border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
            Next &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={day} className={`text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 sm:py-2.5 rounded-md ${idx === 6 ? "text-rose-400 bg-rose-950/20" : "text-slate-300 bg-[#1C2541]/50"}`}>
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {cells.map((item, index) => {
          if (!item) return <div key={`empty-${index}`} className="h-28 sm:h-32 border border-[#1C2541]/40 rounded-xl bg-[#1C2541]/10 opacity-40" />;

          const stats = calendarStatsForMonth[item.bsDateFormatted] || { isOpen: false, openedCount: 0, bookedCount: 0 };
          const isSelected = selectedDate?.bsDateFormatted === item.bsDateFormatted;
          const isPastDate = item.adDate.getTime() < todayObj.getTime() && !item.isToday;

          let cellClasses = item.isToday ? "border-green-500 bg-[#1C2541] shadow-[0_0_15px_rgba(34,197,94,0.6)] ring-1 ring-green-500 z-10" :
            isPastDate ? "border-red-500 bg-[#0B132B] opacity-80 shadow-[0_0_10px_rgba(239,68,68,0.7)] hover:opacity-100 hover:border-red-400" :
              !stats.isOpen ? "border-[#1C2541]/50 bg-[#0B132B] opacity-70 hover:opacity-100 hover:border-[#D4AF37]/40" :
                isSelected ? "border-[#D4AF37] bg-[#1C2541] shadow-[0_0_15px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37]" :
                  "border-[#48C9B0]/30 bg-[#1C2541]/40 hover:border-[#48C9B0]/60";

          return (
            <div key={item.bsDateFormatted} onClick={() => handleDateClick(item)} className={`h-28 sm:h-32 border rounded-xl p-2 sm:p-3 cursor-pointer flex flex-col transition-all duration-300 relative overflow-hidden group ${cellClasses}`}>
              {item.isToday && (
                <div className="flex justify-between items-center gap-3 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/30 mb-1">
                  <span className="text-[10px] mt-auto text-green-400 font-bold">Today</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                </div>
              )}
              {isPastDate && !item.isToday && (
                <div className="absolute top-0 right-0 bg-red-500/20 px-2 py-0.5 rounded-bl-lg border-b border-l border-red-500/30">
                  <span className="text-[8px] text-red-400 font-bold uppercase tracking-wider">Past</span>
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xl sm:text-2xl font-bold tracking-tight ${item.isToday ? "text-green-400" : isPastDate ? "text-red-400" : !stats.isOpen ? "text-slate-500" : "text-slate-100 group-hover:text-[#D4AF37]"}`}>{item.bsDate}</span>
              </div>
              <div className={`text-[10px] font-medium ${item.isToday ? "text-green-400/80" : isPastDate ? "text-red-400/70" : "text-slate-400"}`}>
                {item.adDate.toLocaleString("en-US", { month: "short", day: "numeric" })}
              </div>
              {renderCellOpeningBadge(stats)}
            </div>
          );
        })}
      </div>

      {isDrawerOpen && ReactDOM.createPortal(<div className="fixed inset-0 bg-[#0B132B]/80 z-40 transition-opacity" onClick={closeDrawer} />, document.body)}

      {/* ─── RIGHT CONFIGURATION DRAWER (SEAT SELECTION) ─── */}
      {ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          <div className={`absolute top-0 right-0 h-full w-full sm:w-[500px] bg-gradient-to-b from-[#0B132B] to-[#1C2541] border-l border-[#D4AF37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] transform transition-transform duration-500 flex flex-col pointer-events-auto ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            {selectedDate && (() => {
              const bookedSeatsList = calendarStatsForMonth[selectedDate.bsDateFormatted]?.bookedIds || [];
              const isPastDate = selectedDate.adDate.getTime() < todayObj.getTime();

              return (
                <>
                  <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/20 bg-[#0B132B]/50 backdrop-blur-sm shrink-0">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F1E5AC] to-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {selectedDate.bsMonthName} {selectedDate.bsDate}, {year}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{selectedDate.adDate.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                    <button onClick={closeDrawer} className="p-2.5 text-slate-300 hover:text-[#0B132B] hover:bg-[#D4AF37] rounded-full transition-all duration-300 bg-[#1C2541] border border-[#D4AF37]/30 cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-40 custom-scrollbar relative">
                    <div className="grid grid-cols-1 gap-5">
                      {tableStructures.map((table) => {
                        const tableOpenedSeats = table.seats.filter(s => draftSelection.includes(s.compositeId));
                        const openedCountOnTable = tableOpenedSeats.length;
                        const bookedCountOnTable = table.seats.filter(s => bookedSeatsList.includes(s.compositeId)).length;
                        const isFullyOpened = openedCountOnTable === table.seats.length;
                        const hasBookings = bookedCountOnTable > 0;

                        return (
                          <div key={table.tableId} className={`p-4 rounded-xl border flex flex-col gap-4 transition-all duration-300 ${hasBookings ? "bg-[#1C2541]/70 border-[#D4AF37]/50" : isFullyOpened ? "bg-[#1C2541]/80 border-[#48C9B0]/50 shadow-[0_0_15px_rgba(72,201,176,0.1)]" : openedCountOnTable > 0 ? "bg-[#1C2541]/50 border-[#48C9B0]/30" : "bg-[#0B132B]/80 border-[#1C2541]"}`}>
                            <button onClick={() => toggleTableOpening(table.seats, bookedSeatsList)} disabled={isPastDate} className={`flex w-full justify-between items-center border-b pb-3 outline-none group/btn ${isFullyOpened ? "border-[#48C9B0]/30" : "border-[#1C2541]"}`}>
                              <div className="flex flex-col items-start">
                                <span className={`font-black text-xl ${hasBookings ? "text-[#D4AF37]" : isFullyOpened ? "text-[#48C9B0]" : "text-slate-200"}`}>{table.tableId}</span>
                                <div className="flex gap-1 mt-1">
                                  {table.comfort && <span className="text-[8px] bg-blue-500/20 text-blue-300 px-1 py-[2px] rounded border border-blue-500/30 uppercase tracking-widest font-bold">Comfort</span>}
                                  {table.secret && <span className="text-[8px] bg-purple-500/20 text-purple-300 px-1 py-[2px] rounded border border-purple-500/30 uppercase tracking-widest font-bold">Secret</span>}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                {bookedCountOnTable > 0 && <span className="text-[9px] text-[#0B132B] font-bold bg-[#D4AF37] px-1.5 py-0.5 rounded">{bookedCountOnTable} Booked</span>}
                                {openedCountOnTable > 0 && bookedCountOnTable === 0 && <span className="text-[9px] text-slate-300 bg-[#1C2541] px-1.5 py-0.5 rounded">{openedCountOnTable}/{table.seats.length} Open</span>}
                              </div>
                            </button>

                            <div className={`grid gap-2.5 w-full ${table.seats.length >= 8 ? "grid-cols-4" : "grid-cols-3"}`}>
                              {table.seats.map((seat) => {
                                const isBooked = bookedSeatsList.includes(seat.compositeId);
                                const isOpened = draftSelection.includes(seat.compositeId);
                                return (
                                  <button key={seat.id} onClick={(e) => { e.stopPropagation(); toggleSeatOpening(seat.compositeId, isBooked); }} disabled={!isBooked && isPastDate} className={`relative flex items-center justify-center text-[11px] font-bold py-2.5 rounded-md border transition-all duration-200 outline-none ${isBooked ? "bg-[#D4AF37] text-[#0B132B] border-[#F1E5AC] cursor-default" : isOpened ? "bg-gradient-to-br from-[#48C9B0] to-[#2E866C] text-white border-[#48C9B0]" : "bg-[#1C2541]/40 text-slate-500 border-slate-700"}`}>
                                    {isBooked ? <svg className="w-4 h-4 text-[#0B132B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> : seat.id}
                                  </button>
                                );
                              })}
                            </div>

                            {tableOpenedSeats.length > 0 && (
                              <div className="w-full mt-1 pt-3 border-t border-[#1C2541] flex flex-col gap-2 animate-in fade-in max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                                {tableOpenedSeats.map(seat => {
                                  const seatTime = draftSeatTimes[seat.compositeId] || { from: globalTimeFrom, to: globalTimeTo };
                                  const seatError = parseTimeToMinutes(seatTime.to) <= parseTimeToMinutes(seatTime.from);

                                  return (
                                    <div key={seat.id} className={`flex flex-col gap-1.5 p-2.5 rounded-lg border transition-colors ${seatError ? 'border-rose-500/60 bg-rose-500/10' : 'border-slate-700/50 bg-[#0B132B]'}`}>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-[#48C9B0] bg-[#48C9B0]/10 border border-[#48C9B0]/20 px-2 py-0.5 rounded tracking-wide">
                                          Seat {seat.id}
                                        </span>
                                        {seatError && <span className="text-[9px] text-rose-400 font-bold uppercase tracking-widest">Invalid Time</span>}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <select value={seatTime.from} onChange={(e) => handleIndividualSeatTimeChange(seat.compositeId, 'from', e.target.value)} disabled={isPastDate} className={`w-full bg-[#1C2541] text-slate-200 border rounded p-1.5 text-[10px] outline-none cursor-pointer ${seatError ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-600 focus:border-[#D4AF37]'}`}>
                                          {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <span className="text-slate-500 text-[10px] font-medium px-1">to</span>
                                        <select value={seatTime.to} onChange={(e) => handleIndividualSeatTimeChange(seat.compositeId, 'to', e.target.value)} disabled={isPastDate} className={`w-full bg-[#1C2541] text-slate-200 border rounded p-1.5 text-[10px] outline-none cursor-pointer ${seatError ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-600 focus:border-[#D4AF37]'}`}>
                                          {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0B132B]/95 backdrop-blur-xl border-t border-[#D4AF37]/40">
                    <div className="flex justify-between items-center mb-5 w-full">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] font-semibold tracking-widest uppercase">Opened Seats</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[#48C9B0] text-3xl font-black">{draftSelection.length}</span>
                          <span className="text-slate-500 text-xs font-medium">/ {TOTAL_SEATS}</span>
                        </div>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[#D4AF37]/80 text-[10px] font-semibold tracking-widest uppercase">User Booked</span>
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-[#D4AF37] text-3xl font-black">{bookedSeatsList.length}</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={handleSaveOpenings} disabled={isPastDate || isSaving || hasAnyTimeError} className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-sm tracking-wide transition-all duration-300 cursor-pointer ${(isPastDate || hasAnyTimeError) ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" : isSaving ? "bg-[#D4AF37]/50 text-[#0B132B] cursor-wait" : "bg-gradient-to-r from-[#D4AF37] via-[#F1E5AC] to-[#D4AF37] text-[#0B132B] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"}`}>
                      {isPastDate ? "Past Date - View Only" : hasAnyTimeError ? "Fix Seat Time Configurations" : isSaving ? "Saving..." : "Confirm & Save Openings \u2192"}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>, document.body
      )}

      {/* ─── TOP PREVIEW DRAWER (TABLE FORMAT WITH FILTER) ─── */}
      {viewingGridBookings && ReactDOM.createPortal(<div className="fixed inset-0 bg-[#0B132B]/85 z-[70] transition-opacity backdrop-blur-sm" onClick={() => setViewingGridBookings(null)} />, document.body)}
      {ReactDOM.createPortal(
        <div className={`fixed top-0 left-0 right-0 z-[80] bg-gradient-to-b from-[#1C2541] to-[#0B132B] border-b border-[#D4AF37]/50 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[85vh] flex flex-col ${viewingGridBookings ? "translate-y-0" : "-translate-y-full"}`}>
          {viewingGridBookings && (() => {
            const filteredBookings = filterDate
              ? apiReservations.filter((b) => b.date.includes(filterDate))
              : apiReservations;

            const flatBookings = flattenBookings(filteredBookings, apiOpenings);

            return (
              <div className="w-full max-w-6xl mx-auto p-5 sm:p-6 flex flex-col max-h-[85vh] overflow-hidden">
                <div className="flex items-start justify-between border-b border-[#D4AF37]/20 pb-4 mb-4 shrink-0">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-gradient-to-br from-[#D4AF37]/20 to-[#1C2541] text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 shadow-inner">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F1E5AC] to-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Rodhi Club Booked users
                      </h3>
                    </div>

                    <div className="mt-3 pl-11 flex flex-wrap items-center gap-3">
                      <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Filter Date:
                      </label>
                      <input
                        type="text"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        placeholder="e.g. 2083-02-15"
                        className="bg-[#0B132B] border border-[#1C2541] focus:border-[#D4AF37] text-[#D4AF37] placeholder-slate-600 rounded-lg px-3 py-1.5 text-xs outline-none transition-all duration-300 w-36 shadow-inner"
                      />
                      {filterDate && (
                        <button
                          onClick={() => setFilterDate("")}
                          className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors duration-200 cursor-pointer uppercase tracking-wider font-bold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setViewingGridBookings(null)}
                    className="group flex items-center justify-center p-2.5 bg-[#1C2541] text-slate-400 hover:text-[#0B132B] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F1E5AC] rounded-full border border-[#D4AF37]/30 transition-all duration-300 cursor-pointer shadow-md"
                    title="Close preview"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="overflow-auto custom-scrollbar flex-1 pb-4 border border-[#D4AF37]/20 rounded-xl bg-[#0B132B]/90 shadow-2xl">
                  {flatBookings.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 text-sm flex flex-col items-center justify-center gap-4">
                      <div className="p-4 rounded-full bg-[#1C2541]/50 border border-slate-700">
                        <svg className="w-10 h-10 text-[#D4AF37]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <span className="text-lg font-medium text-slate-400 tracking-wide">No active user reservations cataloged for this date filter.</span>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="bg-[#1C2541] border-b border-[#D4AF37]/40 text-[11px] uppercase tracking-widest text-[#D4AF37]">
                          <th className="p-4 font-bold">Name</th>
                          <th className="p-4 font-bold">Contact</th>
                          <th className="p-4 font-bold">Email</th>
                          <th className="p-4 font-bold">Table Seat</th>
                          <th className="p-4 font-bold">Date</th>
                          <th className="p-4 font-bold">Time [From - To] & Expiry</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-[#1C2541]">
                        {flatBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-[#1C2541]/40 transition-colors duration-200 group">
                            <td className="p-4 align-middle">
                              <div className="font-bold text-slate-100">{booking.name}</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">Party of {booking.totalPeople}</div>
                            </td>
                            <td className="p-4 align-middle"><div className="text-slate-300 font-medium">{booking.contact}</div></td>
                            <td className="p-4 align-middle"><div className="text-slate-400 text-xs">{booking.email}</div></td>
                            <td className="p-4 align-middle">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B132B] border border-[#D4AF37]/30 shadow-inner">
                                <strong className="text-[#F1E5AC] text-xs font-black">{booking.table}</strong>
                                <span className="text-slate-500 text-xs">-</span>
                                <strong className="text-[#48C9B0] text-xs font-black">{booking.seat}</strong>
                              </span>
                            </td>
                            <td className="p-4 align-middle"><div className="text-slate-200 font-medium text-xs">{booking.date}</div></td>
                            
                            {/* Task 3: Render Expiry Duration from Time Configuration */}
                            <td className="p-4 align-middle">
                              <div className="flex flex-col gap-1.5 w-fit">
                                <div className="inline-block text-[11px] font-bold text-[#0B132B] bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC] px-3 py-1.5 rounded border border-[#D4AF37] whitespace-nowrap shadow-sm text-center">
                                  {booking.fromTime} <span className="text-[#0B132B]/60 font-black mx-1 tracking-widest">-</span> {booking.toTime}
                                </div>
                                <div className="text-[10px] text-[#48C9B0] font-bold tracking-wider uppercase bg-[#48C9B0]/10 border border-[#48C9B0]/20 px-2 py-1 rounded text-center">
                                  Expires after: {calculateDuration(booking.fromTime, booking.toTime)}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            );
          })()}
        </div>, document.body
      )}
      
      {/* Task 2: Global Spinner overlay during save action */}
      {isSaving && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B132B]/90 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-16 h-16 border-4 border-[#1C2541] border-t-[#D4AF37] rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
          <p className="text-[#D4AF37] text-lg font-bold tracking-widest uppercase animate-pulse drop-shadow-md">Saving Configurations...</p>
        </div>,
        document.body
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1C2541; border-radius: 10px; border: 1px solid rgba(212, 175, 55, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}</style>
    </div>
  );
};

export default DynamicCalendar;