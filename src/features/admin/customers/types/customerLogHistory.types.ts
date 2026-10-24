export interface CustomerLogItem {
  id: string;
  userId: string;
  role: "Client" | "Admin" | "Worker" | "Customer";
  lastLogin: string;
  ip: string;
  country: string;
  device: string;
  os: "Windows" | "macOS" | "Linux" | "iOS" | "Android";
  // Detailed log properties for User Log Details modal
  status?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  latitude?: string | number;
  longitude?: string | number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  browserName?: string;
  browserLanguage?: string;
  referrerHost?: string;
  referrerPath?: string;
  osName?: string;
  deviceType?: string;
}
