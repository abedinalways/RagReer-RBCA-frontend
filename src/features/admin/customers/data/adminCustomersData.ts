import { CustomerItem } from "../types/adminCustomers.types";

export const defaultMockCustomer: CustomerItem = {
  id: "CTR-1278",
  name: "Alex Morgan",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  status: "Draft",
  customerType: "Residential",
  role: "Property Owner",
  organizationName: "",
  email: "alexmorgan@gmail.com",
  phone: "999-(1234)-555",
  billingType: "Per Visit",
  portalAccess: "Sent",
  memberSince: "Not joined yet",
  activeServicesCount: 0,
  propertiesCount: 0,
  outstandingAmount: "$0.00",
};

export const mockCustomersList: CustomerItem[] = [
  defaultMockCustomer,
  {
    id: "CTR-1279",
    name: "Carlos Ramirez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    customerType: "Residential",
    role: "Property Owner",
    email: "c.ramirez@email.com",
    phone: "512-555-0192",
    billingType: "Monthly",
    portalAccess: "Joined",
    memberSince: "Aug 12, 2026",
    activeServicesCount: 1,
    propertiesCount: 1,
    outstandingAmount: "$120.00",
  },
  {
    id: "CTR-1280",
    name: "Nina Patel",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    status: "Active",
    customerType: "Commercial",
    role: "Property Manager",
    organizationName: "Elmwood Corporate",
    email: "nina.patel@corporate.com",
    phone: "512-555-0144",
    billingType: "Net 30",
    portalAccess: "Joined",
    memberSince: "Jul 28, 2026",
    activeServicesCount: 2,
    propertiesCount: 2,
    outstandingAmount: "$850.00",
  },
];
