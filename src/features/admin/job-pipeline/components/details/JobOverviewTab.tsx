"use client";

import React from "react";
import { Wrench } from "lucide-react";
import ProfileIcon from "@/components/icons/admin/ProfileIcon";
import PropertyIcon from "@/components/icons/admin/PropertyIcon";
import JobIcon from "@/components/icons/admin/JobIcon";
import { JobDetailData } from "../../types/jobDetailsTypes";

interface JobOverviewTabProps {
  data: JobDetailData;
  onViewRequest?: () => void;
  onViewContract?: () => void;
  onChangeCrewLeader?: () => void;
}

export const JobOverviewTab: React.FC<JobOverviewTabProps> = ({
  data,
  onViewRequest,
  onViewContract,
  onChangeCrewLeader,
}) => {
  const [showAllCrew, setShowAllCrew] = React.useState(false);

  const initialCrewCount = 2;
  const hasMoreCrew = data.crew.length > initialCrewCount;
  const visibleCrew = showAllCrew ? data.crew : data.crew.slice(0, initialCrewCount);
  const extraCrewCount = data.crew.length - initialCrewCount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 animate-in fade-in duration-150">
      {/* Left 8 Columns */}
      <div className="lg:col-span-8 space-y-5 md:space-y-6">
        {/* Customer & Property Information Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Customer Information Card */}
          <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <ProfileIcon className="h-5 w-5 text-txt-primary" />
              <h3 className="font-barlow text-base md:text-lg font-medium text-primary-heading leading-tight">
                Customer Information
              </h3>
            </div>

            <div className="space-y-2.5 text-xs md:text-sm">
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Customer ID</span>
                <span className="text-txt-primary font-medium text-right">{data.customer.id}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Customer</span>
                <span className="text-txt-primary font-medium text-right max-w-[180px] sm:max-w-[220px] truncate">
                  {data.customer.name}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Customer Type</span>
                <span className="text-txt-primary font-medium text-right">{data.customer.customerType}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Role</span>
                <span className="text-txt-primary font-medium text-right">{data.customer.role}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Email Address</span>
                <span className="text-txt-primary font-medium text-right truncate max-w-[180px]">
                  {data.customer.email}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Billing Type</span>
                <span className="text-txt-primary font-medium text-right">{data.customer.billingType}</span>
              </div>
            </div>
          </div>

          {/* Property Information Card */}
          <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <PropertyIcon className="h-5 w-5 text-txt-primary" />
              <h3 className="font-barlow text-base md:text-lg font-medium text-primary-heading leading-tight">
                Property Information
              </h3>
            </div>

            <div className="space-y-2.5 text-xs md:text-sm">
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Property ID</span>
                <span className="text-txt-primary font-medium text-right">{data.property.id}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Name</span>
                <span className="text-txt-primary font-medium text-right max-w-[180px] sm:max-w-[220px] truncate">
                  {data.property.name}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Address</span>
                <span className="text-txt-primary font-medium text-right max-w-[180px] sm:max-w-[220px] truncate">
                  {data.property.address}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Maintainer</span>
                <span className="text-txt-primary font-medium text-right">{data.property.maintainer}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Contact</span>
                <span className="text-txt-primary font-medium text-right">{data.property.contact}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-secondary-subheading font-normal">Site Access</span>
                <span className="text-primary font-medium text-right">{data.property.siteAccess}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description Card */}
        <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <JobIcon className="h-5 w-5 text-txt-primary" />
            <h3 className="font-barlow text-base md:text-lg font-medium text-primary-heading leading-tight">
              Job description
            </h3>
          </div>

          <p className="text-xs md:text-sm text-secondary-subheading leading-relaxed font-normal">
            {data.description}
          </p>

          <div className="space-y-2 pt-1">
            <h4 className="text-xs md:text-sm font-medium text-primary-heading">
              Service Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs md:text-sm text-txt-primary">
              {data.serviceIncluded.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-subheading shrink-0" />
                  <span className="font-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Equipment Card */}
        <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <Wrench className="h-5 w-5 text-txt-primary" />
            <h3 className="font-barlow text-base md:text-lg font-medium text-primary-heading leading-tight">
              Assigned Equipment
            </h3>
          </div>

          <div className="rounded-lg border border-border bg-page-bg/40 p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs md:text-sm">
            {data.equipment.map((eq, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-subheading shrink-0" />
                <span className="font-medium text-txt-primary">
                  {eq.name} <span className="text-secondary-subheading font-normal">- {eq.category}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 4 Columns */}
      <div className="lg:col-span-4 space-y-5 md:space-y-6">
        {/* Job Summary Card */}
        <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3.5">
          <div className="border-b border-border/60 pb-3">
            <h3 className="font-barlow text-base md:text-lg font-medium text-primary-heading leading-tight">
              Job Summary
            </h3>
          </div>

          <div className="space-y-2.5 text-xs md:text-sm">
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Requested Service</span>
              <span className="text-primary font-medium text-right max-w-[160px] truncate">
                {data.summary.requestedService}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Request Type</span>
              <span className="text-primary font-medium text-right">{data.summary.requestType}</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Frequency</span>
              <span className="text-primary font-medium text-right">{data.summary.frequency}</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Service Agreement Type</span>
              <span className="text-primary font-medium text-right">{data.summary.serviceAgreementType}</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Amount</span>
              <span className="text-primary font-medium text-right">{data.summary.amount}</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Schedule Date</span>
              <span className="text-primary font-medium text-right">{data.summary.scheduleDate}</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-secondary-subheading font-normal">Arrival Window</span>
              <span className="text-primary font-medium text-right">{data.summary.arrivalWindow}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-border/60">
            <button
              type="button"
              onClick={onViewRequest}
              className="w-full py-2 px-3 rounded-md border border-border text-primary hover:bg-page-bg font-medium text-xs text-center transition-colors cursor-pointer"
            >
              View Request
            </button>
            <button
              type="button"
              onClick={onViewContract}
              className="w-full py-2 px-3 rounded-md border border-border text-primary hover:bg-page-bg font-medium text-xs text-center transition-colors cursor-pointer"
            >
              View Contract
            </button>
          </div>
        </div>

        {/* Crew on This Job Card */}
        <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3.5">
          <div className="border-b border-border/60 pb-3">
            <h3 className="font-barlow text-base md:text-lg font-medium text-primary-heading leading-tight">
              Crew on This Job
            </h3>
          </div>

          <div className="space-y-2.5">
            {visibleCrew.map((member) => (
              <div
                key={member.id}
                className={`rounded-lg p-2.5 flex items-center gap-3 transition-colors ${
                  member.isLeader
                    ? "border border-blue-200 bg-blue-50/60"
                    : "border border-border bg-page-bg/60"
                }`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-10 w-10 rounded-md object-cover shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-xs md:text-sm text-txt-primary truncate">
                    {member.name}
                  </span>
                  <span className="text-[11px] md:text-xs text-secondary-subheading">
                    {member.role} • Strike : {member.strikeCount}
                  </span>
                </div>
              </div>
            ))}

            {hasMoreCrew ? (
              <button
                type="button"
                onClick={() => setShowAllCrew((prev) => !prev)}
                className="text-xs text-secondary-subheading hover:text-primary transition-colors text-center block font-medium py-1 w-full cursor-pointer"
              >
                {showAllCrew ? "Show less" : `+ ${extraCrewCount} more`}
              </button>
            ) : data.additionalCrewCount > 0 ? (
              <span className="text-xs text-secondary-subheading text-center block font-medium py-0.5">
                + {data.additionalCrewCount} more
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onChangeCrewLeader}
            className="w-full py-2 px-3 rounded-md border border-primary text-primary hover:bg-blue-50 font-medium text-xs text-center transition-colors cursor-pointer"
          >
            Change Crew Leader
          </button>
        </div>
      </div>
    </div>
  );
};
