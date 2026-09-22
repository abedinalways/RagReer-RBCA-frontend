"use client";

import { Phone, Mail, X } from "lucide-react";

interface SupervisorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupervisorContactModal({
  isOpen,
  onClose,
}: SupervisorContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xs rounded-xl bg-white p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-slate-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Supervisor Profile */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 mb-3 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
              alt="Supervisor"
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="font-barlow text-lg font-bold text-primary-heading">
            David Sullivan
          </h3>
          <p className="text-xs text-secondary-subheading">
            Field Operations Supervisor
          </p>
          <span className="mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Available On-Duty
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <a
            href="tel:+18005550199"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-xs"
          >
            <Phone className="h-4 w-4" />
            <span>Call (+1 800 555-0199)</span>
          </a>

          <a
            href="sms:+18005550199"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border border-[#D9DADC] text-txt-primary text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <Mail className="h-4 w-4 text-secondary-subheading" />
            <span>Send Message</span>
          </a>
        </div>
      </div>
    </div>
  );
}
