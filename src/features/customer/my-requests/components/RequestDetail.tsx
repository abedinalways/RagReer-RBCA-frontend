"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { mockRequestsData } from "../data/requestDetailData";
import type {
  RequestDetailData,
  RequestDetailStateKey,
  RequestStatus,
} from "../types/requestDetailTypes";

export const RequestDetail: React.FC = () => {
  const router = useRouter();
  const [selectedStateKey, setSelectedStateKey] =
    useState<RequestDetailStateKey>("estimate-approval");
  const requestData: RequestDetailData = mockRequestsData[selectedStateKey];

  const renderStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "Estimate Approval Needed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-tag-rescheduling-bg text-tag-rescheduling-text border border-tag-rescheduling-border">
            <span className="w-1.5 h-1.5 rounded-full bg-tag-rescheduling-text" />
            Estimate Approval Needed
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium bg-primary-dark text-primary-text border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
            Draft
          </span>
        );
      case "Request Submitted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium bg-primary-dark text-primary-text border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
            Request Submitted
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-page-bg">
      <div className="mb-4 p-2 rounded-lg flex items-center justify-between text-sm text-secondary-subheading">
        <span className="font-semibold text-txt-primary">
          View Screen Variant:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStateKey("estimate-approval")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              selectedStateKey === "estimate-approval"
                ? "bg-primary text-primary-text"
                : "bg-primary-dark text-primary-text hover:bg-primary-hover"
            }`}
          >
            Estimate Approval
          </button>
          <button
            onClick={() => setSelectedStateKey("draft")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              selectedStateKey === "draft"
                ? "bg-primary text-primary-text"
                : "bg-primary-dark text-primary-text hover:bg-primary-hover"
            }`}
          >
            Draft
          </button>
          <button
            onClick={() => setSelectedStateKey("submitted")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              selectedStateKey === "submitted"
                ? "bg-primary text-primary-text"
                : "bg-primary-dark text-primary-text hover:bg-primary-hover"
            }`}
          >
            Submitted (with Update)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center text-lg text-primary hover:text-primary-hover transition-colors cursor-pointer"
            >
              &lt; Back
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-medium text-primary-heading">
                {requestData.title}
              </h1>
              {renderStatusBadge(requestData.status)}
            </div>
            {requestData.createdOn && requestData.version && (
              <p className="text-sm text-secondary-subheading">
                Created on {requestData.createdOn} • {requestData.version}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {requestData.status === "Draft" && (
              <>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-text rounded-md transition-colors"
                >
                  Submit Request Now
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium border border-border text-txt-primary hover:bg-blue-50 rounded-md transition-colors"
                >
                  Edit Draft
                </button>
              </>
            )}

            {requestData.status === "Request Submitted" && (
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium border border-border text-txt-primary hover:bg-blue-50 rounded-md transition-colors"
              >
                Edit Request
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            {requestData.customerUpdate && (
              <div className="bg-card-bg rounded-lg p-4 text-txt-primary border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium  text-primary-heading">
                    Customer Update
                  </h3>
                  <p className="mt-1 text-sm text-secondary-subheading">
                    <span className="block font-medium text-sm text-txt-primary">
                      {requestData.customerUpdate.date}
                    </span>{" "}
                    {requestData.customerUpdate.message}
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-text rounded-md transition-colors self-start sm:self-auto"
                >
                  View Original Request
                </button>
              </div>
            )}

            <div className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-5">
              <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
                <svg
                  className="w-5 h-5 text-secondary-subheading"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h2 className="text-lg font-medium  text-primary-heading">
                  Request Summary
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-xs">
                <div>
                  <span className="block text-sm text-secondary-subheading font-medium">
                    Request ID
                  </span>
                  <span className="block text-sm font-semibold text-txt-primary">
                    {requestData.displayId}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-secondary-subheading font-medium">
                    Created On
                  </span>
                  <span className="block text-sm font-semibold text-txt-primary">
                    {requestData.createdOn}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-secondary-subheading font-medium">
                    Request Type
                  </span>
                  <span className="block text-sm font-semibold text-txt-primary">
                    {requestData.requestType}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-secondary-subheading font-medium">
                    Requested Date & Time
                  </span>
                  <span className="block text-sm font-semibold text-txt-primary">
                    {requestData.requestedDateTime}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-secondary-subheading font-medium">
                    Optional Date & Time
                  </span>
                  <span className="block text-sm font-semibold text-txt-primary">
                    {requestData.optionalDateTime}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-secondary-subheading font-medium">
                    No. of Requested Services
                  </span>
                  <span className="block text-sm font-semibold text-txt-primary">
                    {requestData.serviceCount}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium  text-primary-heading">
                  Description
                </h3>
                <p className="text-sm text-secondary-subheading leading-relaxed">
                  {requestData.description}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium  text-primary-heading">
                  Service Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {requestData.serviceGroups.map((group, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-50 border border-border-subtle rounded-md p-3"
                    >
                      <h4 className="text-sm font-semibold text-secondary-subheading mb-2">
                        {group.category}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-secondary-subheading flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium  text-primary-heading">
                  Site Access Notes
                </h3>
                <p className="text-sm text-secondary-subheading leading-relaxed">
                  {requestData.siteAccessNotes}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium  text-primary-heading">
                  Attached Photos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {requestData.attachedPhotos.map((photo, i) => (
                    <div
                      key={i}
                      className="w-16 h-12 rounded overflow-hidden border border-border"
                    >
                      <img
                        src={photo}
                        alt={`Attached ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {requestData.halfStacheNote && (
                <div className="pt-3 border-t border-border-subtle space-y-1">
                  <h3 className="text-sm font-extrabold text-primary-heading tracking-wider uppercase">
                    HALF STACHE NOTE
                  </h3>
                  <p className="text-sm text-secondary-subheading">
                    {requestData.halfStacheNote}
                  </p>
                </div>
              )}
            </div>

            {requestData.estimate && (
              <div className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-4">
                <h2 className="text-lg font-medium  text-primary-heading">
                  Service Estimate
                </h2>

                <div className="p-4 bg-blue-50 border border-border-subtle rounded-md w-full max-w-xs space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tag-rescheduling-text" />
                    <span className="text-sm font-medium text-tag-rescheduling-text">
                      {requestData.estimate.status}
                    </span>
                  </div>

                  <div>
                    <span className="block text-sm text-secondary-subheading">
                      Total estimate amount
                    </span>
                    <span className="text-lg font-medium  text-primary-heading">
                      {requestData.estimate.totalAmount}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-2 w-full py-2 px-3 text-sm font-medium border border-border text-txt-primary hover:bg-blue-50 bg-card-bg rounded transition-colors"
                  >
                    View Estimate Details
                  </button>
                </div>
              </div>
            )}

            <div className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-4">
              <h2 className="text-lg font-medium  text-primary-heading">
                Activity History
              </h2>

              <div className="space-y-4 divide-y divide-border-subtle">
                {requestData.activityHistory.map((item) => (
                  <div
                    key={item.id}
                    className="pt-3 first:pt-0 flex items-start justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tag-rescheduling-text mt-0.5" />
                        <h4 className="font-medium text-txt-primary">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-secondary-subheading pl-4">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-secondary-subheading whitespace-nowrap">
                      {item.timeAgo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card-bg rounded-lg border border-border overflow-hidden text-txt-primary">
            <div className="h-44 w-full overflow-hidden">
              <img
                src={requestData.property.imageUrl}
                alt={requestData.property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-blue-50 text-secondary-subheading rounded">
                  {requestData.property.tag}
                </span>
                <h3 className="text-sm font-medium  text-primary-heading">
                  {requestData.property.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-secondary-subheading">
                  <svg
                    className="w-3.5 h-3.5 text-secondary-subheading"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{requestData.property.address}</span>
                </div>
              </div>

              <div className="space-y-1 border-t border-border-subtle pt-3">
                <h4 className="text-sm font-medium  text-primary-heading">
                  Description
                </h4>
                <p className="text-sm text-secondary-subheading leading-relaxed">
                  {requestData.property.description}{" "}
                  <button
                    type="button"
                    className="underline font-semibold text-txt-primary"
                  >
                    see more
                  </button>
                </p>
              </div>

              <div className="space-y-1 border-t border-border-subtle pt-3">
                <h4 className="text-sm font-medium  text-primary-heading">
                  Property Size
                </h4>
                <div className="flex items-center gap-2 text-sm text-secondary-subheading">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
                  <span>{requestData.property.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
