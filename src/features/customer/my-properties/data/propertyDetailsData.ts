import { PropertyDetailsData } from "../types/PropertyDetailsTypes";
import { propertiesData } from "./propertiesData";

export const defaultProperty: PropertyDetailsData = {
  title: "South Retention Pond & Walking Trail",
  category: "Residential",
  description:
    "South Retention Pond & Walking Trail evokes an elegant and serene residential community. It suggests a picturesque neighborhood with modern yet charming homes, possibly surrounded by lush greenery, rolling landscapes, or a tranquil brook. The name conveys a sense of sophistication, comfort, and exclusivity, ideal for those seeking a refined living experience in a scenic setting.",
  size: "Large (1/2 - 1 acre)",
  floors: "12 Floors",
  amenities: {
    gym: true,
    parking: "3 Parking",
    pool: "1 Pool",
    view: "Garden View",
  },
  siteAccessNotes:
    "Gate access required , 2 dogs on property (indoors during service) , Tenant currently occupying property (Name,Phone)",
  maintainer: {
    name: "Sarah William",
    phone: "999-(1234)-555",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  location: {
    address: "220 Oakridge Way",
    cityRegion: "Mikocheni, Dar es Salaam",
    lat: -6.7686,
    lng: 39.2468,
    zoom: 15,
    mapImageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800",
  },
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
  ],
};

/**
 * Resolve a property's full details by id.
 */
export function getPropertyDetailsById(id: string): PropertyDetailsData {
  const match = propertiesData.find((p) => p.id === id);
  if (!match) {
    return { ...defaultProperty, id };
  }

  const isLaguna = match.address.toLowerCase().includes("whispering pines");
  return {
    ...defaultProperty,
    id: match.id,
    title: match.title,
    category: match.type,
    size: match.size,
    location: {
      address: match.address,
      cityRegion: isLaguna ? "Laguna Niguel, CA" : "Mikocheni, Dar es Salaam",
      lat: isLaguna ? 33.531 : -6.7686,
      lng: isLaguna ? -117.7038 : 39.2468,
      zoom: 15,
      mapImageUrl: defaultProperty.location.mapImageUrl,
    },
  };
}