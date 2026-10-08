"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Locate,
  Layers,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  MapPin,
  ArrowLeft,
  X,
} from "lucide-react";

export interface LatLngPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface RealRouteMapProps {
  startPoint?: LatLngPoint;
  destinationPoint?: LatLngPoint;
  routeCoords?: [number, number][];
  className?: string;
  initialFullscreen?: boolean;
  onToggleFullscreen?: (isFullscreen: boolean) => void;
  destinationTitle?: string;
  destinationAddress?: string;
}

// Real coordinates matching the user's Laguna Niguel, CA route
const DEFAULT_ROUTE: [number, number][] = [
  [33.5358, -117.7075], // Start: Alicia Pkwy & Golden Lantern
  [33.5348, -117.7067],
  [33.5338, -117.706], // Golden Lantern
  [33.5327, -117.7071], // Turn into Nueva Vista Dr
  [33.5317, -117.7058],
  [33.531, -117.7038], // Destination residence
];

const DEFAULT_START: LatLngPoint = {
  lat: 33.5358,
  lng: -117.7075,
  label: "Crew Vehicle (Alicia & Golden Lantern)",
};

const DEFAULT_DESTINATION: LatLngPoint = {
  lat: 33.531,
  lng: -117.7038,
  label: "100 Whispering Pines Blvd at Hwy 43",
};

export function RealRouteMap({
  startPoint = DEFAULT_START,
  destinationPoint = DEFAULT_DESTINATION,
  routeCoords = DEFAULT_ROUTE,
  className = "w-full h-full",
  initialFullscreen = false,
  onToggleFullscreen,
  destinationTitle = "Route Map",
  destinationAddress = "100 Whispering Pines Blvd at Hwy 43",
}: RealRouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(initialFullscreen);
  const [mapType, setMapType] = useState<"satellite" | "streets">("satellite");
  const satelliteLayerRef = useRef<L.LayerGroup | null>(null);
  const streetLayerRef = useRef<L.TileLayer | null>(null);

  // Sync isFullscreen with initialFullscreen if prop changes
  useEffect(() => {
    if (initialFullscreen !== undefined) {
      setIsFullscreen(initialFullscreen);
    }
  }, [initialFullscreen]);

  // Lock body scroll and handle Escape key when in fullscreen
  useEffect(() => {
    if (!isFullscreen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        onToggleFullscreen?.(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, onToggleFullscreen]);

  // Resize Leaflet when fullscreen changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const t1 = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 100);

    const t2 = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
      const polyline = L.polyline(routeCoords);
      mapInstanceRef.current?.fitBounds(polyline.getBounds(), {
        padding: isFullscreen ? [60, 60] : [40, 40],
      });
    }, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isFullscreen, routeCoords]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center between start and destination
    const centerLat = (startPoint.lat + destinationPoint.lat) / 2;
    const centerLng = (startPoint.lng + destinationPoint.lng) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    });

    // 1. Satellite Base Tiles (Esri World Imagery)
    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
      }
    );

    // 2. Street Names & Boundaries Overlay for satellite
    const esriLabels = L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
      }
    );

    // Group satellite + labels
    const satelliteGroup = L.layerGroup([esriSatellite, esriLabels]);
    satelliteGroup.addTo(map);
    satelliteLayerRef.current = satelliteGroup;

    // Street view tiles (OpenStreetMap)
    const streetTiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
      }
    );
    streetLayerRef.current = streetTiles;

    // 3. Draw Route Polyline (matching red route in screenshot)
    const polyline = L.polyline(routeCoords, {
      color: "#EF4444",
      weight: 5,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    // 4. Start Point Marker (Red circular dot with white border)
    const startIcon = L.divIcon({
      className: "custom-start-marker",
      html: `
        <div style="
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #EF4444;
          border: 3px solid #FFFFFF;
          box-shadow: 0 0 8px rgba(0,0,0,0.5);
        "></div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker([startPoint.lat, startPoint.lng], { icon: startIcon })
      .addTo(map)
      .bindPopup(`<b>Start:</b> ${startPoint.label || "Start location"}`);

    // 5. Destination Point Marker (Red target pin with pulsing effect)
    const destIcon = L.divIcon({
      className: "custom-dest-marker",
      html: `
        <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(239, 68, 68, 0.35);
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #EF4444;
            border: 3px solid #FFFFFF;
            box-shadow: 0 2px 10px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 6px; height: 6px; border-radius: 50%; background: #FFFFFF;"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    L.marker([destinationPoint.lat, destinationPoint.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<b>Destination:</b> ${destinationPoint.label || "Destination"}`);

    // Fit map view to the route bounds with padding
    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [startPoint, destinationPoint, routeCoords]);

  // Toggle Satellite / Street view
  const toggleMapType = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (mapType === "satellite") {
      if (satelliteLayerRef.current) map.removeLayer(satelliteLayerRef.current);
      if (streetLayerRef.current) streetLayerRef.current.addTo(map);
      setMapType("streets");
    } else {
      if (streetLayerRef.current) map.removeLayer(streetLayerRef.current);
      if (satelliteLayerRef.current) satelliteLayerRef.current.addTo(map);
      setMapType("satellite");
    }
  };

  // Re-center on Route
  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const polyline = L.polyline(routeCoords);
    map.fitBounds(polyline.getBounds(), {
      padding: isFullscreen ? [60, 60] : [40, 40],
    });
  };

  // Zoom in / out
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  // Try real GPS from device
  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstanceRef.current) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        mapInstanceRef.current?.setView([latitude, longitude], 17);
        // Add a temporary blue dot for user's actual location
        const userIcon = L.divIcon({
          className: "user-gps-dot",
          html: `<div style="width: 14px; height: 14px; border-radius: 50%; background: #2563EB; border: 3px solid #FFFFFF; box-shadow: 0 0 10px #2563EB;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        if (mapInstanceRef.current) {
          L.marker([latitude, longitude], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup("Your exact live location")
            .openPopup();
        }
      },
      (err) => {
        console.warn("Geolocation permission not granted or unavailable", err);
      },
      { enableHighAccuracy: true }
    );
  };

  // Toggle Fullscreen mode
  const toggleFullscreen = () => {
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    onToggleFullscreen?.(nextState);
  };

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 w-screen h-screen bg-slate-950 flex flex-col"
          : `relative ${className}`
      }
    >
      {/* Fullscreen Header Bar */}
      {isFullscreen && (
        <header className="flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md border-b border-white/10 text-white z-20 shrink-0 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer active:scale-95"
              aria-label="Exit Full Screen"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold truncate leading-tight">
                {destinationTitle}
              </h2>
              <p className="text-[11px] text-white/70 truncate">
                {destinationAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-sm">
              Live GPS Tracking
            </span>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Exit Full Screen (Esc)"
            >
              <Minimize2 className="h-4 w-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </header>
      )}

      {/* Map Canvas Container */}
      <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Map Controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 shadow-md">
          {/* Fullscreen Toggle Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-sm bg-white/95 backdrop-blur-sm text-txt-primary hover:bg-white transition-colors cursor-pointer shadow-xs active:scale-95"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Full Screen Map"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-primary" />
            ) : (
              <Maximize2 className="h-4 w-4 text-primary" />
            )}
          </button>

          {/* Toggle Layer Button (Satellite / Streets) */}
          <button
            type="button"
            onClick={toggleMapType}
            className="p-2 rounded-sm bg-white/95 backdrop-blur-sm text-txt-primary hover:bg-white transition-colors cursor-pointer shadow-xs active:scale-95"
            title={`Switch to ${mapType === "satellite" ? "Street" : "Satellite"} view`}
          >
            <Layers className="h-4 w-4" />
          </button>

          {/* Locate / Live GPS */}
          <button
            type="button"
            onClick={handleLocateMe}
            className="p-2 rounded-sm bg-white/95 backdrop-blur-sm text-txt-primary hover:bg-white transition-colors cursor-pointer shadow-xs active:scale-95"
            title="Detect my current GPS location"
          >
            <Locate className="h-4 w-4 text-primary" />
          </button>

          {/* Re-center route */}
          <button
            type="button"
            onClick={handleRecenter}
            className="p-2 rounded-sm bg-white/95 backdrop-blur-sm text-txt-primary hover:bg-white transition-colors cursor-pointer shadow-xs active:scale-95"
            title="Fit route in view"
          >
            <Navigation className="h-4 w-4 text-primary" />
          </button>

          {/* Zoom In & Out */}
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 rounded-sm bg-white/95 backdrop-blur-sm text-txt-primary hover:bg-white transition-colors cursor-pointer shadow-xs active:scale-95"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 rounded-sm bg-white/95 backdrop-blur-sm text-txt-primary hover:bg-white transition-colors cursor-pointer shadow-xs active:scale-95"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>

        {/* Map Mode Tag (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-sm bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide pointer-events-none flex items-center gap-1.5 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{mapType === "satellite" ? "Satellite 3D Imagery" : "Street Map"}</span>
        </div>

        {/* Fullscreen Floating Bottom Destination Bar */}
        {isFullscreen && (
          <div className="absolute bottom-4 left-4 right-4 z-10 max-w-md mx-auto p-3.5 rounded-lg bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-primary-heading truncate">
                  {destinationAddress}
                </p>
                <p className="text-[11px] text-secondary-subheading">
                  Estimated travel: <span className="font-semibold text-primary">~8 mins (3.2 mi)</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRecenter}
              className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Recenter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
