
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowRight, Check } from "lucide-react";
import { Campaign } from "@/types/campaign";
import { formatDate } from "@/lib/date-utils";

type CampaignCardProps = {
  campaign: Campaign;
  userRole: "donor" | "receiver" | null;
  onJoinCampaign: (campaignId: string) => void;
};

export function CampaignCard({ campaign, userRole, onJoinCampaign }: CampaignCardProps) {
  const { id, title, organizerName, dateTime, location, description, status, isJoined } = campaign;
  
  // Define badge styles based on status
  const getBadgeVariant = () => {
    switch (status) {
      case "upcoming":
        return "default"; // Blue
      case "ongoing":
        return "secondary"; // Green
      case "completed":
        return "outline"; // Grey
      default:
        return "default";
    }
  };

  // Status display text with proper capitalization
  const statusDisplay = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={getBadgeVariant()}>
            {status === "upcoming" && <Clock className="w-3 h-3 mr-1" />}
            {status === "ongoing" && <Users className="w-3 h-3 mr-1" />}
            {status === "completed" && <Check className="w-3 h-3 mr-1" />}
            {statusDisplay}
          </Badge>
        </div>
        <CardDescription>{organizerName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-sm mb-2">{description}</p>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(dateTime)}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="truncate">{location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        
        {userRole === "receiver" && status !== "completed" && (
          isJoined ? (
            <Button variant="secondary" size="sm" disabled>
              <Check className="mr-1 h-4 w-4" />
              Joined
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={() => onJoinCampaign(id)}
            >
              Join Campaign
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
