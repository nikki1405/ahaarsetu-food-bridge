
import React from "react";
import { CampaignCard } from "./campaign-card";
import { Campaign } from "@/types/campaign";

// Mock campaigns data - in a real app, this would come from an API
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    title: "Weekend Food Drive",
    organizerName: "GreenEats Organization",
    dateTime: "2023-05-25T10:00:00",
    location: "Central Community Center, Delhi",
    description: "Join us for our weekend food drive to collect nutritious meals for homeless shelters.",
    status: "upcoming",
    isJoined: false
  },
  {
    id: "2",
    title: "Restaurant Food Rescue",
    organizerName: "Food Rescue India",
    dateTime: "2023-05-15T18:00:00",
    location: "Various Restaurants, Mumbai",
    description: "Help collect excess food from restaurants and deliver to those in need.",
    status: "ongoing",
    isJoined: true
  },
  {
    id: "3",
    title: "Community Kitchen Project",
    organizerName: "Helping Hands NGO",
    dateTime: "2023-04-10T09:00:00",
    location: "Government School, Bangalore",
    description: "A month-long program to provide daily meals to underprivileged school children.",
    status: "completed",
    isJoined: true
  },
  {
    id: "4",
    title: "Corporate Food Donation Drive",
    organizerName: "Tech Cares Foundation",
    dateTime: "2023-06-05T14:00:00",
    location: "Tech Park, Hyderabad",
    description: "Annual corporate food donation drive with participation from major tech companies.",
    status: "upcoming",
    isJoined: false
  },
  {
    id: "5",
    title: "Holiday Meal Distribution",
    organizerName: "Festivals for All",
    dateTime: "2023-05-20T11:00:00",
    location: "Community Hall, Chennai",
    description: "Special meal distribution program during the holiday season.",
    status: "ongoing",
    isJoined: false
  }
];

type CampaignGridProps = {
  userRole: "donor" | "receiver" | null;
  filterStatus: string;
  onJoinCampaign: (campaignId: string) => void;
};

export function CampaignGrid({ userRole, filterStatus, onJoinCampaign }: CampaignGridProps) {
  // Filter campaigns based on status filter
  const filteredCampaigns = MOCK_CAMPAIGNS.filter(campaign => {
    if (filterStatus === "all") return true;
    return campaign.status === filterStatus;
  });

  // For receivers, only show campaigns they've joined or can join
  const displayCampaigns = userRole === "receiver" 
    ? filteredCampaigns
    : filteredCampaigns;

  if (displayCampaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No campaigns found</h3>
        <p className="mt-2 text-muted-foreground">
          {filterStatus !== "all" 
            ? `There are no ${filterStatus} campaigns at the moment.`
            : userRole === "donor" 
              ? "Start by creating your first campaign!" 
              : "No campaigns are available to join right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {displayCampaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          userRole={userRole}
          onJoinCampaign={onJoinCampaign}
        />
      ))}
    </div>
  );
}
