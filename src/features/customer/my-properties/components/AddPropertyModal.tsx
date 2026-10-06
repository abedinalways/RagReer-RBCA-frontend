"use client";

import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import { Property, PropertyType } from "../types/PropertyTypes";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: Property) => void;
  initialProperty?: Property | null;
}

const PROPERTY_TYPES = ["Residential", "Commercial"];

const LOT_SIZES = [
  "Small (up to 1/4 acre)",
  "Medium (1/4 - 1/2 acre)",
  "Large (1/2 - 1 acre)",
  "X-Large (1+ acre)",
];

const AMENITIES_OPTIONS = ["Gym", "Parking", "Pool", "Garden View"];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
];

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProperty,
}) => {
  const [propertyType, setPropertyType] = useState<string>("");
  const [propertyName, setPropertyName] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [description, setDescription] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maintainerName, setMaintainerName] = useState("");
  const [maintainerPhone, setMaintainerPhone] = useState("");
  const [siteAccessNote, setSiteAccessNote] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string>("");

  useEffect(() => {
    if (initialProperty) {
      setPropertyType(initialProperty.type);
      setPropertyName(initialProperty.title);
      setStreet1(initialProperty.street1 || initialProperty.address);
      setStreet2(initialProperty.street2 || "");
      setCity(initialProperty.city || "");
      setState(initialProperty.state || "");
      setPostalCode(initialProperty.postalCode || "");
      setDescription(initialProperty.description || "");
      setLotSize(initialProperty.size);
      setSelectedAmenities(initialProperty.amenities || []);
      setMaintainerName(initialProperty.maintainerName || "");
      setMaintainerPhone(initialProperty.maintainerPhone || "");
      setSiteAccessNote(initialProperty.siteAccessNote || "");
      setPhotoPreview(initialProperty.imageUrl);
    } else {
      setPropertyType("");
      setPropertyName("");
      setStreet1("");
      setStreet2("");
      setCity("");
      setState("");
      setPostalCode("");
      setDescription("");
      setLotSize("");
      setSelectedAmenities([]);
      setMaintainerName("");
      setMaintainerPhone("");
      setSiteAccessNote("");
      setPhotoPreview("");
    }
  }, [initialProperty, isOpen]);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyName || !street1) return;

    const fullAddress = [street1, street2, city, state]
      .filter(Boolean)
      .join(", ");

    const newProperty: Property = {
      id: initialProperty ? initialProperty.id : `prop-${Date.now()}`,
      title: propertyName,
      type: (propertyType as PropertyType) || "Residential",
      status: "Active",
      address: fullAddress || "100 Whispering Pines Blvd at Hwy 43",
      size: lotSize || "Small (up to 1/4 acre)",
      imageUrl:
        photoPreview ||
        SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)],
      street1,
      street2,
      city,
      state,
      postalCode,
      description,
      amenities: selectedAmenities,
      maintainerName,
      maintainerPhone,
      siteAccessNote,
    };

    onSave(newProperty);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialProperty ? "Edit Property Details" : "Add New Property"}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Section: Property Address */}
        <div className="space-y-2.5">
          <h4 className="text-lg font-medium text-primary-heading">
            Property Address
          </h4>

          <CustomSelect
            value={propertyType}
            onChange={(val) => setPropertyType(val)}
            options={PROPERTY_TYPES}
            placeholder="Select property type"
            size="lg"
          />

          <input
            type="text"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder="Property Name"
            className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            value={street1}
            onChange={(e) => setStreet1(e.target.value)}
            placeholder="Street 1"
            className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            value={street2}
            onChange={(e) => setStreet2(e.target.value)}
            placeholder="Street 2"
            className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <div className="grid grid-cols-3 gap-2.5">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
              className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Section: Describe about your property */}
        <div className="space-y-1.5">
          <h4 className="text-lg font-medium text-primary-heading">
            Describe about your property
          </h4>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setDescription(e.target.value);
                }
              }}
              rows={3}
              placeholder="About your floors, gym, pool, etc.."
              className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <span className="absolute bottom-2.5 right-3 text-[11px] text-secondary-subheading">
              {description.length}/200
            </span>
          </div>
        </div>

        {/* Section: Approximate Lot Size */}
        <div className="space-y-1.5">
          <h4 className="text-lg font-medium text-primary-heading">
            Approximate Lot Size
          </h4>
          <CustomSelect
            value={lotSize}
            onChange={(val) => setLotSize(val)}
            options={LOT_SIZES}
            placeholder="Select size"
            size="lg"
          />
        </div>

        {/* Section: Choose What you Have */}
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-primary-heading">
            Choose What you Have <span className="text-trend-down">*</span>
          </h4>
          <div className="flex flex-col gap-2">
            {AMENITIES_OPTIONS.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2.5 text-sm  md:text-base  text-secondary-subheading cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(item)}
                  onChange={() => handleAmenityToggle(item)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section: Property Maintainer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <h4 className="text-lg font-medium text-primary-heading">
              Property Maintainer Name
            </h4>
            <input
              type="text"
              value={maintainerName}
              onChange={(e) => setMaintainerName(e.target.value)}
              placeholder="Enter the person name"
              className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-sm md:text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-lg font-medium text-primary-heading">
              Property Maintainer Phone
            </h4>
            <input
              type="text"
              value={maintainerPhone}
              onChange={(e) => setMaintainerPhone(e.target.value)}
              placeholder="XXX-(XXXX)-xxx"
              className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-sm md:text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Section: Site Access Note */}
        <div className="space-y-1.5">
          <h4 className="text-lg font-medium text-primary-heading">
            Site Access Note
          </h4>
          <input
            type="text"
            value={siteAccessNote}
            onChange={(e) => setSiteAccessNote(e.target.value)}
            placeholder="Gate access required , 2 dogs on property (indoors during service), Tenan..."
            className="w-full bg-card-bg border border-border rounded-md px-3.5 py-2 text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Section: Add Photos */}
        <div className="space-y-1.5">
          <h4 className="text-lg font-medium text-primary-heading">
            Add Photos <span className="text-secondary-subheading text-lg">(Thumbnail, front view, side view, back view etc)</span>
          </h4>

          <div className="flex items-center gap-3">
            {photoPreview ? (
              <div className="relative w-20 h-20 rounded-md overflow-hidden border border-border shrink-0">
                <img
                  src={photoPreview}
                  alt="Property Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPhotoPreview("")}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            <label className="w-20 h-20 border-2 border-dashed border-border-card rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-50/40 transition-colors shrink-0">
              <Plus className="w-6 h-6 text-primary stroke-[1.5]" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Actions Row */}
        <div className="grid grid-cols-2 gap-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 flex items-center justify-center rounded-md border border-primary bg-card-bg text-primary hover:bg-blue-50/50 text-base font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full h-11 flex items-center justify-center rounded-md bg-primary hover:bg-primary-hover text-white text-base font-medium transition-colors cursor-pointer shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
