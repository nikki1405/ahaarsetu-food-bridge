
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { CampaignGrid } from "@/components/campaigns/campaign-grid";
import { Button } from "@/components/ui/button";
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog";
import { Footer } from "@/components/layout/footer";
import { PlusCircle } from "lucide-react";
import { CampaignFilters } from "@/components/campaigns/campaign-filters";
import { toast } from "sonner";

export default function Campaigns() {
  const [userRole, setUserRole] = useState<"donor" | "receiver" | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as "donor" | "receiver" | null;
    if (!storedRole) {
      navigate("/login");
      return;
    }
    setUserRole(storedRole);
  }, [navigate]);

  // Handle campaign creation
  const handleCreateCampaign = () => {
    setIsCreateDialogOpen(true);
  };

  // Handle campaign join
  const handleJoinCampaign = (campaignId: string) => {
    // In a real app, this would make an API call to join the campaign
    toast.success(`Successfully joined campaign #${campaignId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
            <p className="text-muted-foreground mt-2">
              {userRole === "donor"
                ? "Create and manage your food donation campaigns"
                : "Join and participate in food donation campaigns"}
            </p>
          </div>
          {userRole === "donor" && (
            <Button
              onClick={handleCreateCampaign}
              className="mt-4 md:mt-0"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Start New Campaign
            </Button>
          )}
        </div>

        <CampaignFilters 
          activeFilter={filterStatus}
          onFilterChange={setFilterStatus}
        />

        <CampaignGrid 
          userRole={userRole}
          filterStatus={filterStatus}
          onJoinCampaign={handleJoinCampaign}
        />

        {userRole === "donor" && (
          <CreateCampaignDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
