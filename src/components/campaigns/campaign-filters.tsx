
import React from "react";
import { Button } from "@/components/ui/button";

type CampaignFiltersProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export function CampaignFilters({ activeFilter, onFilterChange }: CampaignFiltersProps) {
  const filters = [
    { value: "all", label: "All Campaigns" },
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
