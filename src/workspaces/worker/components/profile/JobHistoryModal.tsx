"use client";

import { X, CheckCircle2, Calendar, MapPin } from "lucide-react";
import { MOCK_WORKER_JOBS } from "../../data/mockWorkerJobs";

interface JobHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JobHistoryModal({ isOpen, onClose }: JobHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm max-h-[85vh] flex flex-col rounded-xl bg-white p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
          <h3 className="font-barlow text-lg font-bold text-primary-heading">
            Job History
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {MOCK_WORKER_JOBS.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-sm border border-[#D9DADC] bg-white shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary-heading truncate">
                  {job.title}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-secondary-subheading">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{job.address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-secondary-subheading/80">
                <Calendar className="h-3 w-3" />
                <span>{job.dateKey} • {job.service}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 py-2 rounded-sm bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-xs"
        >
          Close
        </button>
      </div>
    </div>
  );
}
