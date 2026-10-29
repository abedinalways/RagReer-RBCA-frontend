"use client";
import React, { useState } from "react";
import {
  mockAdminProperties,
  getAdminPropertyDetails,
} from "../data/adminPropertiesData";
import { AdminPropertiesList } from "./AdminPropertiesList";
import { AdminPropertyDetailView } from "./AdminPropertyDetailView";
import { AdminPropertiesEmptyState } from "./AdminPropertiesEmptyState";

interface AdminPropertiesViewProps {
  initialPropertyId?: string;
}

export const AdminPropertiesView: React.FC<AdminPropertiesViewProps> = ({
  initialPropertyId,
}) => {
  const [properties, setProperties] = useState(mockAdminProperties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    initialPropertyId || null
  );

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setSelectedPropertyId(null);
  };

  const handleLoadSampleData = () => {
    setProperties(mockAdminProperties);
  };

  // 1. If a property is selected, show the full details view (Figma Screenshot 3)
  if (selectedPropertyId) {
    const detailData = getAdminPropertyDetails(selectedPropertyId);
    return (
      <AdminPropertyDetailView
        property={detailData}
        onBack={handleBackToList}
      />
    );
  }

  // 2. If no properties exist, show empty state (Figma Screenshot 1)
  if (properties.length === 0) {
    return <AdminPropertiesEmptyState onLoadSampleData={handleLoadSampleData} />;
  }

  // 3. Otherwise show properties list table (Figma Screenshot 2)
  return (
    <AdminPropertiesList
      properties={properties}
      onSelectProperty={handleSelectProperty}
      onViewEmptyState={() => setProperties([])}
    />
  );
};

export default AdminPropertiesView;
