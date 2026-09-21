"use client";

import { 
  Clock, 
  Timer, 
  ClipboardCheck, 
  ChevronRight, 
  MapPin, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";

export function WorkerHomeView() {
  return (
    <div className="space-y-5">
      {/* Activity this week section */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-txt-primary tracking-tight">
          Activity this week
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Work Time Stat Card */}
          <div className="rounded-2xl border border-border bg-card-bg p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-status-running-bg text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-secondary-subheading">
                Work Time
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-base font-bold text-primary-heading">
                12:36:45 <span className="text-xs font-normal text-secondary-subheading">h</span>
              </p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-trend-up">
                <TrendingUp className="h-3 w-3" />
                +2.1%
              </span>
            </div>
          </div>

          {/* Over Time Stat Card */}
          <div className="rounded-2xl border border-border bg-card-bg p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-status-running-bg text-primary">
                <Timer className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-secondary-subheading">
                Over Time
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-base font-bold text-primary-heading">
                12:36:45 <span className="text-xs font-normal text-secondary-subheading">h</span>
              </p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-trend-up">
                <TrendingUp className="h-3 w-3" />
                +2.1%
              </span>
            </div>
          </div>

          {/* Completed Work Stat Card (Full width on 3rd item) */}
          <div className="col-span-2 rounded-2xl border border-border bg-card-bg p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-status-running-bg text-primary">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-secondary-subheading">
                  Completed Work
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-base font-bold text-primary-heading">
                05/07 <span className="text-xs font-normal text-secondary-subheading">Work</span>
              </p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-trend-down">
                <TrendingDown className="h-3 w-3" />
                -1.3%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Currently clocked in section */}
      <section className="rounded-2xl border border-status-running-text/15 bg-status-running-bg/40 p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-primary-heading">
            Currently clocked in
          </h3>
          <span className="rounded-md border border-status-running-text/20 bg-white px-2.5 py-0.5 text-xs font-semibold text-status-running-text">
            Running
          </span>
        </div>
        <p className="mt-1 text-xs text-secondary-subheading">
          On-site work · Weekly grounds — Cedar Ridge
        </p>
        <button
          type="button"
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-text shadow-xs transition-colors hover:bg-primary-hover"
        >
          Manage time Clock <ChevronRight className="h-4 w-4" />
        </button>
      </section>

      {/* Rescheduling / Extra Work Item Card */}
      <section className="rounded-2xl border border-border bg-card-bg p-4 shadow-2xs space-y-3">
        <div>
          <span className="rounded-md bg-tag-rescheduling-bg px-2.5 py-0.5 text-xs font-semibold text-tag-rescheduling-text">
            Rescheduling
          </span>
        </div>

        <div className="flex gap-3">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-status-running-bg text-center">
            <span className="text-base font-bold leading-none text-primary-heading">26</span>
            <span className="text-[11px] font-semibold text-status-running-text uppercase mt-0.5">Aug</span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-primary-heading leading-snug">
              1 approved extra work item
            </h4>
            <p className="text-xs text-secondary-subheading line-clamp-1">
              Re-grade washed gravel along the north...
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-xs text-secondary-subheading">
            <MapPin className="h-3.5 w-3.5 text-secondary-subheading" />
            <span>21 Broadway, Manhattan</span>
          </div>
          <span className="rounded-md bg-status-running-bg px-2 py-0.5 text-[11px] font-semibold text-status-running-text">
            6.7km
          </span>
        </div>

        <div className="pt-1">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            View approvals <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Today's Work section */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-txt-primary tracking-tight">
          Today's Work
        </h2>

        {/* Current Job Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card-bg shadow-2xs">
          <div className="relative h-44 w-full bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"
              alt="Willow Creek Residence"
              className="h-full w-full object-cover"
            />
            <span className="absolute top-3 right-3 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white shadow-xs">
              Current
            </span>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-base font-bold text-primary-heading">
                Willow Creek Residence
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-secondary-subheading">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
                100 Whispering Pines Blvd at Hwy 43
              </p>
            </div>

            <p className="text-xs font-semibold text-txt-primary">
              Lawn Mowing + Trimming
            </p>

            <div className="flex items-center gap-2 pt-1">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                alt="Mr. Aurora"
                className="h-7 w-7 rounded-full object-cover border border-border"
              />
              <span className="text-xs font-semibold text-primary-heading">
                Mr. Aurora
              </span>
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between text-xs font-semibold text-secondary-subheading">
              <span>Work in Progress - 00:48:26</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Upcoming Job Card Preview */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card-bg shadow-2xs opacity-90">
          <div className="relative h-32 w-full bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
              alt="Upcoming Residence"
              className="h-full w-full object-cover"
            />
            <span className="absolute top-3 right-3 rounded-lg border border-border bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-status-running-text shadow-xs">
              Upcoming
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
