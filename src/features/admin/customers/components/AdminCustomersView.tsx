"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import {
  defaultMockCustomer,
  mockCustomersList,
} from "../data/adminCustomersData";
import {
  CustomerItem,
  CustomerTabKey,
} from "../types/adminCustomers.types";
import { AdminCustomersEmptyState } from "./AdminCustomersEmptyState";
import { AdminCustomersList } from "./AdminCustomersList";
import { AddCustomerModal } from "./AddCustomerModal";
import { CustomerDetailsView } from "./CustomerDetailsView";

interface AdminCustomersViewProps {
  initialCustomerId?: string;
  initialTab?: CustomerTabKey;
}

export const AdminCustomersView: React.FC<AdminCustomersViewProps> = ({
  initialCustomerId,
  initialTab = "overview",
}) => {
  const [customers, setCustomers] = useState<CustomerItem[]>(mockCustomersList);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    initialCustomerId || null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCustomerCreated = (newCustomer: CustomerItem) => {
    setCustomers((prev) => [newCustomer, ...prev]);
    setSelectedCustomerId(newCustomer.id);
    showToast(`Customer ${newCustomer.name} created successfully!`);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    showToast("Customer deleted successfully!");
  };

  const handleTogglePortalAccess = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const nextVal = !c.portalAccessEnabled;
          showToast(
            `Portal access for ${c.name} is now ${nextVal ? "Enabled" : "Disabled"}`
          );
          return {
            ...c,
            portalAccessEnabled: nextVal,
            portalAccess: nextVal ? "Joined" : "Pending",
          };
        }
        return c;
      })
    );
  };

  const handleSendInvitation = (customer: CustomerItem) => {
    showToast(`Invitation sent to ${customer.email}!`);
  };

  const handleBackToList = () => {
    setSelectedCustomerId(null);
  };

  // 1. If a customer is selected, show Customer Details page (Figma Screenshot 3 & 4)
  if (selectedCustomerId) {
    const currentCustomer =
      customers.find((c) => c.id === selectedCustomerId) ||
      defaultMockCustomer;

    return (
      <div className="space-y-4">
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <CustomerDetailsView
          customer={currentCustomer}
          initialTab={initialTab}
          onBack={handleBackToList}
          onSendInvitation={handleSendInvitation}
        />
      </div>
    );
  }

  // 2. If no customers exist, show Empty State Card (Figma Screenshot 1)
  if (customers.length === 0) {
    return (
      <div className="space-y-4">
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AdminCustomersEmptyState
          onAddCustomer={() => setIsAddModalOpen(true)}
        />

        {/* Add Customer Modal */}
        <AddCustomerModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCustomerCreated={handleCustomerCreated}
        />
      </div>
    );
  }

  // 3. Otherwise show All Customer List Reusable Table (New Screenshots 1 & 2)
  return (
    <div className="space-y-4">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <AdminCustomersList
        customers={customers}
        onSelectCustomer={(id) => setSelectedCustomerId(id)}
        onAddCustomer={() => setIsAddModalOpen(true)}
        onDeleteCustomer={handleDeleteCustomer}
        onTogglePortalAccess={handleTogglePortalAccess}
      />

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCustomerCreated={handleCustomerCreated}
      />
    </div>
  );
};

export default AdminCustomersView;
