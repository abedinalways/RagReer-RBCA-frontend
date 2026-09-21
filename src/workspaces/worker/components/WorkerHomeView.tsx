"use client";

import { WorkerStatCard } from "./WorkerStatCard";
import { CurrentlyClockedInCard } from "./CurrentlyClockedInCard";
import { ApprovedExtraWorkCard } from "./ApprovedExtraWorkCard";
import { TodayWorkJobCard } from "./TodayWorkJobCard";
import {
  WorkTimeIcon,
  OverTimeIcon,
  CompletedWorkIcon,
} from "./icons/WorkerStatIcons";

export function WorkerHomeView() {
  return (
    <div className="space-y-5">
      {/* Activity this week section */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-txt-primary tracking-tight">
          Activity this week
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <WorkerStatCard
            title="Work Time"
            value="12:36:45"
            unit="h"
            trend="+2.1%"
            trendType="up"
            icon={<WorkTimeIcon className="h-5 w-5 text-white" />}
          />

          <WorkerStatCard
            title="Over Time"
            value="12:36:45"
            unit="h"
            trend="+2.1%"
            trendType="up"
            icon={<OverTimeIcon className="h-5 w-5 text-white" />}
          />

          <WorkerStatCard
            title="Completed Work"
            value="05/07"
            unit="Work"
            trend="-1.3%"
            trendType="down"
            icon={<CompletedWorkIcon className="h-5 w-5 text-white" />}
            className="col-span-2"
          />
        </div>
      </section>

      <CurrentlyClockedInCard />

      <ApprovedExtraWorkCard />

      {/* Today's Work section */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-txt-primary tracking-tight">
          Today's Work
        </h2>

        {/* Current Job Card */}
        <TodayWorkJobCard
          status="CURRENT"
          title="Willow Creek Residence"
          address="100 Whispering Pines Blvd at Hwy 43"
          service="Lawn Mowing + Trimming"
          customerName="Mr. Aurora"
          customerAvatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
          imageSrc="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"
          progressText="Work in Progress - 00:48:26"
        />

        {/* Upcoming Job Card */}
        <TodayWorkJobCard
          status="UPCOMING"
          title="Cedar Ridge Estates"
          address="450 Cedar Ridge Way"
          service="Hedge Trimming + Yard Clean"
          customerName="Mrs. Davis"
          imageSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
          progressText="Scheduled for 02:30 PM"
        />
      </section>
    </div>
  );
}
