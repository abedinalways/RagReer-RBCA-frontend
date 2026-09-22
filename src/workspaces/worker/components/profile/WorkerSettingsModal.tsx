"use client";

import { X, Bell, Moon, Shield, Smartphone } from "lucide-react";
import { useState } from "react";

interface WorkerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkerSettingsModal({ isOpen, onClose }: WorkerSettingsModalProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-slate-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-barlow text-lg font-bold text-primary-heading mb-4">
          Settings
        </h3>

        <div className="flex flex-col divide-y divide-[#EAECF0]">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2.5">
              <Bell className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-txt-primary">Push Notifications</p>
                <p className="text-[11px] text-secondary-subheading">Job updates and alerts</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4 accent-primary rounded cursor-pointer"
            />
          </div>

          {/* Location Tracking */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2.5">
              <Smartphone className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-txt-primary">GPS Tracking</p>
                <p className="text-[11px] text-secondary-subheading">Share location while on trip</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={locationTracking}
              onChange={(e) => setLocationTracking(e.target.checked)}
              className="h-4 w-4 accent-primary rounded cursor-pointer"
            />
          </div>

          {/* Version Info */}
          <div className="flex items-center justify-between py-3 text-[11px] text-secondary-subheading">
            <span>Worker PWA App Version</span>
            <span className="font-semibold text-txt-primary">v1.4.2</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 py-2 rounded-sm bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
}
