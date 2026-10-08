export type SettingsTab =
  | "Profile"
  | "Security"
  | "Notifications"
  | "Payment"
  | "Data & Privacy";

export interface CustomerProfileData {
  avatarUrl: string;
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
}
