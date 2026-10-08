"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/reusable/Modal";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import {
  ServiceItem,
  ServicePricingType,
  ServicePricingBasis,
  TieredSetBy,
  PropertySizeOption,
  CrewSizeOption,
} from "../types";
import {
  SERVICE_CATEGORIES,
  SERVICE_PRICING_TYPES,
  SERVICE_PRICING_BASIS_OPTIONS,
  TIERED_SET_BY_OPTIONS,
  PROPERTY_SIZE_OPTIONS,
  CREW_SIZE_OPTIONS,
} from "../data/servicesData";
import { ApplicableToMultiSelect } from "./ApplicableToMultiSelect";
import { ServiceStatusToggle } from "./ServiceStatusToggle";

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ServiceItem | null;
  onSave: (data: Omit<ServiceItem, "id" | "updatedOn"> & { id?: string }) => void;
}

export function ServiceFormModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: ServiceFormModalProps) {
  const isEditing = Boolean(initialData);

  // Common Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(SERVICE_CATEGORIES[2]); // Default "Commercial Services"
  const [applicableTo, setApplicableTo] = useState<string[]>([]);
  const [pricingType, setPricingType] = useState<ServicePricingType>("Fixed Price");

  // Dynamic Pricing Fields
  const [price, setPrice] = useState("70.00");
  const [minPrice, setMinPrice] = useState("0.00");
  const [maxPrice, setMaxPrice] = useState("0.00");
  const [pricingBasis, setPricingBasis] = useState<string>("Per Property");
  const [setBy, setSetBy] = useState<TieredSetBy>("Set by Property Size");
  const [propertySize, setPropertySize] = useState<PropertySizeOption>("1/4 acre");
  const [crewSize, setCrewSize] = useState<CrewSizeOption>("One person");

  // Bottom controls
  const [addMaterialCost, setAddMaterialCost] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setCategory(initialData.category || SERVICE_CATEGORIES[2]);
      setApplicableTo(
        Array.isArray(initialData.applicableTo)
          ? initialData.applicableTo
          : [initialData.applicableTo].filter(Boolean)
      );
      setPricingType(initialData.pricingType || "Fixed Price");
      setPrice(initialData.price || "70.00");
      setMinPrice(initialData.minPrice || "0.00");
      setMaxPrice(initialData.maxPrice || "0.00");
      setPricingBasis(initialData.pricingBasis || "Per Property");
      setSetBy(initialData.setBy || "Set by Property Size");
      setPropertySize(initialData.propertySize || "1/4 acre");
      setCrewSize(initialData.crewSize || "One person");
      setAddMaterialCost(initialData.addMaterialCost || false);
      setIsActive(initialData.isActive !== false);
    } else {
      setName("");
      setDescription("");
      setCategory(SERVICE_CATEGORIES[0]);
      setApplicableTo([
        "HOA Maintenance",
        "Church Maintenance",
        "Commercial Add-On",
      ]);
      setPricingType("Fixed Price");
      setPrice("0.00");
      setMinPrice("0.00");
      setMaxPrice("0.00");
      setPricingBasis("Per Property");
      setSetBy("Set by Property Size");
      setPropertySize("1/4 acre");
      setCrewSize("One person");
      setAddMaterialCost(false);
      setIsActive(true);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialData?.id,
      name: name.trim(),
      description: description.trim() || "No description provided",
      category,
      applicableTo,
      pricingType,
      pricingBasis,
      price,
      minPrice,
      maxPrice,
      setBy,
      propertySize,
      crewSize,
      addMaterialCost,
      isActive,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Service" : "Add Service"}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Service Name */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
            Service Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Storm Inspection"
            className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description about the service"
            className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Applicable To (Multi-Select with Badges & Checkboxes) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
            Applicable To
          </label>
          <ApplicableToMultiSelect
            selected={applicableTo}
            onChange={setApplicableTo}
          />
        </div>

        {/* Pricing Type */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
            Pricing Type
          </label>
          <div className="relative">
            <select
              value={pricingType}
              onChange={(e) => setPricingType(e.target.value as ServicePricingType)}
              className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              {SERVICE_PRICING_TYPES.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DYNAMIC PRICING FIELDS BASED ON PRICING TYPE (Image 3 logic)  */}
        {/* ------------------------------------------------------------- */}

        {/* 1. FIXED PRICE */}
        {pricingType === "Fixed Price" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Price */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-txt-primary pointer-events-none">
                  $
                </span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                  placeholder="0.00"
                  className="w-full pl-7 pr-8 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Pricing Basis */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                Pricing Basis
              </label>
              <div className="relative">
                <select
                  value={pricingBasis}
                  onChange={(e) => setPricingBasis(e.target.value)}
                  className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                >
                  <option value="">Select preferred pricing basis</option>
                  {SERVICE_PRICING_BASIS_OPTIONS.map((pb) => (
                    <option key={pb} value={pb}>
                      {pb}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* 2. PRICE RANGE */}
        {pricingType === "Price Range" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3.5">
              {/* Min Price */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-txt-primary pointer-events-none">
                    $
                  </span>
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                    placeholder="0.00"
                    className="w-full pl-7 pr-8 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                  <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-txt-primary pointer-events-none">
                    $
                  </span>
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                    placeholder="0.00"
                    className="w-full pl-7 pr-8 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                  <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Pricing Basis */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                Pricing Basis
              </label>
              <div className="relative">
                <select
                  value={pricingBasis}
                  onChange={(e) => setPricingBasis(e.target.value)}
                  className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                >
                  <option value="">Select preferred pricing basis</option>
                  {SERVICE_PRICING_BASIS_OPTIONS.map((pb) => (
                    <option key={pb} value={pb}>
                      {pb}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* 3. TIERED PRICING */}
        {pricingType === "Tiered Pricing" && (
          <div className="space-y-3.5">
            {/* Set By */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                Set By
              </label>
              <div className="relative">
                <select
                  value={setBy}
                  onChange={(e) => setSetBy(e.target.value as TieredSetBy)}
                  className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                >
                  {TIERED_SET_BY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* If Set By Property Size: Property Size | Min Price | Max Price */}
            {setBy === "Set by Property Size" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Property Size */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                    Property Size
                  </label>
                  <div className="relative">
                    <select
                      value={propertySize}
                      onChange={(e) => setPropertySize(e.target.value as PropertySizeOption)}
                      className="appearance-none w-full bg-card-bg border border-border rounded-md px-3 py-2.5 pr-7 text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                    >
                      {PROPERTY_SIZE_OPTIONS.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                    Min Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-txt-primary pointer-events-none">
                      $
                    </span>
                    <input
                      type="text"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="0.00"
                      className="w-full pl-6 pr-7 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                    Max Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-txt-primary pointer-events-none">
                      $
                    </span>
                    <input
                      type="text"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="0.00"
                      className="w-full pl-6 pr-7 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* If Set By Crew Size: No. of Crew | Pricing Basis | Price */}
            {setBy === "Set by Crew Size" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* No. of Crew */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                    No. of Crew
                  </label>
                  <div className="relative">
                    <select
                      value={crewSize}
                      onChange={(e) => setCrewSize(e.target.value as CrewSizeOption)}
                      className="appearance-none w-full bg-card-bg border border-border rounded-md px-3 py-2.5 pr-7 text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                    >
                      {CREW_SIZE_OPTIONS.map((cr) => (
                        <option key={cr} value={cr}>
                          {cr}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Pricing Basis */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                    Pricing Basis
                  </label>
                  <div className="relative">
                    <select
                      value={pricingBasis}
                      onChange={(e) => setPricingBasis(e.target.value)}
                      className="appearance-none w-full bg-card-bg border border-border rounded-md px-3 py-2.5 pr-7 text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                    >
                      <option value="Fixed Price">Fixed Price</option>
                      {SERVICE_PRICING_BASIS_OPTIONS.map((pb) => (
                        <option key={pb} value={pb}>
                          {pb}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-txt-primary mb-1.5">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-txt-primary pointer-events-none">
                      $
                    </span>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="0.00"
                      className="w-full pl-6 pr-7 py-2.5 rounded-md border border-border bg-card-bg text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. CUSTOM QUOTE */}
        {pricingType === "Custom Quote" && (
          <div className="p-3 bg-page-bg/50 rounded-md border border-border/60 text-xs text-secondary-subheading">
            Custom quote service. Pricing will be tailored and quoted dynamically per client request.
          </div>
        )}

        {/* Add Material Cost checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="add-material-cost"
            checked={addMaterialCost}
            onChange={(e) => setAddMaterialCost(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary border-border cursor-pointer"
          />
          <label
            htmlFor="add-material-cost"
            className="text-xs sm:text-sm font-medium text-txt-primary cursor-pointer select-none"
          >
            Add Material Cost
          </label>
        </div>

        {/* Status Toggle Switch */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs sm:text-sm font-medium text-txt-primary select-none">
            Status
          </span>
          <ServiceStatusToggle
            isActive={isActive}
            onChange={setIsActive}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-md border border-[#5980A6]/60 text-[#2D6A9F] hover:bg-page-bg font-medium text-sm transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm transition-colors cursor-pointer text-center shadow-xs"
          >
            {isEditing ? "Save Changes" : "Add Service"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
