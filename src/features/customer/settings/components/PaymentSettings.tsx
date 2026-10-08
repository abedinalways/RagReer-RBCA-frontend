"use client";

import React, { useState } from "react";
import { Switch } from "@/components/shared/Switch";

interface PaymentGatewayItem {
  id: string;
  name: string;
  methodSupported: string;
  isActive: boolean;
}

const INITIAL_GATEWAYS: PaymentGatewayItem[] = [
  {
    id: "clover",
    name: "Clover",
    methodSupported: "Credit/Debit Card, ACH",
    isActive: true,
  },
];

export const PaymentSettings: React.FC = () => {
  const [gateways, setGateways] = useState<PaymentGatewayItem[]>(INITIAL_GATEWAYS);

  const handleToggle = (id: string, active: boolean) => {
    setGateways((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isActive: active } : g))
    );
  };

  return (
    <div className="bg-card-bg rounded-sm border border-border shadow-2xs overflow-hidden">
      {/* Header matching Figma Screenshot 2 */}
      <div className="p-5 sm:p-6 border-b border-border/80">
        <h4 className="text-base md:text-lg font-medium text-txt-primary">
          Payment Methods
        </h4>
      </div>

      {/* Table Section matching Figma Screenshot 2 */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-page-bg border-b border-border">
              <th className="py-3 px-5 sm:px-6 font-medium text-secondary-subheading capitalize tracking-wider">
                Gateway
              </th>
              <th className="py-3 px-5 sm:px-6 font-medium text-secondary-subheading capitalize tracking-wider">
                Method Supported
              </th>
              <th className="py-3 px-5 sm:px-6 font-medium text-secondary-subheading capitalize tracking-wider">
                Status
              </th>
              <th className="py-3 px-5 sm:px-6 font-medium text-secondary-subheading capitalize tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card-bg">
            {gateways.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                {/* Gateway Name */}
                <td className="py-4 px-5 sm:px-6 font-medium text-primary hover:underline cursor-pointer">
                  {item.name}
                </td>

                {/* Method Supported */}
                <td className="py-4 px-5 sm:px-6 text-txt-primary font-normal">
                  {item.methodSupported}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-5 sm:px-6">
                  {item.isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot shrink-0" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-secondary-subheading border border-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading shrink-0" />
                      Inactive
                    </span>
                  )}
                </td>

                {/* Action Toggle Switch */}
                <td className="py-4 px-5 sm:px-6 text-right">
                  <div className="flex justify-end">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(checked) => handleToggle(item.id, checked)}
                      aria-label={`Toggle ${item.name}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSettings;
