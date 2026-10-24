"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
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
import { CustomerLogHistoryView } from "./CustomerLogHistoryView";
import { DeleteCustomerModal } from "./DeleteCustomerModal";

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
  const [logHistoryCustomer, setLogHistoryCustomer] = useState<CustomerItem | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<CustomerItem | null>(null);

  const handleCustomerCreated = (newCustomer: CustomerItem) => {
    setCustomers((prev) => [newCustomer, ...prev]);
    setSelectedCustomerId(newCustomer.id);
    toast.success(`Customer ${newCustomer.name} created successfully!`);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    toast.success("Customer deleted successfully!");
  };

  const handleTogglePortalAccess = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const nextVal = !c.portalAccessEnabled;
          if (nextVal) {
            toast.success(`Portal access enabled for ${c.name}`);
          } else {
            toast.error(`Portal access disabled for ${c.name}`);
          }
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
    toast.success(`Invitation sent to ${customer.email}!`);
  };

  const handleBackToList = () => {
    setSelectedCustomerId(null);
  };

  // 1. If Log History is selected from Action Menu (Figma Image 1)
  if (logHistoryCustomer) {
    return (
      <div className="space-y-4">
        <CustomerLogHistoryView
          customer={logHistoryCustomer}
          onBack={() => setLogHistoryCustomer(null)}
        />
      </div>
    );
  }

  // 2. If a customer is selected, show Customer Details page (Figma Screenshot 3 & 4)
  if (selectedCustomerId) {
    const currentCustomer =
      customers.find((c) => c.id === selectedCustomerId) ||
      defaultMockCustomer;

    return (
      <div className="space-y-4">
        <CustomerDetailsView
          customer={currentCustomer}
          initialTab={initialTab}
          onBack={handleBackToList}
          onSendInvitation={handleSendInvitation}
        />
      </div>
    );
  }

  // 3. If no customers exist, show Empty State Card (Figma Screenshot 1)
  if (customers.length === 0) {
    return (
      <div className="space-y-4">
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

  // 4. Otherwise show All Customer List Reusable Table (New Screenshots 1 & 2)
  return (
    <div className="space-y-4">
      <AdminCustomersList
        customers={customers}
        onSelectCustomer={(id) => setSelectedCustomerId(id)}
        onViewLogHistory={(customer) => setLogHistoryCustomer(customer)}
        onAddCustomer={() => setIsAddModalOpen(true)}
        onDeleteCustomer={(customer) => setDeletingCustomer(customer)}
        onTogglePortalAccess={handleTogglePortalAccess}
      />

      {/* Delete Customer Confirmation Modal (Figma Image 4) */}
      <DeleteCustomerModal
        customer={deletingCustomer}
        isOpen={Boolean(deletingCustomer)}
        onClose={() => setDeletingCustomer(null)}
        onConfirm={() => {
          if (deletingCustomer) {
            handleDeleteCustomer(deletingCustomer.id);
            setDeletingCustomer(null);
          }
        }}
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
