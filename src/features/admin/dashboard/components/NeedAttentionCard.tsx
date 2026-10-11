"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NEED_ATTENTION_DATA } from "../data/dashboardData";

export const NeedAttentionCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
          Need Attention
        </h3>
        <Link
          href="/admin/requests"
          className="inline-flex items-center gap-0.5  border border-border rounded-sm px-4 py-2 font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <span className="text-xs md:text-sm font-normal">View All</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {NEED_ATTENTION_DATA.map((item) => (
          <Link
            key={item.id}
            href={item.actionHref || "#"}
            className="block rounded-lg bg-attention-bg/60 border border-attention-border p-3 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-password-medium shrink-0 mt-1.5" />
              <div className="space-y-0.5 flex-1">
                <p className="text-sm md:text-base font-medium text-primary-heading group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs md:text-sm text-secondary-subheading">
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
