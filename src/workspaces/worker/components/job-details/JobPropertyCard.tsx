import { MapPin } from "lucide-react";

export interface JobPropertyCardProps {
  imageSrc?: string;
  category?: string;
  title?: string;
  address?: string;
  sizeDescription?: string;
}

export function JobPropertyCard({
  imageSrc = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  category = "Residential",
  title = "North Entrance Monument & Islands",
  address = "100 Whispering Pines Blvd at Hwy 43",
  sizeDescription = "Size: Small (up to 1/4 acre)",
}: JobPropertyCardProps) {
  return (
    <article
      className="flex flex-col justify-center items-start gap-4 p-4 self-stretch rounded-[0.25rem] border border-[#D9DADC] bg-white shadow-[-4px_0_4px_0_rgba(0,0,0,0.02),4px_0_4px_0_rgba(0,0,0,0.02),0_4px_4px_0_rgba(0,0,0,0.02),0_4px_4px_0_rgba(0,0,0,0.02)] transition-all"
    >
      {/* Property Photo */}
      <div className="w-full h-48 overflow-hidden rounded-[0.25rem] bg-slate-100 shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Property Info */}
      <div className="flex flex-col items-start gap-2 w-full">
        {/* Category Tag */}
        <span className="inline-flex items-center px-2 py-0.5 rounded-[0.25rem] bg-[#EAF2FA] text-primary text-xs font-medium">
          {category}
        </span>

        {/* Title */}
        <h2 className="font-barlow text-lg font-medium text-primary-heading leading-tight">
          {title}
        </h2>

        {/* Address */}
        <p className="flex items-center gap-1.5 text-xs text-secondary-subheading font-normal">
          <MapPin className="h-3.5 w-3.5 text-secondary-subheading shrink-0" />
          <span>{address}</span>
        </p>

        {/* Size */}
        <p className="text-xs font-medium text-primary pt-0.5">
          {sizeDescription}
        </p>
      </div>
    </article>
  );
}
