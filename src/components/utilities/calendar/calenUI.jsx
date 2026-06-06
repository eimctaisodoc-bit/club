import React, { useMemo, useState, useEffect } from "react";
import {
  getBsDisplayData,
  getMonthDays,
  getPreviousBsMonth,
  getNextBsMonth,
} from "./calendar.js";

// ─── REAL USER BOOKINGS ───
const userBookedData = [
  {
    id: "RES-001",
    name: "John Doe",
    title: "Reservation",
    Totaluser: 12,
    email: "john@example.com",
    date: "2083-02-15",
    timeFrom: "8:00PM",
    timeTo: "9:00PM",
    
    tables: [
      {
        table: "T1",
        chairs: ["B1", "B2", "B3"]
      },
      {
        table: "T2",
        chairs: ["B1", "B2"]
      },
      {
        table: "T5",
        chairs: ["B1", "B2", "B3", "B4"]
      }
    ]
  }
];

const TOTAL_TABLES = 20;
const CHAIRS_PER_TABLE = 9;
const TOTAL_CHAIRS = TOTAL_TABLES * CHAIRS_PER_TABLE; // 180

const getBookedSeatIdsForDate = (dateString) => {
  const dayBookings = userBookedData.filter((b) => b.date === dateString);
  const bookedSet = new Set();

  dayBookings.forEach((res) => {
    res.tables.forEach((tableObj) => {
      tableObj.chairs.forEach((chair) => {
        bookedSet.add(`${tableObj.table.toUpperCase()}-${chair.toUpperCase()}`);
      });
    });
  });
  return Array.from(bookedSet);
};

const DynamicCalendar = () => {
  const initialData = useMemo(() => getBsDisplayData(), []);

  const [year, setYear] = useState(initialData.today.bsYear);
  const [monthIndex, setMonthIndex] = useState(initialData.today.bsMonthIndex);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modal for viewing clicked booking's other information
  const [viewingBooking, setViewingBooking] = useState(null);

  const [openedSeatsByDate, setOpenedSeatsByDate] = useState({});
  const [draftSelection, setDraftSelection] = useState([]);

  useEffect(() => {
    if (viewingBooking) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [viewingBooking]);

  useEffect(() => {
    const initialOpened = {};
    userBookedData.forEach((booking) => {
      const bookedIds = getBookedSeatIdsForDate(booking.date);
      if (bookedIds.length > 0) {
        initialOpened[booking.date] = bookedIds;
      }
    });
    setOpenedSeatsByDate(initialOpened);
  }, []);

  const monthDays = useMemo(() => {
    const isCurrentMonth =
      year === initialData.today.bsYear &&
      monthIndex === initialData.today.bsMonthIndex;
    const todayBsDate = isCurrentMonth ? initialData.today.bsDate : null;
    return getMonthDays(year, monthIndex, todayBsDate);
  }, [year, monthIndex, initialData.today]);

  const calendarStatsForMonth = useMemo(() => {
    return monthDays.reduce((acc, day) => {
      const openedChairs = openedSeatsByDate[day.bsDateFormatted] || [];
      const bookedChairs = getBookedSeatIdsForDate(day.bsDateFormatted);

      acc[day.bsDateFormatted] = {
        openedCount: openedChairs.length,
        bookedCount: bookedChairs.length,
        isOpen: openedChairs.length > 0,
        dayBookings: userBookedData.filter((b) => b.date === day.bsDateFormatted),
      };
      return acc;
    }, {});
  }, [monthDays, openedSeatsByDate]);

  const monthName = monthDays?.[0]?.bsMonthName || "";
  const firstDayIndex = monthDays?.[0]?.dayIndex || 0;

  const cells = [...Array(firstDayIndex).fill(null), ...monthDays];

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setDraftSelection([]);
      setViewingBooking(null);
    }, 300);
  };

  // ─── UPDATED NAVIGATION CONTROLS ───
  const handlePrev = () => {
    closeDrawer(); // Close drawer to prevent rendering conflicts
    const prev = getPreviousBsMonth(year, monthIndex);
    setYear(prev.bsYear);
    setMonthIndex(prev.monthIndex);
  };

  const handleNext = () => {
    closeDrawer(); // Close drawer to prevent rendering conflicts
    const next = getNextBsMonth(year, monthIndex);
    setYear(next.bsYear);
    setMonthIndex(next.monthIndex);
  };

  const handleToday = () => {
    closeDrawer(); // Close drawer when jumping dates
    setYear(initialData.today.bsYear);
    setMonthIndex(initialData.today.bsMonthIndex);
  };

  const handleDateClick = (dayItem) => {
    const previouslyOpened = openedSeatsByDate[dayItem.bsDateFormatted] || [];
    setDraftSelection([...previouslyOpened]);
    setSelectedDate(dayItem);
    setIsDrawerOpen(true);
  };

  const toggleChairOpening = (compositeId, isAlreadyBooked) => {
    if (isAlreadyBooked) return;
    setDraftSelection((prev) =>
      prev.includes(compositeId)
        ? prev.filter((id) => id !== compositeId)
        : [...prev, compositeId]
    );
  };

  const toggleTableOpening = (tableChairs, bookedSeats) => {
    const availableToToggle = tableChairs.map(c => c.compositeId).filter(id => !bookedSeats.includes(id));
    if (availableToToggle.length === 0) return;

    const allAvailableAreOpened = availableToToggle.every((id) => draftSelection.includes(id));

    if (allAvailableAreOpened) {
      setDraftSelection((prev) => prev.filter((id) => !availableToToggle.includes(id)));
    } else {
      setDraftSelection((prev) => {
        const newSelection = new Set([...prev, ...availableToToggle]);
        return Array.from(newSelection);
      });
    }
  };

  const handleSaveOpenings = () => {
    if (!selectedDate) return;

    const bookedSeats = getBookedSeatIdsForDate(selectedDate.bsDateFormatted);
    const purelyOpenedSeats = draftSelection.filter(id => !bookedSeats.includes(id));

    const groupedByTable = purelyOpenedSeats.reduce((acc, compositeId) => {
      const [tableId, chairId] = compositeId.split("-");
      if (!acc[tableId]) {
        acc[tableId] = [];
      }
      acc[tableId].push(chairId);
      return acc;
    }, {});

    const exportData = {
      [selectedDate.bsDateFormatted]: Object.keys(groupedByTable).map(tableId => ({
        [tableId]: groupedByTable[tableId]
      }))
    };

    console.log("Newly Opened Seats Export Data:", exportData);

    const finalSelection = Array.from(new Set([...draftSelection, ...bookedSeats]));

    setOpenedSeatsByDate((prev) => ({
      ...prev,
      [selectedDate.bsDateFormatted]: finalSelection,
    }));

    closeDrawer();
  };

  const renderCellOpeningBadge = (stats) => {
    if (!stats.isOpen) {
      return (
        <div className="text-slate-500 font-semibold text-[10px] sm:text-[11px] bg-slate-800/40 text-center py-1 rounded border border-slate-700/50 mt-auto">
          Closed
        </div>
      );
    }

    return (
      <div className="space-y-1 text-[10px] sm:text-[11px] mt-auto">
        <div className="flex justify-between text-[#48C9B0] items-center bg-[#48C9B0]/10 px-1.5 py-0.5 rounded border border-[#48C9B0]/20">
          <span>Opened:</span>
          <span className="font-bold">{stats.openedCount} <span className="text-[8px] font-normal text-slate-500">/ 180</span></span>
        </div>
        {stats.bookedCount > 0 && (
          <div className="flex justify-between text-[#D4AF37] items-center bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/20">
            <span>Booked:</span>
            <span className="font-bold">{stats.bookedCount}</span>
          </div>
        )}
      </div>
    );
  };

  const tableStructures = Array.from({ length: TOTAL_TABLES }, (_, i) => {
    const tableId = `T${i + 1}`;
    const chairs = Array.from({ length: CHAIRS_PER_TABLE }, (_, j) => ({
      id: `B${j + 1}`,
      compositeId: `${tableId}-B${j + 1}`,
    }));
    return { tableId, chairs };
  });

  return (
    <div className="relative w-full bg-[#0B132B] text-slate-100 rounded-2xl border border-[#1C2541] shadow-2xl p-4 sm:p-6 font-sans overflow-hidden">
      
      {/* ─── UPDATED HEADER WITH 'TODAY' BUTTON ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#1C2541] pb-6 mb-6 gap-4 sm:gap-0">
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={handlePrev} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
            &larr; Prev
          </button>
          <button onClick={handleToday} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold border border-[#48C9B0]/40 rounded-lg text-[#48C9B0] hover:bg-[#48C9B0]/10 transition-all duration-300">
            Today
          </button>
        </div>
        <div className="text-center order-first sm:order-none w-full sm:w-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F1E5AC] via-[#D4AF37] to-[#F1E5AC]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {monthName} {year}
          </h2>
          <p className="text-[10px] sm:text-xs tracking-widest text-slate-400 uppercase mt-1">Admin Seat Opening Dashboard</p>
        </div>
        <button onClick={handleNext} className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
          Next &rarr;
        </button>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={day} className={`text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 sm:py-2.5 rounded-md ${idx === 6 ? "text-rose-400 bg-rose-950/20" : "text-slate-300 bg-[#1C2541]/50"}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {cells.map((item, index) => {
          if (!item) return <div key={`empty-${index}`} className="h-28 sm:h-32 border border-[#1C2541]/40 rounded-xl bg-[#1C2541]/10 opacity-40" />;

          const stats = calendarStatsForMonth[item.bsDateFormatted];
          const isSelected = selectedDate?.bsDateFormatted === item.bsDateFormatted;

          return (
            <div
              key={item.bsDateFormatted}
              onClick={() => handleDateClick(item)}
              className={`h-28 sm:h-32 border rounded-xl p-2 sm:p-3 cursor-pointer flex flex-col transition-all duration-300 relative overflow-hidden group
                ${!stats.isOpen
                  ? "border-[#1C2541]/50 bg-[#0B132B] opacity-70 hover:opacity-100 hover:border-[#D4AF37]/40"
                  : isSelected
                    ? "border-[#D4AF37] bg-[#1C2541] shadow-[0_0_15px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37]"
                    : "border-[#48C9B0]/30 bg-[#1C2541]/40 hover:border-[#48C9B0]/60 hover:-translate-y-0.5"
                }
              `}
            >
              {
                item.isToday && (
                  <div className="flex justify-between items-center gap-3 bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/20 ">
                    <span className=" text-[10px] mt-auto text-[#D4AF37] items-center "> Today </span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  </div>
                )
              }
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xl sm:text-2xl font-bold tracking-tight ${!stats.isOpen ? "text-slate-500" : item.isToday ? "text-[#F1E5AC]" : "text-slate-100 group-hover:text-[#D4AF37]"}`}>
                  {item.bsDate}
                </span>
              </div>
              <div className={`text-[10px] font-medium ${item.isToday ? "text-[#D4AF37]/80" : "text-slate-400"}`}>
                {item.adDate.toLocaleString("en-US", { month: "short", day: "numeric" })}
              </div>

              {renderCellOpeningBadge(stats)}
            </div>
          );
        })}
      </div>

      {/* Backdrop */}
      {isDrawerOpen && <div className="fixed inset-0 bg-[#0B132B]/80 backdrop-blur-md z-40 transition-opacity" onClick={closeDrawer} />}

      {/* Side Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-gradient-to-b from-[#0B132B] to-[#1C2541] border-l border-[#D4AF37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        {selectedDate && (() => {
          
          // ─── UPDATED: SAFETY FALLBACK ───
          // Prevents undefined crash when changing months while the drawer is fading out
          const stats = calendarStatsForMonth[selectedDate.bsDateFormatted] || {
            openedCount: 0,
            bookedCount: 0,
            isOpen: false,
            dayBookings: userBookedData.filter((b) => b.date === selectedDate.bsDateFormatted)
          };

          const bookedSeatsList = getBookedSeatIdsForDate(selectedDate.bsDateFormatted);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPastDate = selectedDate.adDate.getTime() < today.getTime();

          return (
            <>
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20 bg-[#0B132B]/50 backdrop-blur-sm shrink-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F1E5AC] to-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {selectedDate.bsMonthName} {selectedDate.bsDate}, {year}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 flex items-center gap-2">
                    {selectedDate.adDate.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  {isPastDate && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded uppercase tracking-wider">
                      Read Only
                    </span>
                  )}
                </div>
                <button onClick={closeDrawer} className="p-2.5 text-slate-300 hover:text-[#0B132B] hover:bg-[#D4AF37] rounded-full transition-all duration-300 bg-[#1C2541] border border-[#D4AF37]/30 shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-40 custom-scrollbar relative">
                {/* User Reservations Banner */}
                {stats.dayBookings.length > 0 && (
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4 shadow-inner">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      Active User Reservations
                    </h4>
                    <div className="space-y-3">
                      {stats.dayBookings.map((booking) => (
                        <div key={booking.id} className="bg-[#0B132B]/60 p-3 rounded-lg border border-[#D4AF37]/20 flex justify-between items-center">
                          <div>
                            <div className="text-sm font-bold text-slate-200">{booking.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{booking.title} • {booking.Totaluser} Users</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-[#48C9B0]">{booking.timeFrom} - {booking.timeTo}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {booking.tables.length} Tables, {booking.tables.reduce((sum, t) => sum + t.chairs.length, 0)} Total Chairs
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid of Tables */}
                <div className="grid grid-cols-2 gap-5">
                  {tableStructures.map((table) => {
                    const openedCountOnTable = table.chairs.filter((c) => draftSelection.includes(c.compositeId)).length;
                    const bookedCountOnTable = table.chairs.filter((c) => bookedSeatsList.includes(c.compositeId)).length;

                    const isFullyOpened = openedCountOnTable === CHAIRS_PER_TABLE;
                    const hasBookings = bookedCountOnTable > 0;

                    return (
                      <div key={table.tableId} className={`p-4 rounded-xl border flex flex-col items-center gap-4 transition-all duration-300 ${hasBookings ? "bg-[#1C2541]/70 border-[#D4AF37]/50" :
                        isFullyOpened ? "bg-[#1C2541]/80 border-[#48C9B0]/50 shadow-[0_0_15px_rgba(72,201,176,0.1)]" :
                          openedCountOnTable > 0 ? "bg-[#1C2541]/50 border-[#48C9B0]/30" : "bg-[#0B132B]/80 border-[#1C2541]"
                        }`}
                      >
                        {/* Table Header */}
                        <button
                          onClick={() => toggleTableOpening(table.chairs, bookedSeatsList)}
                          disabled={isPastDate}
                          className={`flex w-full justify-between items-center border-b pb-3 transition-colors outline-none group/btn ${isFullyOpened ? "border-[#48C9B0]/30" : "border-[#1C2541]"} ${!isPastDate && !isFullyOpened ? "hover:border-[#D4AF37]/50" : ""} ${isPastDate ? "cursor-not-allowed opacity-80" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`font-black text-xl transition-colors ${hasBookings ? "text-[#D4AF37]" : isFullyOpened ? "text-[#48C9B0]" : `text-slate-200 ${!isPastDate && "group-hover/btn:text-[#F1E5AC]"}`}`}>
                              {table.tableId}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {bookedCountOnTable > 0 && (
                              <span className="text-[9px] text-[#0B132B] font-bold bg-[#D4AF37] px-1.5 py-0.5 rounded">
                                {bookedCountOnTable} Booked
                              </span>
                            )}
                            {openedCountOnTable > 0 && bookedCountOnTable === 0 && (
                              <span className="text-[9px] text-slate-300 bg-[#1C2541] px-1.5 py-0.5 rounded">
                                {openedCountOnTable}/9 Open
                              </span>
                            )}
                          </div>
                        </button>

                        {/* 3×3 Chair Grid */}
                        <div className="grid grid-cols-3 gap-2.5 w-full">
                          {table.chairs.map((chair) => {
                            const isBooked = bookedSeatsList.includes(chair.compositeId);
                            const isOpened = draftSelection.includes(chair.compositeId);

                            return (
                              <button
                                key={chair.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isBooked) {
                                    const [tId, cId] = chair.compositeId.split('-');
                                    const bookingDetail = stats.dayBookings.find(b => 
                                        b.tables.some(tObj => 
                                          tObj.table.toUpperCase() === tId.toUpperCase() && 
                                          tObj.chairs.some(c => c.toUpperCase() === cId.toUpperCase())
                                        )
                                    );
                                    if (bookingDetail) {
                                      setViewingBooking(bookingDetail);
                                    }
                                  } else if (!isPastDate) {
                                    toggleChairOpening(chair.compositeId, isBooked);
                                  }
                                }}
                                disabled={!isBooked && isPastDate}
                                className={`
                                  relative flex items-center justify-center text-[11px] font-bold py-2.5 rounded-md border transition-all duration-200 outline-none
                                  ${isBooked
                                    ? "bg-[#D4AF37] text-[#0B132B] border-[#F1E5AC] shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:bg-[#F1E5AC] hover:scale-105 cursor-pointer z-10"
                                    : isOpened
                                      ? `bg-gradient-to-br from-[#48C9B0] to-[#2E866C] text-white border-[#48C9B0] shadow-[0_4px_10px_rgba(72,201,176,0.3)] ${!isPastDate && "scale-105"}`
                                      : "bg-[#1C2541]/40 text-slate-500 border-slate-700"
                                  }
                                  ${isPastDate && !isBooked ? "cursor-not-allowed opacity-60" : !isPastDate && !isBooked ? "hover:bg-slate-800 hover:border-slate-500 hover:text-slate-300" : ""}
                                `}
                                title={isBooked ? "Booked by a User (Click for Details)" : isPastDate ? "Past Date (View Only)" : isOpened ? "Opened (Click to Close)" : "Closed (Click to Open)"}
                              >
                                {isBooked ? (
                                  <svg className="w-4 h-4 text-[#0B132B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                ) : (
                                  chair.id
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Booking Details Modal Overlay */}
                {viewingBooking && (
                  <div className="fixed h-full w-full inset-0 z-[60] flex items-center justify-center p-6 bg-[#0B132B]/80 backdrop-blur-sm transition-opacity" onClick={() => setViewingBooking(null)}>
                    <div className="bg-gradient-to-b from-[#1C2541] to-[#0B132B] border border-[#D4AF37]/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setViewingBooking(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-[#0B132B] p-1.5 rounded-full border border-slate-700 hover:border-[#D4AF37] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <div className="flex items-center gap-3 mb-5 border-b border-[#D4AF37]/20 pb-4">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xl font-black border border-[#D4AF37]/50">
                          {viewingBooking.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-100">{viewingBooking.name}</h4>
                          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">{viewingBooking.id}</p>
                        </div>
                      </div>
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                          <span className="text-slate-400">Email</span>
                          <span className="text-slate-200 font-medium truncate ml-4">{viewingBooking.email}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                          <span className="text-slate-400">Time</span>
                          <span className="text-[#48C9B0] font-bold bg-[#48C9B0]/10 px-2 py-1 rounded border border-[#48C9B0]/20">
                            {viewingBooking.timeFrom} - {viewingBooking.timeTo}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                          <span className="text-slate-400">Total Users</span>
                          <span className="text-slate-200 font-medium">{viewingBooking.Totaluser} People</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Reserved Space</span>
                          <span className="text-slate-200 font-medium text-right">
                            {viewingBooking.tables.length} Tables<br />
                            <span className="text-[10px] text-slate-400">
                              {viewingBooking.tables.reduce((sum, t) => sum + t.chairs.length, 0)} Total Chairs
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0B132B]/95 backdrop-blur-xl border-t border-[#D4AF37]/40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center mb-5 w-full">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-semibold tracking-widest uppercase">Opened Seats</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#48C9B0] text-3xl font-black">{draftSelection.length}</span>
                      <span className="text-slate-500 text-xs font-medium">/ 180</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[#D4AF37]/80 text-[10px] font-semibold tracking-widest uppercase">User Booked</span>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-[#D4AF37] text-3xl font-black">{bookedSeatsList.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveOpenings}
                    disabled={isPastDate}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-sm tracking-wide transition-all duration-300 ${isPastDate
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                      : "bg-gradient-to-r from-[#D4AF37] via-[#F1E5AC] to-[#D4AF37] text-[#0B132B] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                      }`}
                    style={!isPastDate ? { backgroundSize: "200% auto" } : {}}
                  >
                    {isPastDate ? "Past Date - View Only" : "Confirm & Save Openings \u2192"}
                  </button>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1C2541; border-radius: 10px; border: 1px solid rgba(212, 175, 55, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}</style>
    </div>
  );
};

export default DynamicCalendar;