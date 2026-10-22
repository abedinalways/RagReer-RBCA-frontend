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

  const handleSendInvitation = (customer: CustomerItem) => {
    showToast(`Invitation sent to ${customer.email}!`);
  };

  const handleViewSampleCustomer = () => {
    setSelectedCustomerId(defaultMockCustomer.id);
  };

  const handleBackToList = () => {
    setSelectedCustomerId(null);
  };

  // If a customer is selected, show the Customer Details page (Figma Screenshot 3 & 4)
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

  // Otherwise show the Empty State (Figma Screenshot 1)
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
        onViewSampleCustomer={handleViewSampleCustomer}
      />

      {/* Add Customer Modal (Figma Screenshot 2) */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCustomerCreated={handleCustomerCreated}
      />
    </div>
  );
};

export default AdminCustomersView;
