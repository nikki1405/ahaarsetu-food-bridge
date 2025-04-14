
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReceiverStats } from "@/components/dashboard/receiver-stats";
import { DonationList } from "@/components/donations/donation-list";
import { FoodMap } from "@/components/map/food-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, BarChart2, LogOut, BookHeart, MapPin, Mail, Calendar } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar";

const ReceiverDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="border-b border-sky-500/20 bg-sky-500/10">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="size-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <BookHeart className="size-4 text-sky-500" />
                </div>
                <div className="font-medium text-lg">Receiver Portal</div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                      <Link to="/receiver-dashboard">
                        <BarChart2 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Available Food">
                      <Link to="/food-map">
                        <MapPin className="h-4 w-4" />
                        <span>Available Food</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="My Requests">
                      <Link to="/my-requests">
                        <Mail className="h-4 w-4" />
                        <span>My Requests</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile">
                      <Link to="/profile">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-sky-500/20 bg-sky-500/5">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Logout">
                    <Link to="/login">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 py-8 px-4 md:px-8 bg-sky-500/5 overflow-auto">
            <div className="container mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Welcome, Rajesh!</h1>
                <p className="text-muted-foreground">
                  Browse available food donations near you and request pickups.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-sky-500/10 to-white border-sky-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upcoming Pickups</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 border-b pb-3">
                      <Calendar className="h-8 w-8 text-sky-500 bg-sky-500/10 p-1.5 rounded" />
                      <div>
                        <p className="font-medium">Cooked Food - 2kg</p>
                        <p className="text-sm text-muted-foreground">Today, 4:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-sky-500 bg-sky-500/10 p-1.5 rounded" />
                      <div>
                        <p className="font-medium">Rice and Dal - 5kg</p>
                        <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/my-requests">View All Requests</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Food Near You</CardTitle>
                    <CardDescription>Available donations in your area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReceiverStats />
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="list" className="mb-4">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-6">
                  <div className="mb-4">
                    <DonationList type="receiver" />
                  </div>
                </TabsContent>
                <TabsContent value="map" className="mt-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-4">Food Donations Near You</h2>
                    <FoodMap />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default ReceiverDashboard;
