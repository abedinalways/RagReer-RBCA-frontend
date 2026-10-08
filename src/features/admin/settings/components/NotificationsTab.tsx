"use client";

import React, { useState } from "react";
import { NotificationCategory } from "../types";
import { ServiceStatusToggle } from "@/features/admin/services/components/ServiceStatusToggle";

interface NotificationsTabProps {
  categories: NotificationCategory[];
  onChange: (categories: NotificationCategory[]) => void;
}

export function NotificationsTab({
  categories,
  onChange,
}: NotificationsTabProps) {
  const [data, setData] = useState<NotificationCategory[]>(categories);

  const handleToggle = (
    catId: string,
    itemId: string,
    channel: "text" | "email",
    val: boolean
  ) => {
    const updated = data.map((cat) => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map((item) =>
          item.id === itemId ? { ...item, [channel]: val } : item
        ),
      };
    });
    setData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-8 divide-y divide-border/60">
      {data.map((cat, idx) => (
        <div
          key={cat.id}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 ${
            idx === 0 ? "pt-0" : "pt-8"
          }`}
        >
          {/* Left Title */}
          <div className="lg:col-span-4">
            <h3 className="text-[1.125rem] font-bold text-primary-heading">
              {cat.title}
            </h3>
          </div>

          {/* Right Card with Text & Email Table */}
          <div className="lg:col-span-8 border border-border rounded-md bg-card-bg overflow-hidden shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-page-bg/40 border-b border-border text-xs sm:text-sm font-semibold text-secondary-subheading">
              <span>Notification Preferences</span>
              <div className="flex items-center gap-3 sm:gap-7 md:gap-10 pr-1 sm:pr-2">
                <span className="w-9 text-center">Text</span>
                <span className="w-9 text-center">Email</span>
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-border/50">
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 sm:p-4 gap-2 hover:bg-page-bg/20 transition-colors"
                >
                  <span className="text-xs sm:text-sm md:text-base font-medium text-txt-primary">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-3 sm:gap-7 md:gap-10 pr-1 sm:pr-2 shrink-0">
                    <div className="w-9 flex justify-center">
                      <ServiceStatusToggle
                        isActive={item.text}
                        onChange={(val) =>
                          handleToggle(cat.id, item.id, "text", val)
                        }
                      />
                    </div>
                    <div className="w-9 flex justify-center">
                      <ServiceStatusToggle
                        isActive={item.email}
                        onChange={(val) =>
                          handleToggle(cat.id, item.id, "email", val)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
