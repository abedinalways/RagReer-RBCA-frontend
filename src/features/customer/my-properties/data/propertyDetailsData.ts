import { PropertyDetailsData } from "../types/PropertyDetailsTypes";

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
 *
 * The full details dataset is intentionally small today; this lookup keeps the
 * component decoupled from the page route and is the single place to wire up
 * real data (or an async fetch) once a backend endpoint exists.
 */
export function getPropertyDetailsById(id: string): PropertyDetailsData {
  return { ...defaultProperty, id };
}