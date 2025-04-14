
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReceiverStats } from "@/components/dashboard/receiver-stats";
import { DonationList } from "@/components/donations/donation-list";
import { FoodMap } from "@/components/map/food-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReceiverDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, Rajesh!</h1>
            <p className="text-muted-foreground">
              Browse available food donations near you and request pickups.
            </p>
          </div>

          <div className="mb-8">
            <ReceiverStats />
          </div>

          <Tabs defaultValue="list" className="mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="mb-4 mt-4">
                <DonationList type="receiver" />
              </div>
            </TabsContent>
            <TabsContent value="map">
              <div className="mb-4 mt-4">
                <h2 className="text-xl font-semibold mb-4">Food Donations Near You</h2>
                <FoodMap />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReceiverDashboard;
