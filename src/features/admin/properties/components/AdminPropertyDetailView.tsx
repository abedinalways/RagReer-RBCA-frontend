"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ChevronRight,
  User,
  Phone,
  MapPin,
  Clock,
  Search,
} from "lucide-react";
import SizeIcon from "@/components/icons/customer/SizeIcon";
import FloorIcon from "@/components/icons/customer/FloorIcon";
import GymIcon from "@/components/icons/customer/GymIcon";
import CarIcon from "@/components/icons/customer/CarIcon";
import PoolIcon from "@/components/icons/customer/PoolIcon";
import GardenIcon from "@/components/icons/customer/GardenIcon";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { PropertyGalleryModal } from "@/features/customer/my-properties/components/PropertyGalleryModal";
import {
  AdminPropertyDetailData,
  ServiceHistoryItem,
} from "../types/adminProperties.types";
import { defaultAdminPropertyDetail } from "../data/adminPropertiesData";

// Dynamically import Leaflet map on client side only to avoid SSR issues
const PropertyLocationMap = dynamic(
  () =>
    import(
      "@/features/customer/my-properties/components/PropertyLocationMap"
    ).then((mod) => mod.PropertyLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[192px] rounded-lg overflow-hidden border border-border bg-slate-50 flex flex-col items-center justify-center text-secondary-subheading gap-2 text-xs">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Loading property map...</span>
      </div>
    ),
  }
);

interface AdminPropertyDetailViewProps {
  property?: AdminPropertyDetailData;
  onBack: () => void;
  breadcrumbs?: React.ReactNode;
  onViewCalendar?: () => void;
}

export const AdminPropertyDetailView: React.FC<
  AdminPropertyDetailViewProps
> = ({ property = defaultAdminPropertyDetail, onBack, breadcrumbs, onViewCalendar }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Service History Search & Pagination
  const [historySearch, setHistorySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const filteredHistory = useMemo(() => {
    return property.serviceHistory.filter((item) => {
      return (
        item.jobId.toLowerCase().includes(historySearch.toLowerCase()) ||
        item.service.toLowerCase().includes(historySearch.toLowerCase()) ||
        item.visitDate.toLowerCase().includes(historySearch.toLowerCase())
      );
    });
  }, [property.serviceHistory, historySearch]);

  const historyColumns: ColumnDef<ServiceHistoryItem>[] = [
    {
      header: "Job ID",
      accessorKey: "jobId",
      cell: (row) => (
        <Link
          href={`/admin/job-pipeline/job-1/overview`}
          className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer"
        >
          {row.jobId}
        </Link>
      ),
    },
    {
      header: "Service",
      accessorKey: "service",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading">
          {row.service}
        </span>
      ),
    },
    {
      header: "Assigned Crew",
      cell: (row) => (
        <div className="flex items-center -space-x-1.5 overflow-hidden">
          {row.assignedCrew.map((crew, idx) => (
            <div
              key={`${crew.id}-${idx}`}
              className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-card-bg bg-slate-100 shrink-0"
              title={crew.name}
            >
              <Image
                src={crew.avatar}
                alt={crew.name}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "Visit Date",
      accessorKey: "visitDate",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading">
          {row.visitDate}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-crew-bg text-note-green-text border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-trend-up" />
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      {breadcrumbs ? (
        breadcrumbs
      ) : (
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Properties
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
          <span className="text-primary-heading font-medium">Details</span>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Details & Service History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-6">
            {/* 3-Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Big Image on Left */}
              <div
                onClick={() => openGallery(0)}
                className="md:col-span-2 relative h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer border border-border"
              >
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/* Stacked Images on Right */}
              <div className="flex flex-col gap-3 h-64 md:h-80">
                <div
                  onClick={() => openGallery(1)}
                  className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group border border-border"
                >
                  <Image
                    src={property.images[1]}
                    alt="Property image 2"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <div
                  onClick={() => openGallery(2)}
                  className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group border border-border"
                >
                  <Image
                    src={property.images[2] || property.images[0]}
                    alt="Property image 3"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <span className="text-white font-medium text-sm tracking-wide">
                      Show more Photo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Badges Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
                  {property.title}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-primary border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {property.status}
                </span>
              </div>

              <span className="bg-blue-50 text-primary text-xs font-medium px-3 py-1 rounded border border-blue-100/60 self-start sm:self-auto">
                {property.category}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h2 className="text-base font-medium text-primary-heading font-barlow-condensed">
                Description
              </h2>
              <p className="text-secondary-subheading text-xs sm:text-sm leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Details Card (6-item Grid) */}
            <div className="bg-page-bg/40 rounded-lg p-4 sm:p-5 border border-border space-y-3">
              <h2 className="text-base font-medium text-primary-heading font-barlow-condensed">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs sm:text-sm text-txt-primary">
                <div className="flex items-center gap-2.5">
                  <SizeIcon />
                  <span>{property.size}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <FloorIcon />
                  <span>{property.floors}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <GymIcon />
                  <span>Gym</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CarIcon />
                  <span>{property.amenities.parking}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <PoolIcon />
                  <span>{property.amenities.pool}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <GardenIcon />
                  <span>{property.amenities.view}</span>
                </div>
              </div>
            </div>

            {/* Site Access Notes */}
            <div className="space-y-1.5 pt-1">
              <h2 className="text-base font-medium text-primary-heading font-barlow-condensed">
                Site Access Notes
              </h2>
              <p className="text-secondary-subheading text-xs sm:text-sm leading-relaxed">
                {property.siteAccessNotes}
              </p>
            </div>
          </div>

          {/* Service History Card with Reusable Table */}
          <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-medium text-primary-heading font-barlow-condensed">
                Service History
              </h2>

              <div className="relative">
                <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Type to search"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-border rounded-md bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary w-48 sm:w-56"
                />
              </div>
            </div>

            <ReusableTable
              data={filteredHistory}
              columns={historyColumns}
              keyExtractor={(item) => item.id}
              emptyMessage="No service history found."
              pagination={{
                currentPage,
                itemsPerPage,
                onPageChange: setCurrentPage,
                onItemsPerPageChange: (items) => {
                  setItemsPerPage(items);
                  setCurrentPage(1);
                },
                pageSizeOptions: [10, 25, 50],
              }}
            />
          </div>
        </div>

        {/* Right Column (1 col): Maintainer, Map, Active Service, Upcoming Visits */}
        <div className="space-y-4">
          {/* 1. Property Maintainer Card */}
          <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
              <User className="w-4 h-4" />
              <span>Property Maintainer</span>
            </div>

            <div className="flex items-center gap-3.5 pt-1">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border">
                <Image
                  src={property.maintainer.avatarUrl}
                  alt={property.maintainer.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-medium text-primary-heading text-sm sm:text-base truncate">
                  {property.maintainer.name}
                </h3>
                <div className="flex items-center gap-1.5 text-secondary-subheading text-xs sm:text-sm">
                  <Phone className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                  <span>{property.maintainer.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Property Location Card with Leaflet Map */}
          <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs space-y-3">
            <h3 className="font-medium text-primary-heading text-sm sm:text-base font-barlow-condensed">
              Property Location
            </h3>

            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
              <PropertyLocationMap
                lat={property.location.lat}
                lng={property.location.lng}
                zoom={property.location.zoom || 15}
                title={property.title}
                address={property.location.address}
                cityRegion={property.location.cityRegion}
                className="w-full h-full"
              />
            </div>

            <div className="space-y-0.5 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <p className="text-xs sm:text-sm font-medium text-primary">
                  {property.location.address}
                </p>
              </div>
              <p className="text-[11px] text-secondary-subheading pl-5">
                {property.location.cityRegion}
              </p>
            </div>
          </div>

          {/* 3. Active Service Card */}
          <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-primary-heading text-sm sm:text-base font-barlow-condensed">
                Active Service
              </h3>
              <Link
                href="/admin/job-pipeline/job-1/overview"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
              >
                <span>View Details</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="border border-border rounded-lg p-3 sm:p-3.5 space-y-2.5 bg-card-bg">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-medium text-primary-heading">
                  {property.activeService.title}
                </h4>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-primary border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {property.activeService.status}
                </span>
              </div>

              <div className="space-y-1 text-xs text-secondary-subheading">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                  <span>{property.activeService.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                  <span className="truncate">
                    {property.activeService.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/70 text-xs text-secondary-subheading">
                <span>Crew: {property.activeService.crewName}</span>
                <div className="flex items-center -space-x-1.5 overflow-hidden">
                  {property.activeService.crewAvatars.map((avatar, idx) => (
                    <div
                      key={idx}
                      className="relative w-5 h-5 rounded-full overflow-hidden border border-card-bg bg-slate-100 shrink-0"
                    >
                      <Image
                        src={avatar}
                        alt="Crew"
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Upcoming Visits Card */}
          <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-primary-heading text-sm sm:text-base font-barlow-condensed">
                Upcoming Visits
              </h3>
              {onViewCalendar ? (
                <button
                  type="button"
                  onClick={onViewCalendar}
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View Calendar</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <Link
                  href="/admin/schedule"
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
                >
                  <span>View Calendar</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <div className="space-y-3">
              {property.upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="border border-border rounded-lg p-3 flex gap-3 bg-card-bg"
                >
                  {/* Left Date Block */}
                  <div className="w-12 h-14 rounded-md bg-blue-50/70 border border-blue-100 flex flex-col items-center justify-center py-1 shrink-0 text-center">
                    <span className="text-[10px] font-medium text-secondary-subheading uppercase">
                      {visit.month}
                    </span>
                    <span className="text-base font-medium text-primary-heading leading-tight">
                      {visit.day}
                    </span>
                  </div>

                  {/* Right Content */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-medium text-primary-heading truncate">
                        {visit.title}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                          visit.status === "Scheduled"
                            ? "bg-blue-50 text-primary border border-blue-100"
                            : "bg-apt-upcoming-bg text-amber-800 border border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            visit.status === "Scheduled"
                              ? "bg-primary"
                              : "bg-flagged-amber"
                          }`}
                        />
                        {visit.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-secondary-subheading truncate">
                      {visit.subtitle}
                    </p>

                    <div className="space-y-0.5 text-[11px] text-secondary-subheading">
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{visit.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>{visit.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-border/70 text-[11px] text-secondary-subheading">
                      <span>Crew: {visit.crewName}</span>
                      <div className="flex items-center -space-x-1.5 overflow-hidden">
                        {visit.crewAvatars.map((avatar, idx) => (
                          <div
                            key={idx}
                            className="relative w-4 h-4 rounded-full overflow-hidden border border-card-bg bg-slate-100 shrink-0"
                          >
                            <Image
                              src={avatar}
                              alt="Crew"
                              fill
                              sizes="16px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <PropertyGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={property.images}
        title={property.title}
        initialIndex={galleryIndex}
      />
    </div>
  );
};

export default AdminPropertyDetailView;
