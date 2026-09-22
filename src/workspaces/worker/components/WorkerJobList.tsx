"use client";

import { useState, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { SegmentedTabs, type TabOption } from "@/components/shared/SegmentedTabs";
import { TodayWorkJobCard } from "./TodayWorkJobCard";

export interface JobData {
  id: string;
  status: "CURRENT" | "UPCOMING" | "COMPLETED";
  title: string;
  address: string;
  service: string;
  customerName: string;
  customerAvatar?: string;
  imageSrc: string;
  progressText: string;
  dateKey: string; // YYYY-MM-DD
}

const MOCK_WORKER_JOBS: JobData[] = [
  {
    id: "job-0",
    status: "UPCOMING",
    title: "Pine Tree Cottage",
    address: "88 Pine Tree Lane",
    service: "Lawn Aeration & Seeding",
    customerName: "David Miller",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    imageSrc: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=600",
    progressText: "Scheduled for Aug 08, 10:00 AM",
    dateKey: "2026-08-08",
  },
  {
    id: "job-1",
    status: "CURRENT",
    title: "Willow Creek Residence",
    address: "100 Whispering Pines Blvd at Hwy 43",
    service: "Lawn Mowing + Trimming",
    customerName: "Mr. Aurora",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    imageSrc: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    progressText: "Work in Progress - 00:48:26",
    dateKey: "2026-08-11",
  },
  {
    id: "job-2",
    status: "UPCOMING",
    title: "Cedar Ridge Estates",
    address: "450 Cedar Ridge Way",
    service: "Hedge Trimming + Yard Clean",
    customerName: "Mrs. Davis",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    progressText: "Scheduled for Today, 02:30 PM",
    dateKey: "2026-08-11",
  },
  {
    id: "job-3",
    status: "UPCOMING",
    title: "Oakwood Manor",
    address: "782 Oakwood Ave, Suite B",
    service: "Tree Pruning & Garden Edging",
    customerName: "Robert Chen",
    customerAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100",
    imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    progressText: "Scheduled for Aug 12, 09:00 AM",
    dateKey: "2026-08-12",
  },
  {
    id: "job-4",
    status: "UPCOMING",
    title: "Highland Park Villas",
    address: "210 Highland Terrace",
    service: "Landscape Irrigation Check",
    customerName: "Sarah Jenkins",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    imageSrc: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600",
    progressText: "Scheduled for Aug 13, 01:15 PM",
    dateKey: "2026-08-13",
  },
];

export function WorkerJobList() {
  const searchParams = useSearchParams();
  const currentTabParam = (searchParams.get("tab") || "all").toLowerCase();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Active month year state (defaults to August 2026)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 11)); // Aug 11, 2026
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>("2026-08-11");

  const TABS: TabOption[] = [
    { key: "all", label: "All" },
    { key: "current", label: "Current" },
    { key: "upcoming", label: "Upcoming" },
  ];

  // Map of dates that have assigned jobs
  const jobDateKeys = useMemo(() => {
    return new Set(MOCK_WORKER_JOBS.map((job) => job.dateKey));
  }, []);

  // Month title formatter (e.g., "August 2026")
  const monthYearLabel = useMemo(() => {
    return currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });
  }, [currentDate]);

  // Generate date pills for a 14-day strip around currentDate
  const datePills = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const dayOffset = 3;
    const pills = [];

    for (let i = -dayOffset; i <= dayOffset + 5; i++) {
      const d = new Date(year, month, currentDate.getDate() + i);
      const dayName = d.toLocaleString("en-US", { weekday: "short" });
      const dateNum = String(d.getDate()).padStart(2, "0");
      const yearStr = d.getFullYear();
      const monthStr = String(d.getMonth() + 1).padStart(2, "0");
      const fullDate = `${yearStr}-${monthStr}-${dateNum}`;
      const hasJobs = jobDateKeys.has(fullDate);

      pills.push({
        day: dayName,
        date: dateNum,
        fullDate,
        rawDate: d,
        hasJobs,
      });
    }

    return pills;
  }, [currentDate, jobDateKeys]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -160, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 160, behavior: "smooth" });
    }
  };

  // Filter jobs based on active tab & selected date
  const filteredJobs = MOCK_WORKER_JOBS.filter((job) => {
    if (currentTabParam === "current") {
      return job.status === "CURRENT";
    }
    if (currentTabParam === "upcoming") {
      if (selectedDateKey) {
        return job.status === "UPCOMING" && job.dateKey === selectedDateKey;
      }
      return job.status === "UPCOMING";
    }
    // "all" tab
    if (selectedDateKey && currentTabParam === "all") {
      return job.dateKey === selectedDateKey || job.status === "CURRENT";
    }
    return true;
  });

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {/* Page Heading matching Figma screenshot */}
      <div className="flex items-center justify-between pt-1 pb-1 border-b border-border/40">
        <h1 className="font-barlow text-2xl font-semibold leading-tight text-primary-heading">
          Job's
        </h1>
      </div>

      {/* Top Tab Bar with URL Query persistence */}
      <SegmentedTabs tabs={TABS} defaultValue="all" paramName="tab" />

      {/* Date Selector Strip (shown on UPCOMING tab or when browsing dates) */}
      {currentTabParam === "upcoming" && (
        <section className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-txt-primary">Select Date</span>
            <div className="flex items-center gap-1.5 text-primary font-semibold text-xs">
              <span>{monthYearLabel}</span>
              <div className="flex items-center gap-0.5 text-secondary-subheading">
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className="p-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-primary font-bold" />
                </button>
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="p-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-primary font-bold" />
                </button>
              </div>
            </div>
          </div>

          {/* Date Pills Row matching 3 Figma states & smooth horizontal scroll */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
          >
            {datePills.map((item) => {
              const isSelected = selectedDateKey === item.fullDate;
              const hasJobs = item.hasJobs;

              // Compute exact styles for 3 states:
              // 1. ACTIVE: Dark Blue (#5980A6) with White Text & White Circle
              // 2. HAS_JOBS (unselected): Light Blue (#CADFF4) with Dark Blue Border (#5980A6) & White Circle
              // 3. NO_JOBS: Light White/Gray (#F5F6F8) with Gray Text & Light Circle
              let pillStyle: React.CSSProperties;
              let dayTextClass: string;
              let circleClass: string;

              if (isSelected) {
                pillStyle = {
                  borderRadius: "624.9375rem",
                  background: "var(--Blue-Brand_500, #5980A6)",
                  border: "1px solid var(--Blue-Brand_500, #5980A6)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem 0.375rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.375rem",
                };
                dayTextClass = "text-white font-medium";
                circleClass = "bg-white text-txt-primary font-bold shadow-xs";
              } else if (hasJobs) {
                pillStyle = {
                  borderRadius: "624.9375rem",
                  background: "var(--Blue-100, #CADFF4)",
                  border: "1px solid var(--Blue-Brand_500, #5980A6)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem 0.375rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.375rem",
                };
                dayTextClass = "text-[#1D1F20] font-medium";
                circleClass = "bg-white text-[#1D1F20] font-bold shadow-2xs";
              } else {
                pillStyle = {
                  borderRadius: "624.9375rem",
                  background: "var(--Gray-50, #F4F5F7)",
                  border: "1px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem 0.375rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.375rem",
                };
                dayTextClass = "text-[#8C8E90] font-medium";
                circleClass = "bg-[#EAECEF]/80 text-[#8C8E90] font-medium";
              }

              return (
                <button
                  key={item.fullDate}
                  type="button"
                  onClick={() => {
                    setSelectedDateKey(isSelected ? null : item.fullDate);
                    setCurrentDate(item.rawDate);
                  }}
                  className="min-w-[50px] h-18 transition-all duration-200 cursor-pointer select-none shrink-0 hover:opacity-90 active:scale-98"
                  style={pillStyle}
                >
                  <span className={`text-[11px] leading-none pt-0.5 ${dayTextClass}`}>
                    {item.day}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors shrink-0 ${circleClass}`}
                  >
                    {item.date}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Job Cards List */}
      <div className="space-y-3.5 pt-1">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-dashed border-border bg-card-bg text-center space-y-3">
            <div className="p-3 rounded-full bg-blue-50 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-medium text-primary-heading">
                No jobs found
              </h3>
              <p className="text-xs text-secondary-subheading mt-1 max-w-[240px]">
                There are no jobs scheduled for {selectedDateKey || "this filter"}.
              </p>
            </div>
            {selectedDateKey && (
              <button
                type="button"
                onClick={() => setSelectedDateKey(null)}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Show all upcoming jobs
              </button>
            )}
          </div>
        ) : (
          filteredJobs.map((job) => (
            <TodayWorkJobCard
              key={job.id}
              status={job.status}
              title={job.title}
              address={job.address}
              service={job.service}
              customerName={job.customerName}
              customerAvatar={job.customerAvatar}
              imageSrc={job.imageSrc}
              progressText={job.progressText}
              onCardClick={() => {
                console.log("Job clicked:", job.id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}