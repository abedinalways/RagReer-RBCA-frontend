"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  CustomerItem,
  NewCustomerFormData,
} from "../types/adminCustomers.types";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerCreated: (newCustomer: CustomerItem) => void;
}

const CUSTOMER_TYPE_OPTIONS = [
  { value: "Individual", label: "Individual" },
  { value: "Portfolio", label: "Portfolio" },
];

const BILLING_TYPE_OPTIONS = [
  { value: "Per Visit", label: "Per Visit" },
  { value: "Consolidated Monthly", label: "Consolidated Monthly" },
  { value: "Separate Per Property", label: "Separate Per Property" },
];

const ROLE_OPTIONS = [
  { value: "Customer", label: "Customer" },
  { value: "Crew Member", label: "Crew Member" },
  { value: "Crew Leader", label: "Crew Leader" },
];

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onCustomerCreated,
}) => {
  const [formData, setFormData] = useState<NewCustomerFormData>({
    fullName: "",
    organizationName: "",
    makePrimaryName: false,
    customerType: "",
    role: "",
    email: "",
    phone: "",
    billingType: "",
    defaultPassword: "",
    sendInvitation: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) return;

    const randomId = `#CTR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCustomer: CustomerItem = {
      id: randomId.replace("#", ""),
      name: formData.fullName,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      status: "Draft",
      customerType:
        (formData.customerType as CustomerItem["customerType"]) || "Individual",
      role: (formData.role as CustomerItem["role"]) || "Customer",
      organizationName: formData.organizationName,
      email: formData.email || "customer@example.com",
      phone: formData.phone || "999-(1234)-555",
      billingType:
        (formData.billingType as CustomerItem["billingType"]) || "Per Visit",
      portalAccess: formData.sendInvitation ? "Sent" : "Pending",
      memberSince: "Not joined yet",
      activeServicesCount: 0,
      propertiesCount: 0,
      outstandingAmount: "$0.00",
    };

    onCustomerCreated(newCustomer);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <h3 className="text-xl font-medium text-primary-heading font-barlow-condensed leading-tight">
          Add Customer
        </h3>
      }
      footer={
        <div className="w-full flex items-center justify-end gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-border rounded-md font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Create Customer
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Full Name <span className="text-decline">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Customer Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Organization Name (optional) */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Organization Name <span className="text-secondary-subheading font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Enter Organization if any"
            value={formData.organizationName}
            onChange={(e) =>
              setFormData({ ...formData, organizationName: e.target.value })
            }
            className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Checkbox: Make this primary name */}
        <div className="flex items-center gap-2 pt-0.5">
          <input
            type="checkbox"
            id="makePrimaryName"
            checked={formData.makePrimaryName}
            onChange={(e) =>
              setFormData({ ...formData, makePrimaryName: e.target.checked })
            }
            className="w-3.5 h-3.5 rounded border-border-input text-primary focus:ring-0 cursor-pointer"
          />
          <label
            htmlFor="makePrimaryName"
            className="text-xs text-secondary-subheading cursor-pointer select-none"
          >
            Make this primary name
          </label>
        </div>

        {/* 2 Columns: Customer Type & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Customer Type <span className="text-decline">*</span>
            </label>
            <CustomSelect
              value={formData.customerType}
              onChange={(val) =>
                setFormData({ ...formData, customerType: val })
              }
              options={CUSTOMER_TYPE_OPTIONS}
              placeholder="Select Customer Type"
              size="sm"
              triggerClassName="h-10 text-xs sm:text-sm border-border bg-card-bg rounded-md"
              dropdownClassName="border-border bg-card-bg shadow-lg rounded-md"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Role <span className="text-decline">*</span>
            </label>
            <CustomSelect
              value={formData.role}
              onChange={(val) => setFormData({ ...formData, role: val })}
              options={ROLE_OPTIONS}
              placeholder="Choose Role"
              size="sm"
              triggerClassName="h-10 text-xs sm:text-sm border-border bg-card-bg rounded-md"
              dropdownClassName="border-border bg-card-bg shadow-lg rounded-md"
            />
          </div>
        </div>

        {/* 2 Columns: Email Address & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Email Address <span className="text-decline">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Phone Number <span className="text-decline">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Billing Type */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Billing Type
          </label>
          <CustomSelect
            value={formData.billingType}
            onChange={(val) => setFormData({ ...formData, billingType: val })}
            options={BILLING_TYPE_OPTIONS}
            placeholder="Select Billing Type"
            size="sm"
            triggerClassName="h-10 text-xs sm:text-sm border-border bg-card-bg rounded-md"
            dropdownClassName="border-border bg-card-bg shadow-lg rounded-md"
          />
        </div>

        {/* Set Default Password */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Set Default Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              value={formData.defaultPassword}
              onChange={(e) =>
                setFormData({ ...formData, defaultPassword: e.target.value })
              }
              className="w-full border border-border rounded-md px-3 py-2 pr-9 text-xs sm:text-sm bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1 text-secondary-subheading hover:text-primary absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Send Invitation Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-medium text-primary-heading">
              Send Invitation
            </p>
            <p className="text-[11px] text-secondary-subheading leading-tight">
              Customer will receive an email with a link to access the portal.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.sendInvitation}
              onChange={(e) =>
                setFormData({ ...formData, sendInvitation: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;
