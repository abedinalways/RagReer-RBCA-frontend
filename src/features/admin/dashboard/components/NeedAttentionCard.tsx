"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NEED_ATTENTION_DATA } from "../data/dashboardData";

export const NeedAttentionCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Need Attention
        </h3>
        <Link
          href="/admin/requests"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {NEED_ATTENTION_DATA.map((item) => (
          <Link
            key={item.id}
            href={item.actionHref || "#"}
            className="block rounded-lg bg-attention-bg border border-attention-border p-3 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-password-medium shrink-0 mt-1.5" />
              <div className="space-y-0.5 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-primary-heading group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-secondary-subheading">
                  {item.subtext}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
