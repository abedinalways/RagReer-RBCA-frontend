"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Calendar,
  X,
  RotateCcw,
  BadgePercent,
  ChevronsUpDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "@/components/reusable/Modal";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface AffectedTask {
  id: string;
  label: string;
  checked: boolean;
}

interface StrikeCrewMember {
  id: string;
  name: string;
  avatar: string;
  strikes: number;
  checked: boolean;
}

interface QualityIssueDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmIssue?: (details: {
    type: "rework" | "discount";
    issueType: string;
    description: string;
    strikeNote?: string;
  }) => void;
}

const DEFAULT_AFFECTED_TASKS: AffectedTask[] = [
  { id: "task-1", label: "Lawn Mowing - Oliver Davis", checked: false },
  { id: "task-2", label: "Trimming - Oliver Davis", checked: false },
  { id: "task-3", label: "Edging - Liam Martinez", checked: false },
  { id: "task-4", label: "Blowing - Liam Martinez", checked: true },
  { id: "task-5", label: "Trim designated shrubs/hedges - Emma Brown", checked: false },
  { id: "task-6", label: "Remove resulting debris- Emma Thompson", checked: true },
];

const DEFAULT_STRIKE_CREW: StrikeCrewMember[] = [
  {
    id: "strike-1",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    strikes: 2,
    checked: true,
  },
  {
    id: "strike-2",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    strikes: 0,
    checked: false,
  },
  {
    id: "strike-3",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    strikes: 0,
    checked: false,
  },
  {
    id: "strike-4",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    strikes: 1,
    checked: false,
  },
];

const ISSUE_OPTIONS = [
  "Quality Issue - Crew Performance",
  "Mechanical / Weather / Emergency",
];

export const QualityIssueDecisionModal: React.FC<QualityIssueDecisionModalProps> = ({
  isOpen,
  onClose,
  onConfirmIssue,
}) => {
  // Current view: "decision" | "rework" | "discount"
  const [view, setView] = useState<"decision" | "rework" | "discount">("decision");

  // Decision Panel State
  const [issueType, setIssueType] = useState<string>("Quality Issue - Crew Performance");
  const [affectedTasks, setAffectedTasks] = useState<AffectedTask[]>(DEFAULT_AFFECTED_TASKS);
  const [issueDescription, setIssueDescription] = useState<string>("");
  const [strikeCrew, setStrikeCrew] = useState<StrikeCrewMember[]>(DEFAULT_STRIKE_CREW);
  const [strikeNote, setStrikeNote] = useState<string>("");

  // Request Rework State
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("10:00 AM");
  const [isReassignOpen, setIsReassignOpen] = useState<boolean>(false);
  const [reassignedMembers, setReassignedMembers] = useState<string[]>([
    "Marcus Bell",
    "Daniel Green",
    "Tyrell Jones",
  ]);
  const [reworkInstruction, setReworkInstruction] = useState<string>("");

  // Apply Discount State
  const [discountAmount, setDiscountAmount] = useState<string>("$0.00");
  const [adminNote, setAdminNote] = useState<string>("");

  const resetState = () => {
    setView("decision");
    setIssueType("Quality Issue - Crew Performance");
    setAffectedTasks(DEFAULT_AFFECTED_TASKS);
    setIssueDescription("");
    setStrikeCrew(DEFAULT_STRIKE_CREW);
    setStrikeNote("");
    setScheduleDate("");
    setScheduleTime("10:00 AM");
    setIsReassignOpen(false);
    setReworkInstruction("");
    setDiscountAmount("$0.00");
    setAdminNote("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const toggleTask = (id: string) => {
    setAffectedTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const toggleStrikeMember = (id: string) => {
    setStrikeCrew((prev) =>
      prev.map((m) => (m.id === id ? { ...m, checked: !m.checked } : m))
    );
  };

  const removeReassignedMember = (name: string) => {
    setReassignedMembers((prev) => prev.filter((m) => m !== name));
  };

  const handleConfirmRework = () => {
    toast.success("Rework requested successfully! Assigned crew notified.");
    onConfirmIssue?.({
      type: "rework",
      issueType,
      description: reworkInstruction || issueDescription,
      strikeNote,
    });
    handleClose();
  };

  const handleConfirmDiscount = () => {
    toast.success("Discount applied and quality decision recorded!");
    onConfirmIssue?.({
      type: "discount",
      issueType,
      description: adminNote || issueDescription,
      strikeNote,
    });
    handleClose();
  };

  // Header Title
  const modalTitle =
    view === "decision" ? (
      <h3 className="font-barlow text-xl sm:text-2xl font-medium text-txt-primary leading-tight">
        Decision Panel
      </h3>
    ) : (
      <button
        type="button"
        onClick={() => setView("decision")}
        className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading hover:text-txt-primary transition-colors cursor-pointer font-normal"
      >
        <ChevronLeft className="w-4 h-4 text-secondary-subheading" />
        <span>Back to Decision Panel</span>
      </button>
    );

  // Footer Actions
  const modalFooter =
    view === "decision" ? (
      <div className="flex items-center gap-3 w-full">
        <button
          type="button"
          onClick={() => setView("rework")}
          className="flex-1 py-2.5 rounded-md border border-border bg-card-bg hover:bg-page-bg text-txt-primary text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-secondary-subheading" />
          <span>Request Rework</span>
        </button>
        <button
          type="button"
          onClick={() => setView("discount")}
          className="flex-1 py-2.5 rounded-md border border-border bg-card-bg hover:bg-page-bg text-txt-primary text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <BadgePercent className="w-4 h-4 text-secondary-subheading" />
          <span>Apply Discount</span>
        </button>
      </div>
    ) : (
      <div className="flex items-center gap-3 w-full">
        <button
          type="button"
          onClick={handleClose}
          className="flex-1 py-2.5 rounded-md border border-border bg-card-bg hover:bg-page-bg text-txt-primary text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={view === "rework" ? handleConfirmRework : handleConfirmDiscount}
          className="flex-1 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs text-center"
        >
          Confirm
        </button>
      </div>
    );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
      footer={modalFooter}
      hideHeaderBorder={true}
      hideFooterBorder={true}
      className="max-w-[490px] sm:max-w-[500px]"
      headerClassName="px-5 pt-5 pb-0"
      contentClassName="px-5 py-3 space-y-4 max-h-[75vh] overflow-y-auto"
      footerClassName="px-5 pb-5 pt-1"
    >
      {/* 1. VIEW: Decision Panel */}
      {view === "decision" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Issue dropdown using project standard CustomSelect */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1.5">
              Issue
            </label>
            <CustomSelect
              value={issueType}
              onChange={(val) => setIssueType(val)}
              options={ISSUE_OPTIONS}
              size="sm"
              triggerClassName="h-10 text-xs sm:text-sm border-border bg-card-bg rounded-md"
            />
          </div>

          {/* Affected Tasks */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1.5">
              Affected Tasks
            </label>
            <div className="space-y-1.5">
              {affectedTasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-txt-primary font-normal"
                >
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleTask(task.id)}
                    className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-0 cursor-pointer"
                  />
                  <span>{task.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Issue Description (Container with internal 0/200 counter) */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1.5">
              Issue Description
            </label>
            <div className="rounded-md border border-border bg-card-bg p-2.5 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows={2}
                maxLength={200}
                placeholder={
                  issueType === "Quality Issue - Crew Performance"
                    ? "Describe what quality standard was not meet"
                    : "Describe how weather affected the work"
                }
                className="w-full bg-transparent text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none resize-none leading-relaxed block"
              />
              <div className="text-[11px] text-secondary-subheading text-right mt-1 select-none">
                {issueDescription.length}/200
              </div>
            </div>
          </div>

          {/* Issue Strike to Crew Member(s) */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1.5">
              Issue Strike to Crew Member (s)
            </label>

            {issueType === "Quality Issue - Crew Performance" ? (
              <div className="space-y-2">
                <div className="space-y-1.5">
                  {strikeCrew.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => toggleStrikeMember(member.id)}
                      className={`px-3 py-2 rounded-md border flex items-center justify-between transition-colors cursor-pointer ${
                        member.checked
                          ? "bg-highlight-blue-bg border-highlight-blue-border"
                          : "border-border bg-card-bg hover:bg-page-bg/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={member.checked}
                          onChange={() => {}} // handled by parent onClick
                          className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-0 cursor-pointer"
                        />
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                        />
                        <span className="text-xs sm:text-sm text-txt-primary font-normal truncate">
                          {member.name}
                        </span>
                      </div>

                      <span
                        className={`text-xs px-2 py-0.5 rounded border whitespace-nowrap font-normal ${
                          member.strikes >= 2
                            ? "bg-decline-secondary text-decline border-decline-border"
                            : member.strikes === 1
                            ? "bg-callout-amber-bg text-callout-amber-text border-callout-amber-border"
                            : "bg-badge-active-bg text-badge-active-text border-badge-active-border"
                        }`}
                      >
                        Strikes : {member.strikes}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Info Callout */}
                <div className="rounded-md bg-callout-amber-bg border border-callout-amber-border p-2.5 text-xs text-callout-amber-text leading-relaxed">
                  <p>1st offense = probationary, no scheduling reduction.</p>
                  <p>2nd offense onward = scheduling reduction possible.</p>
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-callout-amber-bg border border-callout-amber-border p-2.5 text-xs text-secondary-subheading font-normal">
                No Strike
              </div>
            )}
          </div>

          {/* Strike Note (Internal only) with counter inside */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1.5">
              Strike Note{" "}
              <span className="text-secondary-subheading font-normal text-xs sm:text-sm font-sans">
                (internal only)
              </span>
            </label>
            <div className="rounded-md border border-border bg-card-bg p-2.5 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <textarea
                value={strikeNote}
                onChange={(e) => setStrikeNote(e.target.value)}
                rows={2}
                maxLength={200}
                placeholder="Describe the quality issue that lead to this strike..."
                className="w-full bg-transparent text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none resize-none leading-relaxed block"
              />
              <div className="text-xs text-secondary-subheading text-right mt-1 select-none">
                {strikeNote.length}/200
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIEW: Request Rework */}
      {view === "rework" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          {/* Schedule Date & Schedule Time (2 columns) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-barlow text-base font-medium text-txt-primary block mb-1">
                Schedule date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full rounded-md border border-border bg-card-bg px-3 py-2 text-xs text-txt-primary pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Calendar className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="font-barlow text-base font-medium text-txt-primary block mb-1">
                Schedule Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full rounded-md border border-border bg-card-bg px-3 py-2 text-xs text-txt-primary pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Assigned Crew */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1.5">
              Assigned Crew
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="rounded-md bg-highlight-blue-bg border border-highlight-blue-border px-2.5 py-1.5 flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Alex Morgan"
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-txt-primary leading-tight">
                    Alex Morgan
                  </span>
                  <span className="text-[10px] text-secondary-subheading font-normal leading-tight">
                    Member
                  </span>
                </div>
              </div>

              <div className="rounded-md bg-highlight-blue-bg border border-highlight-blue-border px-2.5 py-1.5 flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                  alt="Richard Gain"
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-txt-primary leading-tight">
                    Richard Gain
                  </span>
                  <span className="text-[10px] text-secondary-subheading font-normal leading-tight">
                    Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reassign to different crew member */}
          <div className="pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-txt-primary font-normal">
              <input
                type="checkbox"
                checked={isReassignOpen}
                onChange={() => setIsReassignOpen(!isReassignOpen)}
                className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-0 cursor-pointer"
              />
              <span>Reassign to different crew member</span>
            </label>

            {isReassignOpen && (
              <div className="mt-2.5 space-y-1.5 animate-in fade-in duration-150">
                <label className="font-barlow text-sm font-medium text-txt-primary block">
                  Choose from the list
                </label>
                <div className="rounded-md border border-border bg-card-bg px-2.5 py-1.5 flex items-center justify-between min-h-[36px]">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {reassignedMembers.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-normal bg-highlight-blue-bg text-info border border-highlight-blue-border"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() => removeReassignedMember(name)}
                          className="text-info/70 hover:text-info cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <span className="text-xs text-secondary-subheading font-normal">
                      + 1 more
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0 ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Instruction for Crew */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1">
              Instruction for Crew
            </label>
            <div className="rounded-md border border-border bg-card-bg p-2.5 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <textarea
                value={reworkInstruction}
                onChange={(e) => setReworkInstruction(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="Whats specifically needs to be done..."
                className="w-full bg-transparent text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none resize-none leading-relaxed block"
              />
              <div className="text-[11px] text-secondary-subheading text-right mt-1 select-none">
                {reworkInstruction.length}/200
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. VIEW: Apply Discount */}
      {view === "discount" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          {/* Discount Amount */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1">
              Discount Amount
            </label>
            <input
              type="text"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              className="w-full rounded-md border border-border bg-card-bg px-3 py-2 text-xs text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Admin Note */}
          <div>
            <label className="font-barlow text-base font-medium text-txt-primary block mb-1">
              Admin Note
            </label>
            <div className="rounded-md border border-border bg-card-bg p-2.5 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="notes on quality decision, customer communication etc..."
                className="w-full bg-transparent text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none resize-none leading-relaxed block"
              />
              <div className="text-[11px] text-secondary-subheading text-right mt-1 select-none">
                {adminNote.length}/200
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default QualityIssueDecisionModal;
