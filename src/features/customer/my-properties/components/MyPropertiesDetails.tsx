"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  User,
  Phone,
  MapPin,
  Maximize2,
  Building2,
  Dumbbell,
  Car,
  Waves,
  Trees,
} from "lucide-react";

import { PropertyDetailsData } from "../types/PropertyDetailsTypes";
import {
  defaultProperty,
  getPropertyDetailsById,
} from "../data/propertyDetailsData";
import SizeIcon from "@/components/icons/customer/SizeIcon";
import FloorIcon from "@/components/icons/customer/FloorIcon";
import GymIcon from "@/components/icons/customer/GymIcon";
import CarIcon from "@/components/icons/customer/CarIcon";
import PoolIcon from "@/components/icons/customer/PoolIcon";
import GardenIcon from "@/components/icons/customer/GardenIcon";
import { useModal } from "@/hooks/useModal";
import { PropertyGalleryModal } from "./PropertyGalleryModal";

const PropertyLocationMap = dynamic(
  () =>
    import("./PropertyLocationMap").then((mod) => mod.PropertyLocationMap),
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

interface MyPropertiesDetailsProps {
  propertyId?: string;
  property?: PropertyDetailsData;
  onBack?: () => void;
  onRequestService?: () => void;
  onShowMorePhotos?: () => void;
}

export const MyPropertiesDetails: React.FC<MyPropertiesDetailsProps> = ({
  propertyId,
  property: propertyProp,
  onBack,
  onRequestService,
  onShowMorePhotos,
}) => {
  const router = useRouter();
  const galleryModal = useModal<number>();

  const property =
    propertyProp ??
    (propertyId ? getPropertyDetailsById(propertyId) : defaultProperty);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleRequestService = () => {
    if (onRequestService) {
      onRequestService();
    } else {
      router.push("/requests/new");
    }
  };

  const handleShowMorePhotos = (initialIdx: number = 0) => {
    if (onShowMorePhotos) {
      onShowMorePhotos();
    } else {
      galleryModal.open(initialIdx);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors text-[1rem] font-medium focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleRequestService}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-text px-4 py-2 rounded-md font-medium text-[1rem] transition-colors shadow-sm focus:outline-none cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Request for Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card-bg text-primary-heading rounded-sm p-4 border border-border space-y-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              onClick={() => handleShowMorePhotos(0)}
              className="md:col-span-2 relative h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>

            <div className="flex flex-col gap-3 h-64 md:h-80">
              <div
                onClick={() => handleShowMorePhotos(1)}
                className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group"
              >
                <Image
                  src={property.images[1]}
                  alt="Property view 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              <div
                onClick={() => handleShowMorePhotos(2)}
                className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group"
              >
                <Image
                  src={property.images[2]}
                  alt="Property view 3"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <span className="text-white font-medium text-[1rem] tracking-wide">
                    Show more Photo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 pt-2">
            <h1 className="text-2xl font-medium text-primary-heading tracking-tight">
              {property.title}
            </h1>
            <span className="bg-blue-50 text-primary text-sm font-semibold px-3 py-1 rounded-xs shrink-0">
              {property.category}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-primary-heading">
              Description
            </h2>
            <p className="text-secondary-subheading text-sm leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="bg-page-bg rounded-lg p-5 border border-border-subtle space-y-4">
            <h2 className="text-lg font-medium text-primary-heading">
              Property Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm text-txt-primary">
              <div className="flex items-center gap-2.5">
                <SizeIcon/>
                <span className="text-base">{property.size}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <FloorIcon />
                <span className="text-base">{property.floors}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <GymIcon />
                <span className="text-base">Gym</span>
              </div>

              <div className="flex items-center gap-2.5">
                <CarIcon/>
                <span className="text-base">{property.amenities.parking}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <PoolIcon/>
                <span>{property.amenities.pool}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <GardenIcon/>
                <span className="text-base">{property.amenities.view}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <h2 className="text-lg font-medium text-primary-heading">
              Site Access Notes
            </h2>
            <p className="text-secondary-subheading text-sm leading-relaxed">
              {property.siteAccessNotes}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card-bg text-primary-heading rounded-sm p-4 border border-border shadow-lg">
            <div className="flex items-center gap-2 text-primary font-medium text-[18px] mb-4">
              <User className="w-5 h-5" />
              <span>Property Maintainer</span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border">
                <Image
                  src={property.maintainer.avatarUrl}
                  alt={property.maintainer.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-medium text-primary-heading text-[18px]">
                  {property.maintainer.name}
                </h3>
                <div className="flex items-center gap-1.5 text-secondary-subheading text-[1rem]">
                  <Phone className="w-3.5 h-3.5 text-secondary-subheading" />
                  <span>{property.maintainer.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card-bg text-primary-heading rounded-sm p-4 border border-border space-y-4 shadow-lg" >
            <h3 className="font-medium text-primary-heading text-[18px]">
              Property Location
            </h3>

            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
              <PropertyLocationMap
                lat={property.location.lat}
                lng={property.location.lng}
                zoom={property.location.zoom}
                title={property.title}
                address={property.location.address}
                cityRegion={property.location.cityRegion}
                className="w-full h-full"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 ">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-[0.875rem] font-medium text-primary">
                  {property.location.address}
                </p>
              </div>
              <p className="text-[12px] text-secondary-subheading">
                {property.location.cityRegion}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PropertyGalleryModal
        {...galleryModal.bind}
        images={property.images}
        title={property.title}
        initialIndex={galleryModal.data ?? 0}
      />
    </div>
  );
};

export default MyPropertiesDetails;
