
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DonorStats } from "@/components/dashboard/donor-stats";
import { DonationList } from "@/components/donations/donation-list";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, User, BarChart2, LogOut, BookHeart, ClipboardList } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DonorDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="border-b border-primary/20 bg-primary/10">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookHeart className="size-4 text-primary" />
                </div>
                <div className="font-medium text-lg">Donor Portal</div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                      <Link to="/donor-dashboard">
                        <BarChart2 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Post New Food">
                      <Link to="/new-donation">
                        <PlusCircle className="h-4 w-4" />
                        <span>Post New Food</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="My Donations">
                      <Link to="/my-donations">
                        <ClipboardList className="h-4 w-4" />
                        <span>My Donations</span>
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
            <SidebarFooter className="border-t border-primary/20 bg-primary/5">
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
          <main className="flex-1 py-8 px-4 md:px-8 bg-primary/5 overflow-auto">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-primary/10 to-white border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full gap-2 justify-start" asChild>
                      <Link to="/new-donation">
                        <PlusCircle className="h-4 w-4" />
                        Post New Donation
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full gap-2 justify-start" asChild>
                      <Link to="/my-donations">
                        <ClipboardList className="h-4 w-4" />
                        View My Donations
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Donation Overview</CardTitle>
                    <CardDescription>Your impact so far</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DonorStats />
                  </CardContent>
                </Card>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
                <DonationList type="donor" />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default DonorDashboard;
