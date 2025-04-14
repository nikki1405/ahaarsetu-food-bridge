
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DonorStats } from "@/components/dashboard/donor-stats";
import { DonationList } from "@/components/donations/donation-list";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const DonorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome, Priya!</h1>
              <p className="text-muted-foreground">
                Your generosity makes a difference. What would you like to donate today?
              </p>
            </div>
            <Link to="/new-donation">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Post New Food
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <DonorStats />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Donation History</h2>
            <DonationList type="donor" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonorDashboard;
