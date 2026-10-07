import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ContractPropertyInfo } from "../types/contractsAgreementsTypes";

interface ContractPropertyCardProps {
  property: ContractPropertyInfo;
}

export const ContractPropertyCard: React.FC<ContractPropertyCardProps> = ({
  property,
}) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-4 sm:p-5 space-y-3.5 shadow-2xs">
      {/* Property Image */}
      <div className="relative w-full h-44 sm:h-48 rounded-md overflow-hidden bg-slate-100">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      {/* Property Info */}
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-medium text-primary-heading">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-secondary-subheading">
          <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
          <span>{property.address}</span>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href="/customer/property"
        className="w-full h-9 border border-border hover:bg-slate-50 text-primary rounded-md font-medium text-xs sm:text-sm flex items-center justify-center transition-colors shadow-2xs cursor-pointer block text-center"
      >
        View Property Details
      </Link>
    </div>
  );
};

export default ContractPropertyCard;
