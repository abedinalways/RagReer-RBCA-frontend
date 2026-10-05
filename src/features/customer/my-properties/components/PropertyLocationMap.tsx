"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Layers,
  Maximize2,
  Plus,
  Minus,
  Locate,
  MapPin,
  ExternalLink,
  X,
} from "lucide-react";

export interface PropertyLocationMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
  address?: string;
  cityRegion?: string;
  className?: string;
  allowFullscreen?: boolean;
  allowSatelliteToggle?: boolean;
}

const DEFAULT_COORDS = {
  lat: -6.7686,
  lng: 39.2468,
  zoom: 15,
};

function createPropertyPinIcon() {
  return L.divIcon({
    className: "property-location-pin",
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <!-- Pulsing radar ring -->
        <div style="
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(89, 128, 166, 0.4);
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <!-- Pin Beacon -->
        <div style="
          position: relative;
          z-index: 2;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #5980A6;
          border: 3px solid #FFFFFF;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 6px; height: 6px; border-radius: 50%; background: #FFFFFF;"></div>
        </div>
        <!-- Shadow -->
        <div style="
          position: absolute;
          bottom: 2px;
          width: 14px;
          height: 4px;
          background: rgba(0,0,0,0.25);
          border-radius: 50%;
          filter: blur(1px);
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

function createPopupContent(
  title: string,
  address: string,
  cityRegion: string,
  lat: number,
  lng: number
) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return `
    <div style="font-family: inherit; padding: 4px 2px; min-width: 170px;">
      <div style="font-weight: 600; font-size: 13px; color: #1e293b; margin-bottom: 2px; line-height: 1.3;">
        ${title}
      </div>
      <div style="font-size: 11px; color: #64748b; line-height: 1.4;">
        ${address}<br/>${cityRegion}
      </div>
      <div style="margin-top: 8px; border-top: 1px solid #f1f5f9; padding-top: 6px;">
        <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #5980A6;
          font-weight: 500;
          text-decoration: none;
        ">
          <span>View on Google Maps</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  `;
}

export function PropertyLocationMap({
  lat = DEFAULT_COORDS.lat,
  lng = DEFAULT_COORDS.lng,
  zoom = DEFAULT_COORDS.zoom,
  title = "Property Location",
  address = "220 Oakridge Way",
  cityRegion = "Mikocheni, Dar es Salaam",
  className = "w-full h-full",
  allowFullscreen = true,
  allowSatelliteToggle = true,
}: PropertyLocationMapProps) {
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Card Map References
  const cardMapContainerRef = useRef<HTMLDivElement>(null);
  const cardMapInstanceRef = useRef<L.Map | null>(null);
  const cardMarkerRef = useRef<L.Marker | null>(null);
  const [cardMapType, setCardMapType] = useState<"streets" | "satellite">("streets");
  const cardStreetLayerRef = useRef<L.TileLayer | null>(null);
  const cardSatelliteGroupRef = useRef<L.LayerGroup | null>(null);

  // Fullscreen Modal Map References
  const modalMapContainerRef = useRef<HTMLDivElement>(null);
  const modalMapInstanceRef = useRef<L.Map | null>(null);
  const modalMarkerRef = useRef<L.Marker | null>(null);
  const [modalMapType, setModalMapType] = useState<"streets" | "satellite">("streets");
  const modalStreetLayerRef = useRef<L.TileLayer | null>(null);
  const modalSatelliteGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Initialize Card Map
  useEffect(() => {
    if (!cardMapContainerRef.current || cardMapInstanceRef.current) return;

    const map = L.map(cardMapContainerRef.current, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 19 }
    );
    cardStreetLayerRef.current = streetLayer;

    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    );
    const esriLabels = L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    );
    const satelliteGroup = L.layerGroup([esriSatellite, esriLabels]);
    cardSatelliteGroupRef.current = satelliteGroup;

    streetLayer.addTo(map);

    const marker = L.marker([lat, lng], { icon: createPropertyPinIcon() })
      .addTo(map)
      .bindPopup(createPopupContent(title, address, cityRegion, lat, lng), {
        closeButton: true,
      });

    cardMarkerRef.current = marker;
    cardMapInstanceRef.current = map;

    const t = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(t);
      map.remove();
      cardMapInstanceRef.current = null;
    };
  }, [lat, lng, zoom, title, address, cityRegion]);

  // Update Card Map when coordinates change
  useEffect(() => {
    if (!cardMapInstanceRef.current || !cardMarkerRef.current) return;
    cardMapInstanceRef.current.setView([lat, lng], zoom);
    cardMarkerRef.current.setLatLng([lat, lng]);
  }, [lat, lng, zoom]);

  // Card ResizeObserver
  useEffect(() => {
    if (!cardMapContainerRef.current || !cardMapInstanceRef.current) return;

    const observer = new ResizeObserver(() => {
      cardMapInstanceRef.current?.invalidateSize();
    });
    observer.observe(cardMapContainerRef.current);

    return () => observer.disconnect();
  }, []);

  // Card Map Callbacks
  const handleCardZoomIn = useCallback(() => {
    cardMapInstanceRef.current?.zoomIn();
  }, []);

  const handleCardZoomOut = useCallback(() => {
    cardMapInstanceRef.current?.zoomOut();
  }, []);

  const handleCardRecenter = useCallback(() => {
    if (!cardMapInstanceRef.current) return;
    cardMapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 0.7 });
    cardMarkerRef.current?.openPopup();
  }, [lat, lng, zoom]);

  const toggleCardLayerType = useCallback(() => {
    const map = cardMapInstanceRef.current;
    if (!map) return;

    if (cardMapType === "streets") {
      if (cardStreetLayerRef.current) map.removeLayer(cardStreetLayerRef.current);
      if (cardSatelliteGroupRef.current) cardSatelliteGroupRef.current.addTo(map);
      setCardMapType("satellite");
    } else {
      if (cardSatelliteGroupRef.current) map.removeLayer(cardSatelliteGroupRef.current);
      if (cardStreetLayerRef.current) cardStreetLayerRef.current.addTo(map);
      setCardMapType("streets");
    }
  }, [cardMapType]);

  // 2. Initialize Fullscreen Modal Map (when isFullscreen is true)
  useEffect(() => {
    if (!isFullscreen || !modalMapContainerRef.current) return;

    const modalMap = L.map(modalMapContainerRef.current, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
    });

    const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 19 }
    );
    modalStreetLayerRef.current = streetLayer;

    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    );
    const esriLabels = L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    );
    const satelliteGroup = L.layerGroup([esriSatellite, esriLabels]);
    modalSatelliteGroupRef.current = satelliteGroup;

    if (modalMapType === "satellite") {
      satelliteGroup.addTo(modalMap);
    } else {
      streetLayer.addTo(modalMap);
    }

    const marker = L.marker([lat, lng], { icon: createPropertyPinIcon() })
      .addTo(modalMap)
      .bindPopup(createPopupContent(title, address, cityRegion, lat, lng), {
        closeButton: true,
      });

    modalMarkerRef.current = marker;
    modalMapInstanceRef.current = modalMap;

    const t = setTimeout(() => {
      modalMap.invalidateSize();
      marker.openPopup();
    }, 150);

    return () => {
      clearTimeout(t);
      modalMap.remove();
      modalMapInstanceRef.current = null;
    };
  }, [isFullscreen, lat, lng, zoom, title, address, cityRegion, modalMapType]);

  // Modal Map Callbacks
  const handleModalZoomIn = useCallback(() => {
    modalMapInstanceRef.current?.zoomIn();
  }, []);

  const handleModalZoomOut = useCallback(() => {
    modalMapInstanceRef.current?.zoomOut();
  }, []);

  const handleModalRecenter = useCallback(() => {
    if (!modalMapInstanceRef.current) return;
    modalMapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 0.7 });
    modalMarkerRef.current?.openPopup();
  }, [lat, lng, zoom]);

  const toggleModalLayerType = useCallback(() => {
    const map = modalMapInstanceRef.current;
    if (!map) return;

    if (modalMapType === "streets") {
      if (modalStreetLayerRef.current) map.removeLayer(modalStreetLayerRef.current);
      if (modalSatelliteGroupRef.current) modalSatelliteGroupRef.current.addTo(map);
      setModalMapType("satellite");
    } else {
      if (modalSatelliteGroupRef.current) map.removeLayer(modalSatelliteGroupRef.current);
      if (modalStreetLayerRef.current) modalStreetLayerRef.current.addTo(map);
      setModalMapType("streets");
    }
  }, [modalMapType]);

  // Fullscreen Body Overflow and Escape Key Listener
  useEffect(() => {
    if (!isFullscreen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <>
      {/* Inline Card Map View */}
      <div
        className={`relative rounded-lg overflow-hidden border border-border group bg-slate-100 ${className}`}
      >
        <div
          ref={cardMapContainerRef}
          className="w-full h-full relative z-0 min-h-[192px]"
          tabIndex={0}
        />

        {/* Top-Right Floating Actions */}
        <div className="absolute top-2.5 right-2.5 z-[5] flex items-center gap-1.5">
          {allowSatelliteToggle && (
            <button
              type="button"
              onClick={toggleCardLayerType}
              className="h-7 px-2 bg-white/95 hover:bg-white text-txt-primary rounded shadow-md border border-slate-200 text-[11px] font-medium flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
              title={`Switch to ${cardMapType === "streets" ? "Satellite" : "Street"} view`}
            >
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">
                {cardMapType === "streets" ? "Satellite" : "Street"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCardRecenter}
            className="w-7 h-7 bg-white/95 hover:bg-white text-txt-primary rounded shadow-md border border-slate-200 flex items-center justify-center transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
            title="Recenter Map on Property"
          >
            <Locate className="w-3.5 h-3.5 text-primary" />
          </button>

          {allowFullscreen && (
            <button
              type="button"
              onClick={() => {
                setModalMapType(cardMapType);
                setIsFullscreen(true);
              }}
              className="w-7 h-7 bg-white/95 hover:bg-white text-txt-primary rounded shadow-md border border-slate-200 flex items-center justify-center transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
              title="Expand Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-txt-primary" />
            </button>
          )}
        </div>

        {/* Bottom-Right Zoom Controls */}
        <div className="absolute bottom-2.5 right-2.5 z-[5] flex flex-col rounded-md shadow-md overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xs">
          <button
            type="button"
            onClick={handleCardZoomIn}
            className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-txt-primary transition-colors border-b border-slate-200 cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCardZoomOut}
            className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-txt-primary transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom-Left Open Maps link */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 left-2 z-[5] px-2 py-0.5 bg-white/90 hover:bg-white text-[10px] font-medium text-slate-700 hover:text-primary rounded shadow-xs border border-slate-200/80 flex items-center gap-1 transition-colors cursor-pointer backdrop-blur-xs"
          title="Open in Google Maps"
        >
          <span>Open Maps</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Fullscreen Modal View (Portaled to document.body to prevent clipping by overflow-hidden) */}
      {mounted &&
        isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setIsFullscreen(false)}
            />

            {/* Modal Dialog Card */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] bg-card-bg rounded-xl sm:rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200"
              role="dialog"
              aria-modal="true"
              aria-label={`${title} Fullscreen Map`}
            >
              {/* Header Bar */}
              <div className="bg-card-bg px-4 sm:px-6 py-3.5 border-b border-border flex items-center justify-between shrink-0 z-10 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-primary-heading truncate">
                      {title}
                    </h3>
                    <p className="text-xs text-secondary-subheading truncate">
                      {address} • {cityRegion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {allowSatelliteToggle && (
                    <button
                      type="button"
                      onClick={toggleModalLayerType}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-txt-primary border border-border rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Toggle Satellite / Street View"
                    >
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      <span>{modalMapType === "streets" ? "Satellite" : "Streets"}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(false)}
                    className="p-1.5 text-secondary-subheading hover:text-txt-primary hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                    title="Exit Fullscreen (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Map Canvas */}
              <div className="flex-1 w-full h-full relative z-0 min-h-[350px]">
                <div ref={modalMapContainerRef} className="w-full h-full" />

                {/* Floating Controls Inside Fullscreen Map */}
                <div className="absolute top-3.5 right-3.5 z-[400] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleModalRecenter}
                    className="px-3 py-1.5 bg-white/95 hover:bg-white text-txt-primary rounded-md shadow-lg border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
                    title="Recenter on Property"
                  >
                    <Locate className="w-4 h-4 text-primary" />
                    <span>Recenter</span>
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 z-[400] flex flex-col rounded-md shadow-lg overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={handleModalZoomIn}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-txt-primary transition-colors border-b border-slate-200 cursor-pointer font-bold"
                    title="Zoom In"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleModalZoomOut}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-txt-primary transition-colors cursor-pointer font-bold"
                    title="Zoom Out"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                {/* Open in Google Maps */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 z-[400] px-3 py-1.5 bg-white/95 hover:bg-white text-xs font-medium text-slate-700 hover:text-primary rounded-md shadow-md border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-xs"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
