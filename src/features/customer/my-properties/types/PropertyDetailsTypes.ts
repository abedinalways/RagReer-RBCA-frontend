export interface PropertyDetailsAmenities {
  gym: boolean;
  parking: string;
  pool: string;
  view: string;
}

export interface PropertyDetailsMaintainer {
  name: string;
  phone: string;
  avatarUrl: string;
}

export interface PropertyDetailsLocation {
  address: string;
  cityRegion: string;
  mapImageUrl: string;
}

export interface PropertyDetailsData {
  id?: string;
  title: string;
  category: string;
  description: string;
  size: string;
  floors: string;
  amenities: PropertyDetailsAmenities;
  siteAccessNotes: string;
  maintainer: PropertyDetailsMaintainer;
  location: PropertyDetailsLocation;
  images: string[];
}