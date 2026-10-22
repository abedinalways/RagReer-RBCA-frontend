"use client";
import React, { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import { CustomerItem, NewCustomerFormData } from "../types/adminCustomers.types";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerCreated: (newCustomer: CustomerItem) => void;
}

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
        formData.customerType === "Commercial" ? "Commercial" : "Residential",
      role: (formData.role as CustomerItem["role"]) || "Property Owner",
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
            <div className="relative">
              <select
                value={formData.customerType}
                onChange={(e) =>
                  setFormData({ ...formData, customerType: e.target.value })
                }
                className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading appearance-none focus:outline-none focus:border-primary pr-8 cursor-pointer"
              >
                <option value="">Select Customer Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Role <span className="text-decline">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading appearance-none focus:outline-none focus:border-primary pr-8 cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="Property Owner">Property Owner</option>
                <option value="Property Manager">Property Manager</option>
                <option value="Tenant">Tenant</option>
                <option value="General Contractor">General Contractor</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
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
          <div className="relative">
            <select
              value={formData.billingType}
              onChange={(e) =>
                setFormData({ ...formData, billingType: e.target.value })
              }
              className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading appearance-none focus:outline-none focus:border-primary pr-8 cursor-pointer"
            >
              <option value="">Select Billing Type</option>
              <option value="Per Visit">Per Visit</option>
              <option value="Monthly">Monthly</option>
              <option value="Prepaid">Prepaid</option>
              <option value="Net 30">Net 30</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
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
