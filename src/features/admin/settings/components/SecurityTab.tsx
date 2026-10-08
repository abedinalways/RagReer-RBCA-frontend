"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Laptop,
  Smartphone,
  ChevronDown,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { ServiceStatusToggle } from "@/features/admin/services/components/ServiceStatusToggle";
import {
  INITIAL_ACTIVE_SESSIONS,
  INITIAL_IP_WHITELIST,
} from "../data/settingsData";
import { ActiveSession, IpWhitelistItem } from "../types";

export function SecurityTab() {
  // Passwords
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("••••••••••");
  const [newPassword, setNewPassword] = useState("••••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••••");

  // 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Active Sessions
  const [sessions, setSessions] = useState<ActiveSession[]>(INITIAL_ACTIVE_SESSIONS);

  // Session Timeout
  const [inactivityDuration, setInactivityDuration] = useState("1 hour");
  const [warnBeforeLogout, setWarnBeforeLogout] = useState(true);
  const [warningTime, setWarningTime] = useState("5 mintues before logout");

  // IP Whitelist
  const [ipRestrictionEnabled, setIpRestrictionEnabled] = useState(true);
  const [newIp, setNewIp] = useState("");
  const [ipList, setIpList] = useState<IpWhitelistItem[]>(INITIAL_IP_WHITELIST);

  const handleEndSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.trim()) return;
    const item: IpWhitelistItem = {
      id: `ip-${Date.now()}`,
      ip: newIp.trim(),
      label: "Custom IP",
      addedBy: "Admin",
      date: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
      status: "Active",
    };
    setIpList((prev) => [...prev, item]);
    setNewIp("");
  };

  const handleDeleteIp = (id: string) => {
    setIpList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8 divide-y divide-border/60">
      {/* 1. Change Password */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-0">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Change Password
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading hover:text-txt-primary"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading hover:text-txt-primary"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading hover:text-txt-primary"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Strength Meter Bar */}
            <div className="mt-2">
              <div className="flex items-center gap-1.5 h-1.5 w-48">
                <div className="h-full w-1/4 rounded bg-rose-400" />
                <div className="h-full w-1/4 rounded bg-gray-200" />
                <div className="h-full w-1/4 rounded bg-gray-200" />
                <div className="h-full w-1/4 rounded bg-gray-200" />
              </div>
              <span className="text-[11px] text-rose-500 mt-1 block font-medium">Weak</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* 2. Security & Sign-In */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Security & Sign-In
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Manage your security verification.
          </p>
        </div>

        <div className="lg:col-span-7 flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
          <div>
            <span className="font-semibold text-sm md:text-base text-primary-heading block">
              Two-Factor Authentication (2FA)
            </span>
            <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
              Enhance your account security by requiring more than just a password to log in.
            </span>
          </div>
          <ServiceStatusToggle
            isActive={twoFactorEnabled}
            onChange={setTwoFactorEnabled}
          />
        </div>
      </div>

      {/* 3. Active Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Active Sessions
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Devices that have logged into your account.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 gap-3 border border-border rounded-md bg-card-bg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-page-bg flex items-center justify-center text-secondary-subheading shrink-0">
                  {sess.type === "laptop" ? (
                    <Laptop className="w-5 h-5" />
                  ) : (
                    <Smartphone className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-sm md:text-base text-primary-heading block">
                    {sess.device}
                  </span>
                  <span className="text-xs text-secondary-subheading mt-0.5 block">
                    {sess.location}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleEndSession(sess.id)}
                className="px-4 py-2 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-xs sm:text-sm transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
              >
                End Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Session Timeout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Session Timeout
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Automatically log out inactive administrators.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {/* Inactivity Duration */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Inactivity Duration
            </label>
            <div className="relative">
              <select
                value={inactivityDuration}
                onChange={(e) => setInactivityDuration(e.target.value)}
                className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
              >
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="4 hours">4 hours</option>
              </select>
              <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Warn Before Logout */}
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Warn Before Logout
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Show a warning notification before the session expires.
              </span>
            </div>
            <ServiceStatusToggle
              isActive={warnBeforeLogout}
              onChange={setWarnBeforeLogout}
            />
          </div>

          {/* Warning Time */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Warning Time
            </label>
            <div className="relative">
              <select
                value={warningTime}
                onChange={(e) => setWarningTime(e.target.value)}
                className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
              >
                <option value="2 minutes before logout">2 minutes before logout</option>
                <option value="5 mintues before logout">5 minutes before logout</option>
                <option value="10 minutes before logout">10 minutes before logout</option>
              </select>
              <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="p-3 bg-page-bg/50 rounded-md border border-border/60 text-xs text-secondary-subheading">
            Inactive sessions may expose admin data. Setting a timeout helps secure your platform automatically.
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* 5. IP Access Restriction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            IP Access Restriction
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Allow admin dashboard access only from approved IP addresses.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {/* Enable IP Restriction */}
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Enable IP Restriction
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Only whitelisted IP addresses will be able to log in.
              </span>
            </div>
            <ServiceStatusToggle
              isActive={ipRestrictionEnabled}
              onChange={setIpRestrictionEnabled}
            />
          </div>

          {/* Add IP Input Form */}
          <form onSubmit={handleAddIp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <input
              type="text"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              placeholder="Enter IP Address"
              className="flex-1 px-3.5 py-2 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm transition-colors cursor-pointer shrink-0 text-center"
            >
              Add IP
            </button>
          </form>

          {/* Whitelist IP Table */}
          <div className="overflow-x-auto border border-border rounded-md">
            <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
              <thead className="bg-page-bg/60 border-b border-border text-secondary-subheading font-medium">
                <tr>
                  <th className="py-2.5 px-3">IP Address</th>
                  <th className="py-2.5 px-3">Label</th>
                  <th className="py-2.5 px-3">Added By</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 bg-card-bg">
                {ipList.map((item) => (
                  <tr key={item.id} className="hover:bg-page-bg/30">
                    <td className="py-2.5 px-3 font-medium text-txt-primary">
                      {item.ip}
                    </td>
                    <td className="py-2.5 px-3 text-secondary-subheading">
                      {item.label}
                    </td>
                    <td className="py-2.5 px-3 text-secondary-subheading">
                      {item.addedBy}
                    </td>
                    <td className="py-2.5 px-3 text-secondary-subheading">
                      {item.date}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.status === "Active"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteIp(item.id)}
                        className="p-1 rounded text-secondary-subheading hover:text-red-500 hover:bg-page-bg cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-md border border-blue-100 text-xs text-secondary-subheading leading-relaxed">
            <span className="font-semibold text-txt-primary">Important:</span> If your current IP is not listed and you enable this feature, you may lose access to the admin dashboard.
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
